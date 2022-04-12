import React, { useEffect } from "react";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import SideBar from "../../components/Sidebar/SideBar";
import { getInvoices, useAuthDispatch, useAuthState } from "../../Context";
import { formatInvoicesChart } from "../../utils/formatters";
import MoneyChart from "./Charts/MoneyChart";
import SellerDistributionChart from "./Charts/SellerDistributionChart";
import SellerDistributionChartMoney from "./Charts/SellerDistributionChartMoney";
import TimeChart from "./Charts/TimeChart";
import "./DirectorCharts.css";

const DirectorCharts = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);

  useEffect(async () => {
    if (state.invoices && state.invoices.length > 1) {
      const formattedInvoices = formatInvoicesChart(state.invoices);
      setInvoices(formattedInvoices);
    } else {
      const dbInvoices = await getInvoices(dispatch);
      if (
        dbInvoices &&
        dbInvoices.filteredInvoices &&
        dbInvoices.filteredInvoices.length > 1
      ) {
        const formattedInvoices = formatInvoicesChart(
          dbInvoices.filteredInvoices
        );
        setInvoices(formattedInvoices);
      }
    }
  }, [state.invoices]);

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
        <div className="page-title">Modulo de Métricos</div>

        <div id="charts-container" className="charts-container">
          <div className="chart-container">
            <SellerDistributionChart invoices={invoices} />
          </div>

          <div className="chart-container">
            <SellerDistributionChartMoney invoices={invoices} />
          </div>
          
          <div className="chart-container">
            <MoneyChart invoices={invoices} />
          </div>

          <div className="chart-container">
            <TimeChart invoices={invoices}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectorCharts;
