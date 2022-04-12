import { letterSpacing } from "@mui/system";
import { STATUS } from "../Config/constants";
import { isNotValid } from "./validators";

export const currencyFormat = (num) => {
  // console.log(`to convert ${num} ${typeof num}`);
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatDate = (e) => {
  return e.invoiceDate.slice(0, 11).replace(/-/g, "/").replace("T", " ");
};
export const formatBillingDate = (e) => {
  return e.billingDate.slice(0, 11).replace(/-/g, "/").replace("T", " ");
};
export const formatcomissionPaymmentDate = (e) => {
  return e.comissionPaymmentDate.slice(0, 11).replace(/-/g, "/").replace("T", " ");
};
export const formatPaymentDate = (e) => {
  return e.paymmentDate.slice(0, 11).replace(/-/g, "/").replace("T", " ");
};

export const calculateDate = () => {
  let opciones = { year: "numeric", month: "short", day: "numeric" };
  let date = new Date()
    .toLocaleDateString("es", opciones)
    .replace(/ /g, "-")
    .replace(".", "")
    .replace(/-([a-z])/, function (x) {
      return "-" + x[1].toUpperCase();
    });
  return date;
};

export const generaFolio = (invoiceNumber, client) => {
  switch (client.toUpperCase()) {
    case "PepsiCo".toUpperCase():
      return "PEP1000" + invoiceNumber;
      break;
    case "Ingenieria".toUpperCase():
      return "ING1000" + invoiceNumber;
      break;
    case "ALEN".toUpperCase():
      return "ALLN1000" + invoiceNumber;
      break;
    case "Sabritas".toUpperCase():
      return "SAB1000" + invoiceNumber;
      break;
    case "Mixing".toUpperCase():
      return "MIX1000" + invoiceNumber;
      break;
    case "GULFSTREAM".toUpperCase():
      return "GUL1000" + invoiceNumber;
      break;
    default:
      return "HPM0000" + invoiceNumber;
      break;
  }
};

export const formatInvoiceTitle = (
  invoiceValues,
  isFolio = false,
  isAddOrEdit = false
) => {
  let folio = "";
  if (isFolio) {
    folio = invoiceValues.invoiceNumber;
  } else {
    folio = generaFolio(invoiceValues.invoiceNumber, invoiceValues.client);
  }

  if (isAddOrEdit && invoiceValues.title) {
    return folio;
  }

  // console.log(`folio es ${folio}`);
  if (invoiceValues.concepts[0]) {
    console.log(invoiceValues.concepts[0].description)
    return folio + "_" + invoiceValues.concepts[0].description.replace(/\s/g, "_").trim();
  } else {
    return "generic.pdf";
  }
};

export const formatInvoices = (invoices) => {
  return invoices.map((e) => {
    let partNumber = "";

    const concepts = e.concepts.map((c) => {
      if (c.partNumber != "") {
        partNumber = c.partNumber;
      }
      return {
        description: c.description,
        subdescription: c.subdescription,
        price: Number(c.price),
        id: c.id,
        totalPrice: c.totalPrice,
        quantity: Number(c.quantity),
        partNumber: c.partNumber,
      };
    });

    
    let invoiceDate = "";
    if (e.invoiceDate !== null && e.invoiceDate !== undefined) {
      invoiceDate = formatDate(e);
    }
    
    let comissionPaymmentDate ="";
    if (e.comissionPaymmentDate !== null && e.comissionPaymmentDate !== undefined) {
      comissionPaymmentDate = formatcomissionPaymmentDate(e);
    }
    let billingDate = "";
    if (e.billingDate !== null && e.billingDate !== undefined) {
      billingDate = formatBillingDate(e);
    }
    let paymmentDate = "";
    if (e.paymmentDate !== null && e.paymmentDate !== undefined) {
      paymmentDate = formatPaymentDate(e);
    }

    const profit = isNotValid(e.cost - e.expenses) ? 0 : e.cost - e.expenses;
    const commissions = isNotValid(profit) ? "" : currencyFormat(profit * 0.03);
    const formattedProfit = isNotValid(profit) ? "" : currencyFormat(profit);

    return {
      invoiceNumber: generaFolio(e.invoiceNumber, e.client),
      _id: e._id,
      concepts: concepts,
      title: e.title,
      user: e.user,
      work: e.work,
      line: e.line,
      cost: isNotValid(e.cost) ? "" : currencyFormat(e.cost),
      costPlusIva: isNotValid(e.cost * 1.08)
        ? ""
        : currencyFormat(e.cost * 1.08),
      // partNumber: e.partNumber ? e.partNumber : "# de parte",
      IVA: isNotValid(e.cost * 0.08) ? "" : currencyFormat(e.cost * 0.08),
      partNumber: partNumber ? partNumber : "# de parte",
      client: e.client,
      clientId: e.clientId,
      salesman: e.salesman,
      status: e.status,
      comissionStatus: e.comissionStatus,
      OC: e.OC,
      factura: e.factura,
      expenses: isNotValid(e.expenses) ? "" : currencyFormat(e.expenses),
      profit: formattedProfit,
      comissions: commissions,
      receptionNumber: e.receptionNumber,
      remissionNumber: e.remissionNumber,
      invoiceDate: invoiceDate,
      email: e.email,
      rawData: e,
      billingDate: billingDate,
      comissionPaymmentDate: comissionPaymmentDate,
      paymmentDate: paymmentDate,
    };
  });
};

export const formatInvoicesChart = (invoices) => {
  return invoices.map((e) => {
    let partNumber = "";

    const concepts = e.concepts.map((c) => {
      if (c.partNumber != "") {
        partNumber = c.partNumber;
      }
      return {
        description: c.description,
        subdescription: c.subdescription,
        price: Number(c.price),
        id: c.id,
        totalPrice: c.totalPrice,
        quantity: Number(c.quantity),
        partNumber: c.partNumber,
      };
    });

    let invoiceDate = "";
    if (e.invoiceDate !== null && e.invoiceDate !== undefined) {
      invoiceDate = e.invoiceDate;
    }

    let billingDate = "";
    if (e.billingDate !== null && e.billingDate !== undefined) {
      billingDate = e.billingDat;
    }

    let payDate = "";
    if (e.payDate !== null && e.payDate !== undefined) {
      payDate = e.payDate;
    }

    const profit = isNotValid(e.cost - e.expenses) ? 0 : e.cost - e.expenses;
    const commissions = isNotValid(profit) ? "" : profit * 0.03;
    const formattedProfit = isNotValid(profit) ? "" : profit;

    return {
      invoiceNumber: generaFolio(e.invoiceNumber, e.client),
      _id: e._id,
      concepts: concepts,
      title: e.title,
      users: e.users,
      work: e.work,
      line: e.line,
      cost: isNotValid(e.cost) ? "" : e.cost,
      costPlusIva: isNotValid(e.cost * 1.08)
        ? ""
        : currencyFormat(e.cost * 1.08),
      // partNumber: e.partNumber ? e.partNumber : "# de parte",
      IVA: isNotValid(e.cost * 0.08) ? "" : e.cost * 0.08,
      partNumber: partNumber ? partNumber : "# de parte",
      client: e.client,
      clientId: e.clientId,
      salesman: e.salesman,
      status: e.status,
      comissionStatus: e.comissionStatus,
      OC: e.OC,
      factura: e.factura,
      expenses: isNotValid(e.expenses) ? "" : e.expenses,
      profit: formattedProfit,
      comissions: commissions,
      receptionNumber: e.receptionNumber,
      remissionNumber: e.remissionNumber,
      invoiceDate: invoiceDate,
      email: e.email,
      rawData: e,
      billingDate: billingDate,
      payDate: payDate,
    };
  });
};

export const formatInvoicesToDb = (invoiceValues, tableData) => {
  let comissionPaymmentDate ="";
  if (invoiceValues.comissionStatus === "PAGADO") {
    comissionPaymmentDate = new Date();
  }
  let billingDate = "";
  if (invoiceValues.billingDate !== null && invoiceValues.billingDate !== undefined) {
    billingDate = invoiceValues.billingDate;
  }
  let paymmentDate = "";
  let paymmentConfirm = false;
  if (invoiceValues.paymmentDate !== null && invoiceValues.paymmentDate !== undefined) {
    paymmentDate = invoiceValues.paymmentDate;
    paymmentConfirm = true;
  }

  console.log(`paymmentDate ${paymmentDate}`);
  console.log(`billingDate ${billingDate}`);
  console.log(`comissionPaymmentDate ${comissionPaymmentDate}`);
  return {
    concepts: tableData,
    client: invoiceValues.client.toUpperCase(),
    clientId: invoiceValues.clientId,
    cost: Number(invoiceValues.cost),
    line: invoiceValues.line.toUpperCase(),
    salesman: invoiceValues.salesman.toUpperCase(),
    title: invoiceValues.title.toUpperCase(),
    user: invoiceValues.user.toUpperCase(),
    work: invoiceValues.work.toUpperCase(),
    status: invoiceValues.status.toUpperCase(),
    comissionStatus: invoiceValues.comissionStatus.toUpperCase(),
    OC: invoiceValues.OC.toUpperCase(),
    email: invoiceValues.email,
    receptionNumber: invoiceValues.receptionNumber.toUpperCase(),
    remissionNumber: invoiceValues.remissionNumber.toUpperCase(),
    deliveryTime: invoiceValues.deliveryTime.toUpperCase(),
    factura: invoiceValues.factura.toUpperCase(),
    profit: isNotValid(invoiceValues.profit) ? 0 : Number(invoiceValues.profit),
    comissions: isNotValid(invoiceValues.comissions)
      ? 0
      : Number(invoiceValues.comissions),

    // comissionsState: invoiceValues.comissionsState.toUpperCase(),
    expenses: isNotValid(invoiceValues.expenses)
      ? 0
      : Number(invoiceValues.expenses),
      billingDate: billingDate,
      comissionPaymmentDate: comissionPaymmentDate,
      paymmentDate: paymmentDate,
      paymmentConfirm:paymmentConfirm
  };
};

export const formatInvoicesToPrint = (previousValues, newValues) => {
  const newInvoiceValues = {
    ...previousValues,
    ...newValues,
    invoiceNumber: formatInvoiceTitle(newValues, false, true),
    //just to emulate the way it was structured on the general datagrid list
    rawData: {
      ...previousValues,
      ...newValues,
    },
  };
  return newInvoiceValues;
};

export const sellersChart = (invoices) => {
  const colorsBars = {
    canceled: "#DA8530",
    inProcess: "#4C5DD9",
    paid: "#A8A4A0",
  };
  const chartResult = [
    {
      x: [],
      y: [],
      name: "En espera",
      type: "bar",
      marker: {
        color: colorsBars.canceled,
      },
    },
    {
      x: [],
      y: [],
      name: "En Proceso",
      type: "bar",
      marker: {
        color: colorsBars.inProcess,
      },
    },
    {
      x: [],
      y: [],
      name: "Entregada",
      type: "bar",
      marker: {
        color: colorsBars.paid,
      },
    },
  ];

  const sellers = invoices.map((invoice, index) => {
    const check = (seller) => seller === invoice.salesman;
    // console.log(invoice.rawData.status + " " + invoice.rawData.salesman )

    if (invoice.rawData.status === "EN ESPERA") {
      const count = 1;
      if (!chartResult[0].x.some(check)) {
        chartResult[0].x.push(invoice.salesman);
        chartResult[0].y.push(count);
      } else {
        chartResult[0].y[chartResult[0].x.indexOf(invoice.salesman)] += count;
      }
    }

    if (invoice.rawData.status === "EN PROCESO") {
      const count = 1;
      if (!chartResult[1].x.some(check)) {
        chartResult[1].x.push(invoice.salesman);
        chartResult[1].y.push(count);
      } else {
        chartResult[1].y[chartResult[1].x.indexOf(invoice.salesman)] += count;
      }
    }

    if (invoice.rawData.status === "ENTREGADO") {
      const count = 1;
      if (!chartResult[2].x.some(check)) {
        chartResult[2].x.push(invoice.salesman);
        chartResult[2].y.push(count);
      } else {
        chartResult[2].y[chartResult[2].x.indexOf(invoice.salesman)] += count;
      }
    }
  });
  // console.log(chartResult)
  return chartResult;
};

export const sellersChartMoney= (invoices) => {
  const colorsBars = {
    canceled: "#DA8530",
    inProcess: "#4C5DD9",
    paid: "#A8A4A0",
  };
  const chartResult = [
    {
      x: [],
      y: [],
      name: "En espera",
      type: "bar",
      marker: {
        color: colorsBars.canceled,
      },
    },
    {
      x: [],
      y: [],
      name: "En Proceso",
      type: "bar",
      marker: {
        color: colorsBars.inProcess,
      },
    },
    {
      x: [],
      y: [],
      name: "Entregada",
      type: "bar",
      marker: {
        color: colorsBars.paid,
      },
    },
  ];

 
  let aWaitCost = 0;
  let aProcessCost = 0;
  let aPaidCost = 0;
  const sellers = invoices.map((invoice, index) => {
    const check = (seller) => seller === invoice.salesman;
    // console.log(invoice.rawData.status + " " + invoice.rawData.salesman )
    
    if (invoice.rawData.status === "EN ESPERA") {
      
      if (!chartResult[0].x.some(check)) {
        chartResult[0].x.push(invoice.salesman);
        aWaitCost = invoice.rawData.cost + aWaitCost
        chartResult[0].y.push(aWaitCost);   
      } else {
        chartResult[0].y[chartResult[0].x.indexOf(invoice.salesman)] += aWaitCost;
      }
      console.log(aWaitCost)
     }

    if (invoice.rawData.status === "EN PROCESO") {
      if (!chartResult[1].x.some(check)) {
        chartResult[1].x.push(invoice.salesman);
        aProcessCost = invoice.rawData.cost + aProcessCost
        chartResult[1].y.push(aProcessCost);
      } else {
        chartResult[1].y[chartResult[1].x.indexOf(invoice.salesman)] += aProcessCost;
      }
    }

    if (invoice.rawData.status === "ENTREGADO") {
      if (!chartResult[2].x.some(check)) {
        chartResult[2].x.push(invoice.salesman);
        aPaidCost = invoice.rawData.cost + aPaidCost
        chartResult[2].y.push(aPaidCost);
      } else {
        chartResult[2].y[chartResult[2].x.indexOf(invoice.salesman)] += aPaidCost;
      }
    }
  });
  // console.log(chartResult)
  return chartResult;
};

export const timeChart = (invoices) => {
  console.log("invoices received", invoices);
  const formattedInvoices = invoices
    .filter((invoice) => invoice.status === "ENTREGADO")
    .map((invoice) => {
      const newInvoice = {
        invoiceDate: invoice.invoiceDate,
        cost: invoice.cost,
      };
      return newInvoice;
    });

  console.log("formatted received", formattedInvoices);
  const dates = formattedInvoices.map((invoice) => invoice.invoiceDate);
  const quotedCost = formattedInvoices.map((invoice) => invoice.cost);

  return { dates, quotedCost };
};

export const pieChart = (invoices) => {
  const formattedInvoices = invoices
    // .filter((invoice) => invoice.status === "ENTREGADO")
    .map((invoice) => {
      const newInvoice = {
        invoiceDate: invoice.invoiceDate,
        cost: invoice.cost,
        status: invoice.status,
      };
      return newInvoice;
    });
  const values = formattedInvoices.map((invoice) => invoice.cost);
  const labels = STATUS;
  return { values, labels };
};
