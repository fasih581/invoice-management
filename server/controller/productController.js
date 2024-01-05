const productInvoice = require("../model/productmodel");
const asyncHandler = require("express-async-handler");
const path = require("path");

// create and save new product
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ["items"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing ${field} field` });
      }
    }

    // Assuming items is an array of product items
    const items = req.body.items;

    // Validate each item in the array
    for (const item of items) {
      const itemRequiredFields = [
        "itemCodeInput",
        "itemInput",
        "packingUnit",
        "unitProduct",
        "unitPriceInput",
      ];

      for (const field of itemRequiredFields) {
        if (!item[field]) {
          return res
            .status(400)
            .json({ error: `Missing ${field} field in one or more items` });
        }
      }
    }

    // Create and save product items
    const savedProductItems = await productInvoice.insertMany(items);

    res.status(201).json({
      error: false,
      message: "Product created successfully",
      data: savedProductItems,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: true, // <-- Potential issue here
      message: "Internal server error find product",
      details: error.message,
    });
  }
});

// exports.getProduct = asyncHandler(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = 5; // Set your desired page size

//   try {
//     const totalCount = await productInvoice.countDocuments({});
//     const totalPages = Math.ceil(totalCount / pageSize);

//     const data = await productInvoice.find()
//       .skip((page - 1) * pageSize)
//       .limit(pageSize);

//     res.status(200).json({
//       data,
//       currentPage: page,
//       totalPages,
//     });
//   } catch (error) {
//     console.error("Error finding products:", error);
//     res.status(500).json({
//       error: true,
//       message: "Internal server error finding products",
//       details: error.message,
//     });
//   }
// });

// retrieve and return all product/retrieve and return a single product
// exports.getProduct = asyncHandler(async (req, res) => {
//   if (req.params.id) {
//     const id = req.params.id;
//     console.log("Received product GET ID:", id);
//     productInvoice
//       .findById(id)
//       .then((data) => {
//         if (!data) {
//           res.status(404).json({ "message": "Not Found Product With " + id });
//         } else {
//           res.status(200).json(data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error find product:", error);
//         res.status(500).json({
//           error: true,
//           message: "Error Retrieving Product With id " + id,
//           details: error.message,
//         });
//       });
//   } else {
//     productInvoice
//       .find()
//       .then((data) => {
//         res.status(200).json(data);
//       })
//       .catch((error) => {
//         console.error("Error find product:", error);
//         res.status(500).json({
//           error: true,
//           message: "Internal server error find product",
//           details: error.message,
//         });
//       });
//   }
// });

exports.getProduct = asyncHandler(async (req, res) => {
  try {
    const products = await productInvoice.find();
    res.status(200).json({
      error: false,
      message: "products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    console.error("Response body:", res._body); // Log the response body
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

exports.getProductId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Received product GET ID:", id);

  try {
    const data = await productInvoice.findById(id);
    
    if (!data) {
      res.status(404).json({ message: "Not Found Product With " + id });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error finding product by ID:", error);
    res.status(500).json({
      error: true,
      message: "Error Retrieving Product With id " + id,
      details: error.message,
    });
  }
});



// update a new idetified product by product id
exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received product ID:", id);
    const updatedProduct = await productInvoice.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: true,
        message: `Product with ID ${id} not found.`,
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error updating product",
    });
  }
});

// exports.findProduct = asyncHandler(async (req, res) => {});
exports.deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await productInvoice.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({
        error: true,
        message: `Cannot delete product with id ${id}. Maybe ID is wrong.`,
      });
    } else {
      res.status(200).json({
        error: false,
        message: "Product was deleted successfully!",
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      error: true,
      message: `Could not delete product with id ${id}`,
      details: error.message,
    });
  }
});

exports.searchProduct = asyncHandler(async (req, res) => {
  const Product = await productInvoice.find({
    $or: [  
      { itemCodeInput: { $regex: req.params.key, $options: "i" } },
      { itemInput: { $regex: req.params.key, $options: "i" } },
    ],
  });
  if (!Product) {
    res.status(404);
    throw new Error("Product not found");
  }
  console.log(Product);
  res.status(200).json({Product});
});

