import React, { useEffect, useState } from "react";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import InvoicesDataTable from "../../components/Seller/InvoicesDataTable";
import SideBar from "../../components/Sidebar/SideBar";
import "../../components/Seller/SellerPage.css";
import { useAuthState, getInvoices, useAuthDispatch } from "../../Context";
import { formatInvoices } from "../../utils/formatters";

const Records = () => {
  const [invoices, setInvoices] = useState([]);
  const state = useAuthState();
  const role = state?.role ?? "";
  let seller = state?.user?.name ?? "";
  const dispatch = useAuthDispatch();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const historyDetail = true;

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

    return (
        <>
        <MenuAppBar handleBtnClick={toggleSidebar} />
        <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
  
        <div className="page-container">
          <div className="page-title">Historial de cotizaciones</div>
      
          <InvoicesDataTable
            invoices={invoices}
            isFilterEnabled={isFilterEnabled}
            historyDetail={historyDetail}
          />
        </div>
        </>
    )
}


export default Records;