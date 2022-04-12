import React from "react";
import Plot from "react-plotly.js";
import { sellersChartMoney } from "../../../utils/formatters";

const SellerDistributionChartMoney = ({ invoices }) => {
  var data = sellersChartMoney(invoices);
  var layout = {
    barmode: "stack",
    xaxis: { title: "Vendedores" },
    yaxis: { title: "Ventas(costos)" },
    title: {
      text: "<b>Desempeño vendedores (MXN)</b>",
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

export default SellerDistributionChartMoney;
