import React, { useEffect, useState } from "react";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import InvoicesDataTable from "../../components/Seller/InvoicesDataTable";
import SideBar from "../../components/Sidebar/SideBar";
import "../../components/Seller/SellerPage.css";
import { useHistory } from "react-router-dom";
import { useAuthState, getInvoices, useAuthDispatch } from "../../Context";
import { formatInvoices } from "../../utils/formatters";

const AdministratorPage = () => {
  const [invoices, setInvoices] = useState([]);
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  useEffect(async () => {
    if (state.invoices && state.invoices.length > 1) {
      // existent invoices on state
      const formattedInvoices = formatInvoices(state.invoices);
      setInvoices(formattedInvoices);
    } else {
      //non existent invoices on state
      const dbInvoices = await getInvoices(dispatch);
      if (
        dbInvoices &&
        dbInvoices.filteredInvoices &&
        dbInvoices.filteredInvoices.length > 1
      ) {
        const formattedInvoices = formatInvoices(dbInvoices.filteredInvoices);
        setInvoices(formattedInvoices);
      }
    }
  }, []);

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
        <div className="page-title">Administrar cotizaciones generadas</div>
        <InvoicesDataTable invoices={invoices} />
      </div>
    </>
  );
};

export default AdministratorPage;
