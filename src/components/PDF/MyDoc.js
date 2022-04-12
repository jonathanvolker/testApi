import React from "react";
import {
  // PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import LogoImage from "../../assets/images/HPM_LOGO.jpeg";
import arialRoundedFont from "../../assets/fonts/arlrdbd.ttf";
import arialFont from "../../assets/fonts/arial.ttf";
import Table from "./Table";
import { calculateDate, generaFolio } from "../../utils/formatters";

const styles = StyleSheet.create({
  page: {
    paddingTop: "10%",
    justifyContent: "space-between",
    paddingHorizontal: "13%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageStyle: {
    width: 125,
    height: 63,
    marginRight: "1%",
  },
  ownerStyle: {
    fontFamily: "Arial Rounded MT Bold",
    // fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "bold",
  },
  ownerGeneralStyle: {
    fontfamily: "Arial",
    fontSize: 8,
    fontWeight: "bold",
  },

  quoteDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontfamily: "Arial",
    fontsize: 10,
    marginBottom: "2%",
  },
  quoteReceptor: {
    width: "40%",
    fontfamily: "Arial",
    fontsize: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  quoteDateDetails: {
    width: "30%",
    justifyContent: "flex-start",
    marginbottom: "10%",
  },

  a10: { fontfamily: "Arial", fontSize: 10 },
  a10blue: {
    fontFamily: "Arial Rounded MT Bold",
    fontSize: 10,
    color: "blue",
    fontweight: "bold",
  },
  a10blueF: {
    fontfamily: "Arial",
    fontSize: 10,
    color: "blue",
    fontweight: "bold",
    width: "100%",
    marginBottom: "2%",
  },
  col2: { flexDirection: "row", justifyContent: "space-between" },
  tableContainer: {
    flexGrow: 1,
    // border: "1px solid black",
    alignItems: "center",
    //justifyContent: "center",
  },
  quoteRectangleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  quoteRectangle: {
    width: "180px",
    height: "30px",
    border: "1px solid black",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    textalign: "center",
  },

  quoteRectangleText: {
    fontfamily: "Arial",
    fontSize: 20,
    color: "blue",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontfamily: "Arial",
    fontsize: 10,
  },
  footerLeftSide: {
    width: "50%",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  footerRightSideContainer: {
    width: "23%",
    justifyContent: "flex-end",
  },

  footerAutorizeText: {
    fontfamily: "Arial",
    fontSize: 8,
    textAlign: "left",
    width: "100%",
  },

  footerAutorizerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: "37%",
    marginTop: "3px",
    borderTop: "1px solid black",
  },
  footerAutorizerName: {
    width: "100%",
    fontfamily: "Arial",
    fontSize: 8,
    textAlign: "center",
  },
  footerSalesmanText: {
    fontfamily: "Arial",
    fontSize: 8,
  },
  line: {
    justifyContent: "center",
    borderTop: "1px solid black",
    width: "70%",
    marginBottom: "3%",
  },
  a8: {
    fontfamily: "Arial",
    fontSize: 8,
    marginBottom: "2%",
  },
  a8Cot: {
    fontfamily: "Arial",
    fontSize: 8,
    marginBottom: "2%",
    marginTop: "1%",
  },
  a8U: {
    fontFamily: "Arial Rounded MT Bold",
    fontSize: 9,
    marginBottom: "2%",
  },
  la: {
    fontfamily: "Arial",
    fontSize: 8,
  },
  laU: {
    fontFamily: "Arial Rounded MT Bold",
    fontSize: 8,
  },
  a8FF: {
    fontFamily: "Arial Rounded MT Bold",
    fontSize: 8,
    width: "100%",
    fontWeight: 500,
    marginBottom: "2%",
  },
  a8F: {
    fontFamily: "Arial",
    fontSize: 8,
    width: "100%",
    fontWeight: 500,
    marginBottom: "2%",
  },
});
const MyDoc = ({ tableData, check, client, invoiceValues }) => {
  const newClient = client.customer;
  Font.register({
    family: "Arial Rounded MT Bold",
    format: "truetype",
    src: arialRoundedFont,
    fontWeight: 400,
  });
  Font.register({
    family: "Arial",
    format: "truetype",
    src: arialFont,
  });

  const generalOwnerInfo = {
    name: "Guadalupe Ortiz Inojoza",
    rfc: "RFC - OIIG 671211 R79 RP - Z32-11802-10-6",
    location:
      " Calle Rio Suchiate No. 282, Col. Gonzalez Ortega, Mexicali, B.C., México, C.P. 21397",
    contactInfo: "Tel. (686) 561 0134 E-mail: lupita_hpm@yahoo.com",
    invoiceNumber: generaFolio(
      invoiceValues.invoiceNumber,
      invoiceValues.client
    ),
  };

  const quoteReceptorInfo = {
    // user: newClient.name,
    user: invoiceValues.user,
    // razon: "SABRITAS S. de R.L. de C.V.",
    razon: newClient.razonSocial,
    calle: newClient.mainAddress,
    telephoneNumbers: newClient.telephone,
    // telephoneNumbers: "Tel. (686) 561 5970 Fax. (686) 561 5928",
    deliveryTime: invoiceValues.deliveryTime
      ? invoiceValues.deliveryTime
      : "2 -3 DIAS DRO",
    // deliveryLocation: "Su planta en Mexicali",
    deliveryLocation: newClient.lba,
    // currency: "PESOS",
    currency: newClient.currency,
    // conditions: "NETO A 45 DIAS",
    conditions: newClient.conditions,
  };
  const quoteNotes = {
    // authorizer: "Luis Castro",
    authorizer: invoiceValues.salesman,
    Notes: `Los precios son más I.V.A
    Se requiere Orden de compra para iniciar el trabajo
    Los precios son unicamente para las cantidades minimas especificadas.
    Esta cotizacion tiene una vigencia de 10 dias a partir de esta fecha`,
  };

  const pdfData = tableData;
  // newDate = formatDate(e);
  const newDate = calculateDate();
  // console.log(newDate);
  return (
    // <div>MyDoc</div>
    // size="A4"
    // 1mm 2.833 mm
    <Document>
      <Page size={[611, 789]} style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <View>
            <Image src={LogoImage} style={styles.imageStyle}></Image>
          </View>

          <View style={styles.section}>
            <Text style={styles.ownerStyle}>{generalOwnerInfo.name}</Text>
            <Text style={styles.ownerGeneralStyle}>{generalOwnerInfo.rfc}</Text>
            <Text style={styles.ownerGeneralStyle}>
              {generalOwnerInfo.location}
            </Text>
            <Text style={styles.ownerGeneralStyle}>
              {generalOwnerInfo.contactInfo}
            </Text>
          </View>
        </View>

        <View style={styles.quoteRectangleContainer}>
          <View style={styles.quoteRectangle}>
            <Text style={styles.quoteRectangleText}>COTIZACIÓN</Text>
          </View>
        </View>

        <View style={styles.quoteDetails}>
          <View style={styles.quoteReceptor}>
            <Text style={styles.a8FF}>Para:</Text>
            <Text style={styles.a10blueF}>{quoteReceptorInfo.user}</Text>
            <Text style={styles.a8F}>{quoteReceptorInfo.razon}</Text>
            <Text style={styles.a8F}>{quoteReceptorInfo.calle}</Text>
            <Text style={styles.a8F}>{quoteReceptorInfo.telephoneNumbers}</Text>
          </View>

          <View style={styles.quoteDateDetails}>
            <View style={styles.col2}>
              <Text style={styles.a8Cot}>Cotización No.:</Text>
              <Text style={styles.a10blue}>
                {generalOwnerInfo.invoiceNumber}
              </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a8}>Fecha:</Text>
              <Text style={styles.a8U}>{newDate}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a8}>Tiempo de Entrega:</Text>
              <Text style={styles.a8U}>{quoteReceptorInfo.deliveryTime}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a8}>Condiciones:</Text>
              <Text style={styles.a8U}>{quoteReceptorInfo.conditions}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a8}>Moneda:</Text>
              <Text style={styles.a8U}>{quoteReceptorInfo.currency}</Text>
            </View>

            <View style={styles.col2}>
              <Text style={styles.la}>L.A.B:</Text>
              <Text style={styles.laU}>
                {quoteReceptorInfo.deliveryLocation.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Table pdfData={pdfData} invoiceValues={invoiceValues} />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeftSide}>
            <Text style={styles.a8}>Notas:</Text>
            <Text style={styles.a8}>{quoteNotes.Notes}</Text>
          </View>
          <View style={styles.footerRightSideContainer}>
            <Text style={styles.footerAutorizeText}>Autorizo:</Text>
            <View style={styles.footerAutorizerContainer}>
              <Text style={styles.footerAutorizerName}>
                {quoteNotes.authorizer}
              </Text>
              <Text style={styles.footerSalesmanText}>VENTAS</Text>
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <Text></Text>
        </View>
      </Page>
     
    </Document>
  );
};

export default MyDoc;