const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  concepts: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    ref: "title",
  },
  user: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    ref: "work",
  },
  line: {
    type: String,
    ref: "line",
  },
  cost: {
    type: Number,
    ref: "cost",
  },
  client: {
    type: String,
    ref: "client",
    required: true,
  },
  salesman: {
    type: String,
    ref: "salesman",
  },
  status: {
    type: String,
    ref: "status",
  },
  invoiceDate: {
    type: Date,
  },
  pdfDate: {
    type: Date,
  },
  OC: {
    type: String,
  },
  factura: {
    type: String,
  },
  profit: {
    type: Number,
  },
  comissions: {
    type: Number,
  },
  email:{
    type: String,
  },
  comissionStatus: {
    type: String,
  },
  receptionNumber: { type: String },
  remissionNumber: { type: String },
  deliveryTime: { type: String },
  expenses: {
    type: Number,
    default: 0,
  },
  clientId: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: Number,
    default: 0,
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
