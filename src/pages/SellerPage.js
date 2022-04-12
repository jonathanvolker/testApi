import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar";
import InvoicesDataTable from "../components/Seller/InvoicesDataTable";
import SideBar from "../components/Sidebar/SideBar";
import { Button } from "@mui/material";
import {
  // Delete as DeleteIcon,
  // Edit as EditIcon,
  AddCircle as AddIcon,
} from "@mui/icons-material";
import "../components/Seller/SellerPage.css";
import { useHistory } from "react-router-dom";
import { useAuthState, getInvoices, useAuthDispatch } from "../Context";
import { formatInvoices } from "../utils/formatters";
const SellerPage = () => {
  const [invoices, setInvoices] = useState([]);
  const state = useAuthState();
  const role = state?.role ?? "";
  let seller = state?.user?.name ?? "";
  const dispatch = useAuthDispatch();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

  const returnFilteredInvoices = (formattedInvoices) => {
    // console.log(`detected role ${role} for seller ${seller}`);
    if (role === "developer" || role === "director") {
      return formattedInvoices;
    } else {
      let filteredInvoices = formattedInvoices.filter((invoice) => {
        return invoice.salesman.toUpperCase() === seller.toUpperCase();
      });
      return filteredInvoices;
    }
  };

  useEffect(async () => {
    if (state.invoices && state.invoices.length > 1) {
      // existent invoices on state
      // console.log(state.invoices);
      const formattedInvoices = formatInvoices(state.invoices);
      const filteredInvoices = returnFilteredInvoices(formattedInvoices);
      setInvoices(filteredInvoices);
    } else {
      //non existent invoices on state
      const dbInvoices = await getInvoices(dispatch);
      if (
        dbInvoices &&
        dbInvoices.filteredInvoices &&
        dbInvoices.filteredInvoices.length > 1
      ) {
        const formattedInvoices = formatInvoices(dbInvoices.filteredInvoices);
        const filteredInvoices = returnFilteredInvoices(formattedInvoices);
        setInvoices(filteredInvoices);
      }
    }
  }, [role, seller]);

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };
  let history = useHistory();

  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      <div className="page-container">
        <div className="page-title">Cotizaciones previamente generadas</div>
        <div className="datagrid-icons-container">
          <div className="filter-icon-container">
            <Button
              onClick={() => {
                setIsFilterEnabled(!isFilterEnabled);
              }}
              variant="contained"
              disabled
            >
              Habilita Filtros
            </Button>
          </div>

          <div
            className="add-icon-container"
            onClick={() => {
              // console.log("add button");
              history.push("/sellers-quote");
            }}
          >
            {/* <div>Generar nueva cotización</div> */}
            <Button
              variant="outlined"
              endIcon={<AddIcon sx={{ fontSize: "30px" }} />}
            >
              Generar nueva cotización
            </Button>
          </div>
        </div>
        <InvoicesDataTable
          invoices={invoices}
          isFilterEnabled={isFilterEnabled}
        />
      </div>
    </>
  );
};

export default SellerPage;
