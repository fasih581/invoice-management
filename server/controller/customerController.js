const customerInvoice = require("../model/customerModel");
const asyncHandler = require("express-async-handler");
const path = require("path");

// CREATE: Add a new customer
exports.createcustomer = asyncHandler(async (req, res) => {
  try {
    // Check for required fields
    const requiredFields = [
      "customerSalutation",
      "customerName",
      "customeraddress",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res
        .status(400)
        .json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      return;
    }

    const customer = new customerInvoice({
      customerSalutation: req.body.customerSalutation,
      customerName: req.body.customerName,
      customeraddress: req.body.customeraddress,
    });

    // Save Customer to the database
    const savedCustomer = await customer.save();

    console.log("Customer created successfully");

    res.status(201).json({
      error: false,
      message: "Customer created successfully",
      data: savedCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error creating customer",
      details: error.message,
    });
  }
});

// READ: Get all customers
exports.getAllcustomer = asyncHandler(async (req, res) => {
  try {
    const customers = await customerInvoice.find();
    res.status(200).json({
      error: false,
      message: "Customers retrieved successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    console.error("Response sent:", res._headers); // Log the headers
    console.error("Response body:", res._body); // Log the response body
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// READ: Get a single customer by ID
exports.getIdcustomer = asyncHandler(async (req, res) => {
  const customer = await customerInvoice.findById(req.params.id);

  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
    return;
  }

  res.status(200).json({
    error: false,
    message: "Customer retrieved successfully",
    data: customer,
  });
});

// UPDATE: Update a customer by ID
exports.upadtecustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await customerInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    res.status(200).json({
      error: false,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error updating customer",
      details: error.message,
    });
  }
});

// DELETE: Delete a customer by ID
exports.deletecustomer = asyncHandler(async (req, res) => {
  const customer = await customerInvoice.findByIdAndDelete(req.params.id);

  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
    return;
  }

  res.status(200).json({
    error: false,
    message: "Customer deleted successfully",
    data: customer,
  });
});
