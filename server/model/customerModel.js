const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerSalutation: {
    type: String,
  },
  customerName: {
    type: String,
  },
  customeraddress: {
    type: String,
  },
});

const customerInvoice = mongoose.model("newCustomer", customerSchema);

module.exports = customerInvoice;
