import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { isNotValid } from "../../utils/validators";
import { currencyFormat } from "../../utils/formatters";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 8,
    //        border:"1px solid black"
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  descriptionContainer: {
    width: "86.7%",
    height: "100%",
    flexdirection: "column",
    justifyContent: "center",
    textAlign: "right",
    paddingRight: "15px",
    // borderRightWidth: 1,
    borderRight: "1px solid black",
  },
  totalContainer: {
    width: "13.3%",
    height: "100%",
    // padding: 4,
    flexdirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TableFooter = ({ invoiceValues }) => {
  // console.log(invoiceValues);
  const total = isNotValid(invoiceValues.cost)
    ? ""
    : currencyFormat(invoiceValues.cost);

  return (
    <View style={styles.row}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>TOTAL</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{total}</Text>
      </View>
    </View>
  );
};

export default TableFooter;