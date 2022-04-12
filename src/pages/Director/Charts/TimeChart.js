import React from "react";
import Plot from "react-plotly.js";
import { timeChart } from "../../../utils/formatters";

const TimeChart = ({ invoices }) => {
  const { dates, quotedCost } = timeChart(invoices);

  var timeData = [
    {
      type: "scatter",
      mode: "lines+points",
      //   x: [1, 2, 3],
      //   y: [2, 6, 3],
      x: dates,
      y: quotedCost,
      marker: {
        // color: "red",
        color: "#1f77b4", // muted blue
      },
    },
  ];

  var timeLayout = {
    title: {
      text: "<b>Comportamiento ventas</b>",
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
      data={timeData}
      layout={timeLayout}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default TimeChart;
