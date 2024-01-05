const mongoose = require("mongoose");

const Items = mongoose.model(
  "Items",
  new mongoose.Schema({
    item: {
      type: String,
    },
    qty: {
      type: String,
    },
    unit: {
      type: String,
    },
    unitPrice: {
      type: String,
    },
    totalBD: {
      type: String,
    },
  })
);

const invoiceSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  customerName: {
    type: String,
  },
  billNumber: {
    type: String,
  },
  poNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  grandTotal: {
    type: String,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
});

const InvoiceNew = mongoose.model("addInvoice", invoiceSchema);

module.exports = InvoiceNew;
module.exports = { Items, InvoiceNew };

