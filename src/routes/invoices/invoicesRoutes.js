const express = require("express");
const Customer = require("../../models/customer");
const Invoice = require("../../models/invoice");
const invoiceValidationSchema = require("../../validations/invoiceSchema");
const {
  invoicePutBodyFormatter,
  invoicePostBodyFormatter,
} = require("../../utils/formatters");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const res = require("express/lib/response");
const router = express.Router();

const saveInvoice = async (res, data) => {
  console.log("saving data ", data);
  const clientId=data.clientId
  let date = new Date();
  let invoice = new Invoice({
    ...data,
    invoiceDate: date,
  });
  try {
    generatedInvoice = await invoice.save();
  } catch (e) {
    console.log("error saving");
    console.log(e.message);
    console.log(e.MongoServerError);
    return res.status(400).json({
      ok: false,
      err: e.message,
    });
  }

  const invoiceBD = await invoice.save();

  let id = invoiceBD._id;
  const customer = await Customer.findById(clientId);
  if (customer) {
    // console.log(customer)
    let getInvoiceCounter = customer.invoiceCounter;
    try {
      await Customer.findOneAndUpdate(
        { _id: clientId },
        {
          $set: {
            invoiceCounter: getInvoiceCounter + 1,
          },
        }
      );

      await Invoice.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            invoiceNumber: getInvoiceCounter + 1,
          },
        }
      );
    } catch (e) {
      console.log(error);
    }
  } else {
    console.log("fail edit counters");
  }

  const updatedInvoice = await Invoice.findById(id);
  let updatedInvoiceDoc = updatedInvoice.toObject();
  delete updatedInvoiceDoc.__v;
  // console.log("====updated Invoice");
  // console.log(updatedInvoiceDoc);
  res.json({
    ok: true,
    msg: "OK",
    invoice: updatedInvoiceDoc,
  });
};

router.put("/invoice", (req, res) => {
  const receivedData = invoicePostBodyFormatter(req.body);
  console.log("received Data ", receivedData);
  try {
    Joi.validate(receivedData, invoiceValidationSchema, (err, value) => {
      if (err) {
        console.log("there was an error with the validation");
        console.log(err.details[0].message);
        res.status(422).json({
          status: "error",
          message: "Invalid request data",
          data: receivedData,
        });
      } else {
        saveInvoice(res, receivedData);
      }
    });
  } catch (error) {
    console.log(`catching error ${error}`);
    res.json({ error });
  }
});

router.post("/invoice/:id", async (req, res) => {
  console.log("editando");
  const id = req.params.id;
  const receivedData = invoicePutBodyFormatter(req.body);
  //   console.log("received data: ", receivedData);
  try {
    await Invoice.updateOne(
      { _id: id },
      {
        $set: receivedData,
      }
    );

    const updatedInvoice = await Invoice.findById(id);
    let updatedInvoiceDoc = updatedInvoice.toObject();
    delete updatedInvoiceDoc.__v;
    // console.log("====updated Invoice");
    // console.log(updatedInvoiceDoc);
    res.json({
      ok: true,
      msg: "OK",
      invoice: updatedInvoiceDoc,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "Fail to modify invoice",
      error,
    });
  }
});

router.delete("/invoice/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    Invoice.updateOne(
      { _id: id },
      {
        $set: {
          delete: true,
        },
      },
      function (error, info) {
        if (error) {
          res.json({
            ok: false,
            msg: "Fail to delete invoice",
            error,
          });
        } else {
          res.json({
            ok: true,
            info: info,
          });
        }
      }
    );
  } catch (error) {
    res.json({ error });
  }
});

router.get("/invoice", async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    if (invoices.length > 0) {
      const filteredInvoices = invoices.filter((i) => i.delete === false);

      res.json({ filteredInvoices });
    } else {
      res.json("There are no Invoices");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/invoice/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.json({ invoice });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/invoice/:id", async (req, res) => {
  const { concepts, title, user, work, line, cost, client, salesman, status } =
    req.body;
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          user,
          work,
          line,
          cost,
          client,
          salesman,
          status,
        },
      },
      { new: true }
    );
    res.json({ invoice });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
