import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { BorderLeft } from "@mui/icons-material";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: '#bff0fd',
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontSize: 8,
    border: "1px solid black",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
  },
  partContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "25%",
    // position in center
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "20px",
    justifyContent: "center",
    // borderLeft: "1px solid black",
  },
  descriptionContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "50.2%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  quantityContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "7%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid black",
  },
  umContainer: {
    //ensure it is 100% of height
    height: "100%",
    width: "5%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid black",
  },
  puContainer: {
    height: "100%",
    width: "10.1%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid black",
  },
  amountContainer: {
    height: "100%",
    width: "14.8%",
    // position in center
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const TableHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.partContainer}>
        <Text style={styles.parteRow}>NO. PARTE</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Descripcion</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.qty}>Cant.</Text>
      </View>
      <View style={styles.umContainer}>
        <Text style={styles.umRow}>U.M.</Text>
      </View>
      <View style={styles.puContainer}>
        <Text style={styles.puRow}>P.U.</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>Importe</Text>
      </View>
    </View>
  );
};

export default TableHeader;