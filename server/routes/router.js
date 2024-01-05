const express = require('express');
const route = express.Router();

const services = require("../services/render")
const controller = require("../controller/controller");
const product = require("../controller/productController");
const customer = require("../controller/customerController");

// @description root routes
// @method GET/ pages
route.get("/",  services.homeRoutes);
route.get("/product",  services.productRoutes);
route.get("/customer",  services.customerRoutes);

// Invoice API
route.get("/invoice/getInvoice",  controller.findInvoice);
route.get("/invoice/getInvoice/:id",  controller.findInvoiceId);
route.get("/invoice/getItem",  controller.findItem);
route.get("/invoice/getItem/:id",  controller.findItemId);
route.post("/invoice/newInvoice",  controller.createInvoice );
route.put("/invoice/editInvoice/:id",  controller.updateInovoice);
route.delete("/invoice/deleteInvoice/:id",  controller.deletInovoice);

// product search API
route.get("/invoice/product/search/:key", product.searchProduct);

// product API
route.get("/invoice/product",  product.getProduct );
route.get('/invoice/product/:id', product.getProductId); //GET Single Product Details
route.post("/invoice/product",  product.createProduct );
route.put("/invoice/product/:id",  product.updateProduct );
route.delete("/invoice/product/:id",  product.deleteProduct );


route.get("/invoice/customer",  customer.getAllcustomer );
route.get('/invoice/customer/:id', customer.getIdcustomer); //GET Single Product Details
route.post("/invoice/customer",  customer.createcustomer );
route.put("/invoice/customer/:id",  customer.upadtecustomer );
route.delete("/invoice/customer/:id",  customer.deletecustomer );

module.exports = route;