import { addInvoice, modifyInvoiceById } from "../../../Context";
import swal from "sweetalert";
//import { isNotValid } from "../../../utils/validators";
import { formatInvoicesToDb } from "../../../utils/formatters";

export const onDeleteClick = (e, clickedConcept, tableData) => {
  // console.log("pressed the delete button");
  const filteredConcepts = tableData.filter(
    (concept) => concept.id !== clickedConcept.id
  );
  // console.log(filteredConcepts);
  // console.log(clickedConcept);
  return filteredConcepts;
};

export const getLatestId = (newTableData) => {
  const tableIds = newTableData.map((row) => {
    return Number(row.id);
  });
  let max_of_array;
  if (tableIds.length) {
    max_of_array = Math.max.apply(Math, tableIds);
  } else {
    max_of_array = 0;
  }
  // console.log("max_of_array: " + max_of_array);
  // console.log(newTableData);
  return max_of_array;
};

export const processConceptData = (conceptValues, tableData) => {
  conceptValues.partNumber = conceptValues.partNumber.toUpperCase();
  conceptValues.description = conceptValues.description.toUpperCase();
  conceptValues.subdescription = conceptValues.subdescription.toUpperCase();
  conceptValues.id = getLatestId(tableData) + 1;
  conceptValues.quantity = Number(conceptValues.quantity);
  conceptValues.price = Number(conceptValues.price);
  conceptValues.totalPrice = conceptValues.quantity * conceptValues.price;
  return conceptValues;
};

export const calculateTotals = (newTableData) => {
  let total = 0;
  const initialValue = 0;
  const tablePrices = newTableData.map((row) => {
    return Number(row.totalPrice);
  });

  // console.log(tablePrices);
  total = tablePrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  // console.log(`total es ${total}`);
  return total;
};

export const conceptDataIsValid = (conceptValues, tableData) => {
  // console.log("adding");
  // console.log(conceptValues);

  if (
    isNaN(conceptValues.quantity) ||
    conceptValues.quantity.length === 0 ||
    isNaN(conceptValues.price) ||
    conceptValues.price.length === 0
  ) {
    return false;
  } else {
    return true;
  }
};

export const saveQuote = async (
  invoiceValues,
  handleInvoiceChange,
  tableData,
  id,
  setOpen,
  dispatch
) => {
  // console.log(invoiceValues);
  let body = formatInvoicesToDb(invoiceValues, tableData);
  // console.log("===saving quote");
  // console.log(body);
  if (id) {
    let newPdfDate = new Date();
    body.pdfDate = newPdfDate;
    const editedInvoice = await modifyInvoiceById(id, body);
    // console.log("===edited quote");
    // console.log(editedInvoice);
    handleInvoiceChange(editedInvoice.invoice);
  } else {
    let add = addInvoice(dispatch, body);
    add.then((e) => {
      if (e.status === "error") {
        swal({ text: "No puede haber campos vacios" });
      } else {
        // console.log("received from backend ", e);
        handleInvoiceChange(e.invoice);
        setOpen(true);
      }
    });
  }
};

export const savePdfTable = (rowData) => {
  // console.log(rowData);
  const id = rowData.row._id;
  let newPdfDate = new Date();
  let body = {
    pdfDate: newPdfDate,
  };
  return modifyInvoiceById(id, body);
};
