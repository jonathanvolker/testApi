import React, { useEffect, useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar";
import ConceptDataTable from "../components/Seller/SellerQuote/ConceptDataTable";
import ConceptForm from "../components/Seller/SellerQuote/ConceptForm";
import {
  calculateTotals,
  conceptDataIsValid,
  onDeleteClick,
  processConceptData,
} from "../components/Seller/SellerQuote/ConceptMethods";
import QuoteForm from "../components/Seller/SellerQuote/QuoteForm";
import "../components/Seller/SellerQuote/SellerQuotePage.css";
import SideBar from "../components/Sidebar/SideBar";
import {
  getClients,
  getInvoiceById,
  useAuthDispatch,
  useAuthState,
} from "../Context";
import { formatInvoicesToPrint } from "../utils/formatters";
import { isAdmin } from "../utils/roleDetectors";

const SellerQuotePage = () => {
  const state = useAuthState();
  const role = state?.role ?? "";
  const dispatch = useAuthDispatch();
  //const clientId = state.customer._id ? state.customer._id : "";
  const newInvoice = state.newInvoice ? state.newInvoice : {};
  // console.log(state);
  const salesmanName = state?.user?.name ?? "";
  const initialConceptValues = {
    description: "",
    subdescription: "",
    quantity: "",
    price: "",
    partNumber: "",
    pdfDate: "",
    invoiceDate: "",
  };

  const initialInvoiceValues = {
    title: "",
    user: "",
    cost: 0,
    line: "",
    work: "",
    client: "",
    salesman: salesmanName,
    status: "",
    OC: "",
    factura: "",
    profit: 0,
    comissions: 0,
    expenses: 0,
    remissionNumber: "",
    receptionNumber: "",
    deliveryTime: "2-3 días",
    invoiceDate: "",
    comissionStatus: "",
    email: "",
    gananciaSugerida: 0,
    comissionPaymmentDate:"",
    paymmentDate:"",
    billingDate:"",
  };
  const [isOpen, setOpen] = useState(false);
  const [isPriceOpen, setPriceOpen] = useState(false);
  //const [pdfId, setPdfId] = useState("");
  const { id } = useParams();

  const [tableData, setTableData] = React.useState([
    // {
    //   id: 1,
    //   description: "descricpion",
    //   subdescription: "subdescripcion",
    //   quantity: 2,
    //   price: 100,
    //   totalPrice: 200,
    // },
  ]);

  useEffect(async () => {
    getClients(dispatch);
    if (id) {
      const data = await getInvoiceById(id);
      if (data && data.invoice) setOpen(!0);
      if (data && data.invoice && data.invoice.concepts.length > 0) {
        data.invoice.concepts = data.invoice.concepts.map((concept) => {
          concept.price = Number(concept.price);
          return concept;
        });
      }
      // console.log(data.invoice._id);

      const newFormattedInvoiceValues = formatInvoicesToPrint(
        invoiceValues,
        data.invoice
      );

      // console.log("invoicevalues existent id ", newFormattedInvoiceValues);
      // console.log({ id });
      setInvoiceValues(newFormattedInvoiceValues);
      if (data && data.invoice && data.invoice.concepts.length > 0) {
        setTableData(data.invoice.concepts);
      }
    }
  }, [id]);

  const [conceptValues, setConceptValues] =
    React.useState(initialConceptValues);
  const [invoiceValues, setInvoiceValues] =
    React.useState(initialInvoiceValues);

  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [numberErrorMessage, setnumberErrorMessage] = React.useState("");
  const [priceErrorMessage, setPriceErrorMessage] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleConceptInputChange = (e) => {
    const { name, value } = e.target || e;
    if (e.target) {
      setConceptValues({
        ...conceptValues,
        [name]: value,
      });
    } else {
      setConceptValues({
        ...conceptValues,
        [e.name]: e.value,
      });
      // console.log(invoiceValues);
    }
    //console.log(conceptValues);
  };

  const handleInvoiceInputChange = (e) => {
    // console.log("modifying input");
    const { name, value } = e.target;
    if (e.target) {
      setInvoiceValues({
        ...invoiceValues,
        [name]: value,
      });
      // console.log(invoiceValues);
    } else {
      setInvoiceValues({
        ...invoiceValues,
        [e.name]: e.value,
      });
      // console.log(invoiceValues);
    }
  };

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  const addConcept = () => {
    if (conceptDataIsValid(conceptValues, tableData)) {
      const newConceptValues = processConceptData(conceptValues, tableData);
      setTableData((oldArr) => {
        // console.log(oldArr);
        const newTableData = [
          ...oldArr,
          //ensure id does not gets repeated
          JSON.parse(JSON.stringify(newConceptValues)),
        ];
        const total = calculateTotals(newTableData);
        setTotalPrice(total);
        setInvoiceValues({
          ...invoiceValues,
          ["cost"]: total,
        });
        return newTableData;
      });
      
    }
    setConceptValues(initialConceptValues);
  };


  const DeleteButton = ({ clickedConcept }) => {
    return (
      <div
        onClick={() => {
          // console.log("delete button");
          const filteredConcepts = onDeleteClick(
            this,
            clickedConcept,
            tableData
          );
          setTableData(filteredConcepts);
          const total = calculateTotals(filteredConcepts);
          setTotalPrice(total);
          setInvoiceValues({
            ...invoiceValues,
            ["cost"]: total,
          });
          // history.push("/sellers-quote");
        }}
      >
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  const columns = [
    //{ field: "id", headerName: "ID" },
    { field: "partNumber", headerName: "# Parte", width: 100 },
    { field: "description", headerName: "Descripción", width: 200 },
    { field: "subdescription", headerName: "Subdescripción", width: 100 },
    { field: "quantity", headerName: "Cantidad", width: 100 },
    { field: "price", headerName: "Precio unitario", width: 100 },
    { field: "totalPrice", headerName: "Total", width: 100 },
    {
      field: "action",
      headerName: "Acción",
      width: 100,
      renderCell: (clickedConcept) => {
        return (
          // <Button onClick={() => onDeleteClick(this, params)}>Delete</Button>
          <DeleteButton clickedConcept={clickedConcept} />
        );
      },
    },
  ];

  React.useEffect(() => {
    if (isNaN(conceptValues.quantity)) {
      setnumberErrorMessage("La cantidad debe de ser numérica");
    } else {
      setnumberErrorMessage("");
    }
    if (isNaN(conceptValues.price)) {
      setPriceErrorMessage("El precio debe de ser numérico");
    } else {
      setPriceErrorMessage("");
    }
  }, [conceptValues.quantity, conceptValues.price]);

  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      <div className="page-container">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          {!isAdmin(role) && (
            <Grid container item justifyContent="center" xs={12}>
              <Grid item justifyContent="center" xs={12}>
                <div className="page-title"> Concepto</div>
              </Grid>

              <Grid
                item
                justifyContent="center"
                xs={12}
                md={6}
                // paddingRight={5}
                sx={{ paddingRight: { xs: 0, md: 5 } }}
              >
                <ConceptForm
                  conceptValues={conceptValues}
                  setConceptValues={setConceptValues}
                  handleConceptInputChange={handleConceptInputChange}
                  numberErrorMessage={numberErrorMessage}
                  priceErrorMessage={priceErrorMessage}
                  addConcept={addConcept}
                  isOpen={isPriceOpen}
                  setOpen={setPriceOpen}
                  handleInvoiceInputChange={handleInvoiceInputChange}
                />
              </Grid>
              <Grid item justifyContent="center" xs={12} md={6}>
                <ConceptDataTable tableData={tableData} columns={columns} />
                <p style={{ textAlign: "right", width: "100%" }}>
                  Precio total: ${totalPrice ? totalPrice : invoiceValues.cost}
                </p>
              </Grid>
            </Grid>
          )}

          <Grid item justifyContent="center" xs={12}>
            <div className="page-title">Información General</div>
          </Grid>

          <QuoteForm
            invoiceValues={invoiceValues}
            setInvoiceValues={setInvoiceValues}
            tableData={tableData}
            _id={id}
            isOpen={isOpen}
            setOpen={setOpen}
            handleInvoiceInputChange={handleInvoiceInputChange}
            clients={state.customers}
            newInvoice={newInvoice}
          />
        </Grid>
      </div>
    </>
  );
};

export default SellerQuotePage;
