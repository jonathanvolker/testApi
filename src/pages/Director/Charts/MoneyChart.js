import React from "react";
import Plot from "react-plotly.js";
import { pieChart } from "../../../utils/formatters";

const MoneyChart = ({ invoices }) => {
  const { values, labels } = pieChart(invoices);

  var monetaryData = [
    {
      values,
      labels,
      type: "pie",
    },
  ];

  var monetaryLayout = {
    title: {
      text: "<b>Distribución monetaria</b>",
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
      data={monetaryData}
      layout={monetaryLayout}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default MoneyChart;
