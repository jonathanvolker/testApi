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
import LogoImage from "../../assets/images/HPM_LOGO.jpg";
import arialRoundedFont from "../../assets/fonts/arlrdbd.ttf";
import arialFont from "../../assets/fonts/arial.ttf";
import Table from "../PDF/Table";
const styles = StyleSheet.create({
  page: {
    paddingTop: "10%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    // border: "1px solid black",
  },
  quoteDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontfamily: "Arial",
    fontsize: 35,
    marginBottom: "1%"
    // border: "1px solid black",
  },
  quoteReceptor: {
    width: "40%",
    fontfamily: "Arial",
    fontsize: 35,
    justifyContent: "flex-start",
    paddingLeft: "10%",
  },
  quoteDateDetails: {
    width: "40%",
    justifyContent: "flex-start",
    paddingRight: "10%",
    marginbottom: "10%",
  },

  imageStyle: {
    width: 160,
    height: 120,
    marginRight: "2%",
  },
  ownerStyle: {
    fontFamily: "Arial Rounded MT Bold",
    // fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "bold",
    padding: "2%"
  },
  ownerGeneralStyle: {
    fontfamily: "Arial",
    fontSize: 15,
    fontWeight: "normal",
    padding: "2%"
  },
  a10: { fontfamily: "Arial", fontSize: 10, padding: "2%" },
  a12blue: {
    fontfamily: "Arial",
    fontSize: 12,
    color: "blue",
    fontweight: 900,
    padding: "2%"

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
    width: "250px",
    height: "50px",
    border: "1px solid black",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10%",
    textalign: "center",
  },
  quoteRectangleText: {
    fontfamily: "Arial",
    fontSize: 30,
    color: "blue",
    fontweight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontfamily: "Arial",
    fontsize: 10,
    // border: "1px solid black",
  },
  footerLeftSide: {
    width: "50%",
    justifyContent: "flex-start",
    paddingLeft: "10%",
    marginBottom: "2%",
  },
  footerRightSide: {
    width: "25%",
    justifyContent: "flex-end",
    paddingRight: "10%",
  },
  footerAutorizer: {
    justifyContent: "flex-end",
    marginLeft: "45%",
  },
  line: {
    justifyContent: "center",
    borderTop: "1px solid black",
    width: "60%",
    marginBottom: "3%",
    marginLeft: "10%",
  },
});
const MyDoc = ({ tableData, check }) => {

  //const newClient = client.customer
  Font.register({
    family: "Arial Rounded MT Bold",
    format: "truetype",
    src: arialRoundedFont,
  });
  Font.register({
    family: "Arial",
    format: "truetype",
    src: arialFont,
  });
  const generalOwnerInfo = {
    name: "name",
    rfc: "rfc",
    location: "location",
    contactInfo: "Tel. (686) 561 0134 E-mail: lupita_hpm@yahoo.com",
  };
  const quoteReceptorInfo = {
    user: "user",
    razon: "SABRITAS S. de R.L. de C.V.",
    calle: "NORTE 45 # 740, COL. IND. VALLEJO",
    telephoneNumbers: "Tel. (686) 561 5970 Fax. (686) 561 5928",
    deliveryTime: "2 -3 DIAS DRO",
    deliveryLocation: "Su planta en Mexicali",
    currency: "PESOS",
    conditions: "NETO A 45 DIAS",
  };
  const quoteNotes = {
    authorizer: "Luis Castro",
    Notes: `Los precios son más I.V.A
    Se requiere Orden de compra para iniciar el trabajo
    Los precios son unicamente para las cantidades minimas especificadas.
    Esta cotizacion tiene una vigencia de 10 dias a partir de esta fecha`,
  };

  const pdfData = tableData;
  const calculateDate = () => {
    let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date()
      .toLocaleDateString('es', opciones)
      .replace(/ /g, '-')
      .replace('.', '')
      .replace(/-([a-z])/, function (x) { return '-' + x[1].toUpperCase() });
    return date
  }
  const newDate = calculateDate();
  // console.log(newDate);
  return (
    // <div>MyDoc</div>
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
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
            <Text style={styles.quoteRectangleText}>Cotización</Text>
          </View>
        </View>

        <View style={styles.quoteDetails}>
          <View style={styles.quoteReceptor}>
            <Text style={styles.a10}>Para:</Text>
            <Text style={styles.a12blue}>{quoteReceptorInfo.user}</Text>
            <Text style={styles.a10}>{quoteReceptorInfo.razon}</Text>
            <Text style={styles.a10}>{quoteReceptorInfo.calle}</Text>
            <Text style={styles.a10}>
              DEL. AZCAPOTZALCO, C.P. 02300, MEXICO, D.F.
            </Text>
            <Text style={styles.a10}>{quoteReceptorInfo.telephoneNumbers}</Text>
          </View>

          <View style={styles.quoteDateDetails}>
            <View style={styles.col2}>
              <Text style={styles.a10}>Cotización No.:</Text>
              <Text style={styles.a12blue}>SAB00001</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a10}>Fecha:</Text>
              <Text style={styles.a10}>{newDate}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a10}>Tiempo de Entrega:</Text>
              <Text style={styles.a10}>{quoteReceptorInfo.deliveryTime}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a10}>Condiciones:</Text>
              <Text style={styles.a10}>{quoteReceptorInfo.conditions}</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.a10}>Moneda:</Text>
              <Text style={styles.a10}>{quoteReceptorInfo.currency}</Text>
            </View>

            <View style={styles.col2}>
              <Text style={styles.a10}>L.A.B:</Text>
              <Text style={styles.a10}>
                {quoteReceptorInfo.deliveryLocation}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Table pdfData={pdfData} check={check} />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeftSide}>
            <Text style={styles.a10}>Notas:</Text>
            <Text style={styles.a10}>{quoteNotes.Notes}</Text>
          </View>
          <View style={styles.footerRightSide}>
            <Text style={styles.a10}>Autorizo: _______________</Text>
            <View style={styles.footerAutorizer}>
              <Text style={styles.a10}> {quoteNotes.authorizer}</Text>
              <Text style={styles.a10}>Vendedor</Text>
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
