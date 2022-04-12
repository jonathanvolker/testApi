import React, { useState } from "react";
import Button from "@mui/material/Button";
import { pdf } from "@react-pdf/renderer";
//import { saveAs } from "file-saver";
import MyDoc from "../PDF/MyDoc";
import { getClient, useAuthDispatch, getInvoices } from "../../Context";
import { formatInvoiceTitle } from "../../utils/formatters";
import { Redirect } from "react-router-dom";

const LazyDownloadPDFButton = ({ invoiceValues, concepts, title }) => {
  const dispatch = useAuthDispatch();
  const [redirect, setRedirect] = useState(false);

  const getClientByID = async (id) => {
    console.log(id);
    const client = await getClient(dispatch, id);
    if (client && client.info && client.info.length > 0) {
      return client.info[0];
    }
  };

  const downloadPdfHelper = async (invoiceValues, concepts) => {
    const client = await getClientByID(invoiceValues.clientId);
    const clients = {
      customer: client,
    };
    // console.log("================downloadPdfHelper");
    // console.log("invoice values", invoiceValues);
    // console.log("concepts ",concepts);
    // console.log("====clients")
    // console.log({ clients });
    const doc = (
      <MyDoc
        tableData={concepts}
        invoiceValues={invoiceValues.rawData}
        client={clients}
      />
    );
    const asPdf = pdf([]); // {} is important, throws without an argument
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    // const url = URL.createObjectURL(blob);
    // const pdfWindow = window.open();
    // pdfWindow.location.href = url;
    // saveAs(blob, formatInvoiceTitle(invoiceValues, true) + ".pdf");
    var urlToOpen = window.URL.createObjectURL(
      blob
      //  { oneTimeOnly: true }
    );
    var anchor = document.createElement("a");
    anchor.href = urlToOpen;
    anchor.target = "_blank";
    anchor.setAttribute(
      "download",
      formatInvoiceTitle(invoiceValues, true) + ".pdf"
    );
    anchor.click();
    await getInvoices(dispatch);
    setRedirect(true);

  };
  if (redirect){
    return <Redirect to='/sellers' />
}
return <Button onClick={() => downloadPdfHelper(invoiceValues, concepts)}> {title}</Button>


};
export default LazyDownloadPDFButton;
