import React from "react";
import {
  FilterList as FilterIconOn
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState, useAuthDispatch, getInvoices } from "../../Context";
import FilterModal from "./FilterModal";
import LazyDownloadPDFButton from "./LazyDownloadPDFButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import "./InvoicesDataTable.css";
import { checkColorRows } from "./dataTableMethods";

const InvoicesDataTable = ({ invoices, isFilterEnabled, historyDetail }) => {
  const [tableData, setTableData] = useState(invoices);
  const [modal, setModal] = useState(false);
  const [filterValues, setFilterValues] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterSelection, setFilterSelection] = useState([
    { field: [] },
    { field2: [] },
  ]);

  const { id } = useParams();
  const state = useAuthState();
  const role = state?.role ?? "";
  let columns = [];

  const checkHistory = historyDetail ? historyDetail : false;
  //update table on change
  useEffect(() => {
    checkColorRows(invoices, setTableData, role, checkHistory);
  }, [invoices]);

  const rowsColors = {
    green: "#308827",
    ligthGreen: "#7fd97c",
    yellow: "#CDC12D",
    ligthYellow: "#F0E778",
    red: "#C1272D",
    ligthRed: "#F0A0A0",
  };

  const checkRole = (role) => {
    if (role === "developer" || role === "director") {
      return (columns = columnsDirector);
    }
    if (role === "administrator") {
      return (columns = columnsAdmin);
    }
    if (role === "salesman") {
      return (columns = columnsSalesman);
    }
    return (columns = columnsSalesman);

    //      columnsUser = invoices.filter()
    // return (columns = columnsUser);
  };

  const handleClose = () => {
    setModal(false);
  };

  const getUniqueValues = (column) => {
    // console.log(column);
    // console.log(invoices);
    const preliminaryUniqueValues = invoices.map((invoice) => {
      if (invoice[column] != null && invoice[column] != undefined) {
        return invoice[column];
      }
    });
    const uniqueValues = [...new Set(preliminaryUniqueValues)];
    // console.log(uniqueValues);
    return uniqueValues;
  };

  const getColumnsNames = () => {
    if (invoices.length > 0) {
      // console.log(invoices[0]);
      return Object.keys(invoices[0]); // returns columns names
    } else {
      return [];
    }
  };

  const filterHandler = (rowData) => {
    const column = rowData.field;
    // const column = "line";
    // console.log("detected a click");
    const uniqueValues = getUniqueValues(column);
    const columnNames = getColumnsNames();
    // console.log(`columnNames: `, columnNames);
    setFilterColumn(column);
    setFilterValues(uniqueValues);
    setModal(true);
  };

  const onEditClick = (e, params, history) => {
    // console.log(params);
    history.push("/sellers/" + params.id);
  };

  const RenderHeader = ({ rowData }) => {
    return (
      <strong>
        {rowData.field}
        {/* <span role="img" aria-label="enjoy">
          🎂
        </span> */}
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => filterHandler(rowData)}
        >
          <FilterIconOn />
          {/* <FilterIconOff /> */}
        </IconButton>
      </strong>
    );
  };

  const genericField = (field, headerName, width) => {
    const baseStructure = { field, headerName, width };
    if (!isFilterEnabled) {
      return baseStructure;
    } else {
      return {
        ...baseStructure,
        renderHeader: (rowData) => <RenderHeader rowData={rowData} />,
        sortable: false,
      };
    }
  };

  const columnsSalesman = [
    genericField("invoiceDate", "Fecha", 120),
    genericField("client", "Cliente", 120),
    genericField("user", "Usuario", 200),
    genericField("invoiceNumber", "Folio", 100),
    genericField("work", "Trabajo", 120),
    genericField("partNumber", "# Parte", 120),
    genericField("title", "Titulo", 300),
    genericField("line", "Linea", 120),
    genericField("status", "Status", 120),
    genericField("OC", "OC", 120),
    genericField("receptionNumber", "Recepcion", 120),
    genericField("remissionNumber", "Remision", 120),
    genericField("factura", "Factura", 120),
    genericField("cost", "Precio", 120),
    genericField("expenses", "Gasto", 120),
    genericField("profit", "Ganancia", 120),
    genericField("comissions", "Comisiones", 120),
    genericField("comissionStatus", "Comision Pagada", 150),
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (rowData) => {
        // console.log("rendering cell")
        const invoiceValues = rowData.row;
        const concepts = rowData.row.concepts;
        return (
          <div className="icons-container">
            <EditButton rowData={rowData} onEditClick={onEditClick} />
            {/* <span>sss</span> */}
            {/* <SavePdf rowData={rowData} /> */}
            <LazyDownloadPDFButton
              invoiceValues={invoiceValues}
              concepts={concepts}
              title={"PDF"}
            />
          </div>
        );
      },
      // renderHeader: (rowData) => <RenderHeader rowData={rowData} />,
      sortable: false,
    },
  ];

  const columnsAdmin = [
    // { field: "invoiceDate", headerName: "Fecha", width: 100 },
    genericField("client", "Cliente", 120),
    genericField("salesman", "Vendedor", 120),
    genericField("invoiceNumber", "Folio", 100),
    genericField("title", "Descripcion", 300),
    genericField("billingDate", "Fecha fact.", 120),
    genericField("paymmentDate", "Fecha pago", 120),
    genericField("status", "Status", 120),
    genericField("OC", "OC", 120),
    genericField("receptionNumber", "Recepcion", 120),
    genericField("remissionNumber", "Remision", 120),
    genericField("factura", "Factura", 120),
    genericField("cost", "Precio", 120),
    genericField("expenses", "Gasto", 120),
    genericField("profit", "Ganancia", 120),
    genericField("comissions", "Comisiones", 120),
    genericField("costPlusIva", "Precio + IVA", 120),
    genericField("IVA", "% IVA", 120),
    genericField("comissionStatus", "Comision Pagada", 150),
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (rowData) => {
        // console.log("rendering cell")
        const invoiceValues = rowData.row;
        const concepts = rowData.row.concepts;
        return (
          <div className="icons-container">
            <EditButton rowData={rowData} onEditClick={onEditClick} />
            {/* <DeleteButton rowData={rowData} /> */}
            <LazyDownloadPDFButton
              // rowData={rowData}
              invoiceValues={invoiceValues}
              concepts={concepts}
              title={"PDF"}
            />
          </div>
        );
      },
    },
  ];
  const columnsDirector = [
    genericField("invoiceDate", "Fecha", 120),
    genericField("salesman", "Vendedor", 120),
    genericField("client", "Cliente", 120),
    genericField("work", "Trabajo", 120),
    genericField("invoiceNumber", "Folio", 100),
    genericField("partNumber", "# Parte", 120),
    genericField("title", "Descripcion", 300),
    genericField("line", "Linea", 120),
    genericField("status", "Status", 120),
    genericField("OC", "OC", 120),
    genericField("receptionNumber", "Recepcion", 120),
    genericField("remissionNumber", "Remision", 120),
    genericField("factura", "Factura", 120),
    genericField("cost", "Precio", 120),
    genericField("expenses", "Gasto", 120),
    genericField("profit", "Ganancia", 120),
    genericField("comissions", "Comisiones", 120),
    genericField("costPlusIva", "Precio + IVA", 120),
    genericField("IVA", "% IVA", 120),
    genericField("comissionStatus", "Comision Pagada", 150),
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (rowData) => {
        // console.log("rendering cell")
        const invoiceValues = rowData.row;
        const concepts = rowData.row.concepts;
        return (
          <div className="icons-container">
            <EditButton rowData={rowData} onEditClick={onEditClick} />
            <DeleteButton rowData={rowData} />
            <LazyDownloadPDFButton
              // rowData={rowData}
              invoiceValues={invoiceValues}
              concepts={concepts}
              title={"PDF"}
            />
          </div>
        );
      },
    },
  ];

  checkRole(role);
  console.log(tableData);
  return (
    <div style={{ height: 700, width: "100%" }}>
      <FilterModal
        open={modal}
        columnName={filterColumn}
        onClose={handleClose}
        filterValues={filterValues}
      />

      <DataGridPro
        rows={tableData}
        columns={columns}
        pageSize={50}
        pemailSize={5}
        rowsPerPemailOptions={[5]}
        disableColumnMenu={isFilterEnabled}
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = tableData.filter((row) =>
            selectedIDs.has(row._id.toString())
          );
          // console.log(selectedRowData);
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "invoiceDate", sort: "desc" }],
          },
        }}
        /* sx={{
          '& .green': {
            bgcolor: rowsColors.green,
            //color: 'white'
          },
          '& .ligthGreen': {
            bgcolor: rowsColors.ligthGreen,
            //color: 'white'
          },
          '& .red': {
            bgcolor: rowsColors.red,
            color: 'white'
          },
          '& .ligthRed': {
            bgcolor: rowsColors.ligthRed,
            //color: 'white'
          },
          '& .yellow': {
            bgcolor: rowsColors.yellow,
            //color: 'white'
          },
          '& .ligthYellow': {
            bgcolor: rowsColors.ligthYellow,
            //color: 'white'
          },
        }} */
        getRowClassName={(params) => `${params.row.className}`}
      />
    </div>
  );
};

InvoicesDataTable.defaultProps = {
  invoices: [],
};

export default InvoicesDataTable;
