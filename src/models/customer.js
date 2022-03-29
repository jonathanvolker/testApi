const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rfc: {
    type: String,
    // required: true,
    unique: true,
  },
  razonSocial: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  mainAddress: {
    type: String,
    ref: "Address",
  },
  telephone: {
    type: String,
    required: true,
  },
  colony: {
    type: String,
    ref: "Colony",
  },
  city: {
    type: String,
    ref: "City",
  },
  country: {
    type: String,
    ref: "Country",
  },
  invoiceCounter:{
    type: Number,
    default:0
  },
  postalCode: {
    type: String,
    ref: "Cp",
  },
  conditions: {
    type: String,
    ref: "Conditions",
  },
  currency: {
    type: String,
    ref: "Currency",
  },
  lba: {
    type: String,
    ref: "Lba",
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});


module.exports = mongoose.model("Customer", customerSchema);
