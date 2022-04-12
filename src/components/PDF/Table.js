import React from "react";
import { StyleSheet, Text, View,  Font } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    width: "100%",
  },
});

const Table = ({ pdfData, invoiceValues }) => {

  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      <TableRow pdfData={pdfData} />
      <TableFooter invoiceValues={invoiceValues} />
    </View>
  );
};

export default Table;
