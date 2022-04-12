const filterInvoices = (invoices) => {
  // console.log(`detected role ${role} for seller ${seller}`);
  let filterInvoices = invoices.filter(
    // (invoice) => invoice.status == "ENTREGADO" || invoice.status == "EN PROCESO"
    (invoice) => invoice
  );
  return filterInvoices;
};

const checkColorRowDirector = (rows) => {
  const colorRow = rows.map((invoice) => {
    //console.log(invoice.status)
    if (invoice.status !== "ENTREGADO") {
      if (invoice.status === "EN PROCESO") {
        return {
          ...invoice,
          //   className: "yellow",
        };
      } else {
        console.log(invoice.status);
        return {
          ...invoice,
          //   className: "red",
        };
      }
    }
    return {
      ...invoice,
      //   className: "green",
    };
  });
  return colorRow;
};

export const checkColorRows = (invoices, setTableData, role, checkHistory) => {
  if (!checkHistory) {
    const nonHistoryInvoices = invoices;
    // const nonHistoryInvoices = invoices.filter(
    //   (invoice) =>
    //     !(
    //       invoice.status == "EN ESPERA" &&
    //       (invoice.OC !== "" ||
    //         invoice.billingDate !== "" ||
    //         invoice.email !== "" ||
    //         (invoice.factura !== "" && invoice.comissionPaymmentDate !== "") ||
    //         invoice.comissionStatus != "" ||
    //         invoice.email != "" ||
    //         invoice.paymmentDate != "" ||
    //         invoice.receptionNumber != "" ||
    //         invoice.remissionNumber != "" ||
    //         invoice.title != "")
    //     )
    // );
    // console.log(nonHistoryInvoices);
    const rows = nonHistoryInvoices.map((invoice) => {
      //console.log(invoice.status)
      const classesNames = {
        green: "green",
        ligthGreen: "ligthGreen",
        ligthYellow: "ligthYellow",
        yellow: "yellow",
        ligthRed: "ligthRed",
        red: "red",
      };
      const values = Object.values(invoice);
      let count = 0;
      values.map((value) => {
        if (value === null || value === undefined || value === "" || value === 0) {
          return null;
        } else {
          return count++;
        }
      });

      if (
        invoice.status === "ENTREGADO" &&
        invoice.comissionStatus === "PAGADO"
      ) {
        return {
          ...invoice,
          className: classesNames.green,
        };
      } else {
        if (count > 24) {
          console.log("ligthGreen");
          return {
            ...invoice,
            className: classesNames.ligthGreen,
          };
        }
        if (count > 20) {
          console.log("ligtYellow");

          return {
            ...invoice,
            className: classesNames.ligthYellow,
          };
        }
        if (count > 16) {
          console.log("yellow");
          return {
            ...invoice,
            className: classesNames.yellow,
          };
        }
        if (count >= 17 || count <= 20) {
          return {
            ...invoice,
            className: classesNames.ligthRed,
          };
        }
      }
      return
    });

    if (role === "administrator") {
      const newData = filterInvoices(nonHistoryInvoices);
      const rows = checkColorRowDirector(newData);

      return setTableData(rows);
    } else {
      console.log(rows);
      return setTableData(rows);
    }
  } else {
    console.log("historyRows");
    const historyRows = invoices.filter(
      (invoice) =>
        invoice.status === "ENTREGADO" &&
        invoice.comissionStatus == "PAGADO" &&
        invoice.comissionPaymmentDate !== "" &&
        invoice.OC !== "" &&
        invoice.billingDate !== "" &&
        invoice.email !== "" &&
        invoice.factura !== "" &&
        invoice.comissionStatus != "" &&
        invoice.email !== "" &&
        invoice.paymmentDate !== "" &&
        invoice.receptionNumber !== "" &&
        invoice.remissionNumber !== "" &&
        invoice.title !== ""
    );
    console.log(historyRows);
    return setTableData(historyRows);
  }
};
