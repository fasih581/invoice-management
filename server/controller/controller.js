// const InvoiceNew = require("../model/model ");
const {Items, InvoiceNew} = require("../model/model ");
// const InvoiceItems = require("../model/item");
const asyncHandler = require("express-async-handler");
const path = require("path");

// CREATE: Add a new invoice
exports.createInvoice = asyncHandler(async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      "date",
      "customerName",
      "billNumber",
      "poNumber",
      "address",
      "grandTotal",
      "invoiceitem",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: true,
          message: `Error: Missing '${field}' field`,
        });
      }
    }

    // Validate item fields in each invoiceitem
    const itemFields = ["qty", "unit", "unitPrice", "item", "totalBD"];
    for (const item of req.body.invoiceitem) {
      for (const field of itemFields) {
        if (!item[field]) {
          return res.status(400).json({
            error: true,
            message: `Error: Missing 'invoiceitem.${field}' field`,
          });
        }
      }
    }

    // Create new items
    const createdItems = await Items.create(req.body.invoiceitem);

    // Create new invoice with references to the created items
    const invoice = new InvoiceNew({
      date: req.body.date,
      customerName: req.body.customerName,
      billNumber: req.body.billNumber,
      poNumber: req.body.poNumber,
      address: req.body.address,
      grandTotal: req.body.grandTotal,
      items: createdItems, // Pass the array of item values directly
    });

   // Save invoice to the database
   const savedInvoice = await invoice.save();

   // Populate the items field in the savedInvoice with the actual item values
   const populatedInvoice = await InvoiceNew.populate(savedInvoice, { path: 'items', model: 'Items' });

    console.log("Invoice created successfully");

    res.status(201).json({
      error: false,
      message: "Invoice created successfully",
      data: populatedInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);

    res.status(500).json({
      error: true,
      message: "Internal server error creating invoice",
      details: error.message,
    });
  }
});
// CREATE: Add a new invoice End

// READ: Get all invoice
exports.findInvoice = asyncHandler(async (req, res) => {
  try {
    const invoices = await InvoiceNew.find().populate("items");
    console.log(invoices);
    res.status(200).json({
      error: false,
      message: "invoice retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    console.error("Response sent:", res._headers);
    console.error("Response body:", res._body);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});
// READ: Get all invoice End

// READ: Get a single Invoice by ID
exports.findInvoiceId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Received product GET ID:", id);

  try {
    const data = await InvoiceNew.findById(id).populate("items");

    if (!data) {
      res.status(404).json({ message: "Not Found Invoice With " + id });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error finding invoice by ID:", error);
    res.status(500).json({
      error: true,
      message: "Error Retrieving invoice With id " + id,
      details: error.message,
    });
  }
});
// READ: Get a single Invoice by ID End

// UPDATE: Update a customer by ID
exports.updateInovoice = asyncHandler(async (req, res) => {
  try {
    // Create documents for each item and get their ObjectId references
    const itemDocuments = await Promise.all(req.body.items.map(async (itemData) => {
      const newItem = new Items(itemData);
      await newItem.save();
      return newItem._id;
    }));

    // Update the InvoiceNew model with the ObjectId references of the items
    const invoiceData = {
      date: req.body.date,
      customerName: req.body.customerName,
      billNumber: req.body.billNumber,
      poNumber: req.body.poNumber,
      address: req.body.address,
      grandTotal: req.body.grandTotal,
      items: itemDocuments,
    };

    const invoice = await InvoiceNew.findByIdAndUpdate(
      req.params.id,
      invoiceData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("items");

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    res.status(200).json({
      error: false,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error updating Invoice:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error updating Invoice",
      details: error.stack,
    });
  }
});
// UPDATE: Update a customer by ID End

// DELET: Update a customer by ID
exports.deletInovoice = asyncHandler(async (req, res) => {
  const Invoice = await InvoiceNew.findByIdAndDelete(req.params.id);

  if (!Invoice) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }

  res.status(200).json({
    error: false,
    message: "Invoice deleted successfully",
    data: Invoice,
  });
});
// DELET: Update a customer by ID

// READ: Get all Items
exports.findItem = asyncHandler(async (req, res) => {
  try {
    const invoices = await InvoiceItems.find();
    res.status(200).json({
      error: false,
      message: "Items retrieved successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching Items:", error);
    console.error("Response sent:", res._headers);
    console.error("Response body:", res._body);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});
// READ: Get all Items End

// READ: Get a single Item by ID
exports.findItemId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Received Item GET ID:", id);

  try {
    const data = await InvoiceItems.findById(id);

    if (!data) {
      res.status(404).json({ message: "Not Found Item With " + id });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error finding Item by ID:", error);
    res.status(500).json({
      error: true,
      message: "Error Retrieving Item With id " + id,
      details: error.message,
    });
  }
});
// READ: Get a single Item by ID End




