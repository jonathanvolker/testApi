import React, { Fragment } from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { BorderLeft } from "@mui/icons-material";
import { isNotValid } from "../../utils/validators";
import { currencyFormat } from "../../utils/formatters";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    // height: 24,
    fontSize: 8,
    
    //borderBottom: "1px solid black",
    // marginBottom: 5,
  },
  partContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "25%",
    // position in center
    flexDirection: "column",
    paddingLeft: "20px",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },

  descriptionContainer: {
    flexDirection: "column",
    width: "50%",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "20px",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  description: {
    width: "85%",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  subDescription: {
    width: "85%",
    },
  quantityContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "7%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRight: "1px solid black",
    //avoid overlapping with previous container
    // borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  umContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "5%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRight: "1px solid black",
    //avoid overlapping with previous container
    // borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  priceContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "10%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRight: "1px solid black",
    //avoid overlapping with previous container
    // borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  amountContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "15%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRight: "1px solid black",
    //avoid overlapping with previous container
    // borderLeft: "1px solid black",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
});

const TableRow = ({ pdfData }) => {
  // console.log("concepts received at tablerow");
  // console.log(pdfData);
 
  const rows = pdfData.map((item) => {
    const price = isNotValid(item.price) ? "" : currencyFormat(item.price);

    const totalPrice = isNotValid(item.totalPrice)
      ? ""
      : currencyFormat(item.totalPrice);

    return (
      <View style={styles.row} key={item.id}>
        <View style={styles.partContainer}>
          <Text style={styles.parteRow}>{item.partNumber ?? ""}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {item.description.toUpperCase()}
          </Text>
          <Text style={styles.subDescription}>{item.subdescription}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
        <View style={styles.umContainer}>
          <Text style={styles.um}>pzs</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.pu}>{price}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{totalPrice}</Text>
        </View>
      </View>
    );
  });
  return <View style={styles.rowsContainer}>{rows}</View>;
};

export default TableRow;