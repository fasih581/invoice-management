const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemCodeInput: {
    type: String,
  },
  itemInput: {
    type: String,
  },
  packingUnit: {
    type: String,
  },
  unitProduct: {
    type: String,
  },
  unitPriceInput: {
    type: String,
  },
});

const productInvoice = mongoose.model("newProduct", productSchema);

module.exports = productInvoice;