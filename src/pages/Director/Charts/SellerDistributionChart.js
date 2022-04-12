import React from "react";
import Plot from "react-plotly.js";
import { sellersChart } from "../../../utils/formatters";

const SellerDistributionChart = ({ invoices }) => {
  var data = sellersChart(invoices);
  var layout = {
    barmode: "stack",
    xaxis: { title: "Vendedores" },
    yaxis: { title: "Ventas" },
    title: {
      text: "<b>Desempeño vendedores (Cotizaciones)</b>",
      font: {
        family: "Poppins",
        size: 15,
        fontweight: "bold",
      },
    },

    autosize: true,
    responsive: true,
  };
  return (
    <Plot
      data={data}
      layout={layout}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default SellerDistributionChart;
