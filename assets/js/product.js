// GET: Get The Product
readProduct();
async function readProduct() {
  try {
    let temp = "";
    const response = await fetch("http://localhost:8080/invoice/product")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.data.length; i++) {
          const id = data.data[i]._id;
          const product = data.data[i];

          temp += `<tr class="pIteams">
          <th scope="row">#${i + 1}</th>
          <td>${product.itemCodeInput}</td>
          <td>${product.itemInput}</td>
          <td>${product.packingUnit}</td>
          <td>${product.unitProduct}</td>
          <td>${product.unitPriceInput}</td>
          <td class="pEdit">
              <button class="btn btn-danger" onclick="editItem('${id}')"><span class="material-symbols-outlined">Edit</span></button>
          </td>
          <td class="pdelet">
              <button class="btn btn-danger" onclick="deleteProduct('${id}')"><span class="material-symbols-outlined">delete</span></button>
          </td>
      </tr>`;
        }
        document.getElementById("productTbody").innerHTML = temp;
      });
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}
// GET: Get The Product End

// POST: POST The Product
const submitProduct = document.getElementById("newProduct");
submitProduct.addEventListener("submit", function (e) {
  e.preventDefault();

  const itemRows = document.querySelectorAll(".items");

  if (itemRows.length === 0) {
    console.error("No items found with class 'items'");
    return;
  }

  let isValid = true;

  console.log("Number of itemRows before validation:", itemRows.length);

  for (let i = 0; i < itemRows.length; i++) {
    const row = itemRows[i];
    isValid = validateNewRow(row) && isValid;
  }

  console.log("Number of itemRows after validation:", itemRows.length);

  if (!isValid) {
    return;
  }

  const itemsData = [];

  // Inside the loop where you push values into the itemsData array
  for (let i = 0; i < itemRows.length; i++) {
    const row = itemRows[i];
    const itemCodeInput = row.querySelector(".itemCodeInput")?.value;
    const itemInput = row.querySelector(".itemInput")?.value;
    const packingUnit = row.querySelector(".packingUnit")?.value;
    const unitProduct = row.querySelector(".unitProduct")?.value;
    const unitPriceInput = row.querySelector(".unitPriceInput")?.value;

    // Check if any of the values is undefined, and skip adding the row if so
    if (
      itemCodeInput === undefined ||
      itemInput === undefined ||
      packingUnit === undefined ||
      unitProduct === undefined ||
      unitPriceInput === undefined
    ) {
      console.error("Invalid values in row:", row);
      continue; // Skip this row
    }

    itemsData.push({
      itemCodeInput,
      itemInput,
      packingUnit,
      unitProduct,
      unitPriceInput,
    });
  }

  const postProduct = {
    items: itemsData,
  };

  console.log(postProduct);

  fetch("http://localhost:8080/invoice/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postProduct),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      createProductOff();
      readProduct();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
// POST: POST The Product End

// UPDATE: UPDATE The Product
function editItem(id) {
  console.log(id);

  editProductOn();

  fetch(`http://localhost:8080/invoice/product/${id}`, {
    method: "get",
  })
    .then((res) => {
      console.log(res.data);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })

    .then((item) => {
      console.log("item received:", item);
      document.getElementById("editItemCode").value = item.itemCodeInput;
      document.getElementById("editItemName").value = item.itemInput;
      document.getElementById("editPackingUnit").value = item.packingUnit;
      document.getElementById("editUnitSelect").value = item.unitProduct;
      document.getElementById("editUnitPrice").value = item.unitPriceInput;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  const productEdit = document.getElementById("editProduct");
  productEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    let formup = {
      itemCodeInput: document.getElementById("editItemCode").value,
      itemInput: document.getElementById("editItemName").value,
      packingUnit: document.getElementById("editPackingUnit").value,
      unitProduct: document.getElementById("editUnitSelect").value,
      unitPriceInput: document.getElementById("editUnitPrice").value,
    };

    fetch(`http://localhost:8080/invoice/product/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formup),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedItem) => {
        console.log(updatedItem);
        editProductOff();
        readProduct();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}
// UPDATE: UPDATE The Product End

// DELET: DELET The Product
function deleteProduct(id) {
  console.log(id);

  deleteProductOn();

  var modalDelete = document.getElementById("DeleteBtn");
  modalDelete.addEventListener("click", () => {
    fetch(`http://localhost:8080/invoice/product/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        deleteProductOff();
        readProduct();
      }
    });
  });
}
// DELET: DELET The Product End

// Add new line
document.getElementById("addRowButton").addEventListener("click", addRow);
function addRow() {
  // Get the table body element in which you want to add row
  let tableBody = document.getElementById("tableBody");

  // Get the current row count
  let rowCount = tableBody.getElementsByTagName("tr").length + 1;

  // Create row element
  let newRow = document.createElement("tr");
  newRow.classList.add("items"); // Add the correct class to the row

  // Create cells
  let cell1 = document.createElement("th");
  cell1.setAttribute("scope", "row");
  cell1.textContent = "#" + rowCount;

  // itemCodeInput
  let cell2 = document.createElement("td");
  let itemCodeInput = document.createElement("input");
  itemCodeInput.setAttribute("type", "text");
  itemCodeInput.setAttribute("class", "form-control itemCodeInput");
  itemCodeInput.setAttribute("id", "itemCodeInput");
  itemCodeInput.setAttribute("placeholder", "Enter the item code");
  cell2.appendChild(itemCodeInput);
  // itemCodeInput;

  // Create a new span element for error messages
  let errorItemCodeInput = document.createElement("span");
  errorItemCodeInput.setAttribute("class", "error-message errorItemCodeInput");
  errorItemCodeInput.setAttribute("style", "display:none");
  errorItemCodeInput.setAttribute("id", "errorItemCodeInput");
  errorItemCodeInput.textContent = "Plesae Enter Item Code";
  cell2.appendChild(errorItemCodeInput);
  // ==============

  // itemInput
  let cell3 = document.createElement("td");
  let itemInput = document.createElement("input");
  itemInput.setAttribute("type", "text");
  itemInput.setAttribute("class", "form-control itemInput");
  itemInput.setAttribute("id", "itemInput");
  itemInput.setAttribute("placeholder", "Enter The Item");
  cell3.appendChild(itemInput);

  let erroritemInput = document.createElement("span");
  erroritemInput.setAttribute("class", "error-message erroritemInput");
  erroritemInput.setAttribute("style", "display:none");
  erroritemInput.setAttribute("id", "erroritemInput");
  erroritemInput.textContent = "Please enter the Item Name";
  cell3.appendChild(erroritemInput);
  // ==============

  // packingUnit
  let cell4 = document.createElement("td");
  let pkUnitInput = document.createElement("input");
  pkUnitInput.setAttribute("type", "text");
  pkUnitInput.setAttribute("class", "form-control packingUnit");
  pkUnitInput.setAttribute("id", "packingUnit");
  pkUnitInput.setAttribute("placeholder", "Enter The Packing Unit");
  cell4.appendChild(pkUnitInput);

  let errorpackingUnit = document.createElement("span");
  errorpackingUnit.setAttribute("class", "error-message errorpackingUnit");
  errorpackingUnit.setAttribute("id", "errorpackingUnit");
  errorpackingUnit.setAttribute("style", "display:none");
  errorpackingUnit.textContent = "Please enter the packing unit";
  cell4.appendChild(errorpackingUnit);
  // ==============

  // unitProduct
  let cell5 = document.createElement("td");
  let itemUnitSelect = document.createElement("select");
  itemUnitSelect.setAttribute("class", "form-select unitProduct");
  itemUnitSelect.setAttribute("id", "itemUnitSelect");
  itemUnitSelect.setAttribute("aria-label", "Default select example");

  // Create and append the default option
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "true");
  defaultOption.innerHTML = "Select Item Unit";
  itemUnitSelect.appendChild(defaultOption);

  // Define an array of values for the options
  const optionValues = ["BOX", "EA", "CT", "PCE", "CAR"]; 

  // Create a loop to add options
  for (let i = 0; i < optionValues.length; i++) {
    let option = document.createElement("option");
    option.value = optionValues[i];
    option.innerHTML = optionValues[i];
    itemUnitSelect.appendChild(option);
  }
  cell5.appendChild(itemUnitSelect);

  let errorunitProduct = document.createElement("span");
  errorunitProduct.setAttribute("id", "errorunitProduct");
  errorunitProduct.setAttribute("class", "error-message errorunitProduct");
  errorunitProduct.setAttribute("style", "display:none");
  errorunitProduct.textContent = "Please select the item unit";
  cell5.appendChild(errorunitProduct);
  // ==============

  // unitPriceInput
  let cell6 = document.createElement("td");
  let unitPriceInput = document.createElement("input");
  unitPriceInput.setAttribute("type", "number");
  unitPriceInput.setAttribute("min", "0.00");
  unitPriceInput.setAttribute("step", "0.001");
  unitPriceInput.setAttribute("class", "form-control unitPriceInput");
  unitPriceInput.setAttribute("id", "unitPriceInput");
  unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
  cell6.appendChild(unitPriceInput);

  let errorunitPriceInput = document.createElement("span");
  errorunitPriceInput.setAttribute("id", "errorunitPriceInput");
  errorunitPriceInput.setAttribute(
    "class",
    "error-message errorunitPriceInput"
  );
  errorunitPriceInput.setAttribute("style", "display:none");
  errorunitPriceInput.textContent =
    "Please enter a valid unit price greater than zero";
  cell6.appendChild(errorunitPriceInput);
  // ==============

  let cell7 = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerHTML =
    '<span class="material-symbols-outlined">delete</span>';
  deleteButton.addEventListener("click", function () {
    // Remove the entire row when the delete button is clicked
    tableBody.removeChild(newRow);
    updateRowNumbers(); // Update row numbers after deletion
  });
  cell7.appendChild(deleteButton);

  // Append cells to row
  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
  newRow.appendChild(cell4);
  newRow.appendChild(cell5);
  newRow.appendChild(cell6);
  newRow.appendChild(cell7);

  // Append row to table body
  tableBody.appendChild(newRow);

  // Update row numbers after adding a new row
  updateRowNumbers();
}

// Function to update row numbers
function updateRowNumbers() {
  let tableBody = document.getElementById("tableBody");
  let rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let cells = row.getElementsByTagName("th");
    let cell = cells[0]; // Assuming the row number is in the first cell

    // Update the row number
    cell.textContent = "#" + (i + 1);
  }
}

// Function to perform frontend validation for a new row
function validateNewRow(row) {
  const itemCodeInput = row.querySelector(".itemCodeInput");
  const itemInput = row.querySelector(".itemInput");
  const packingUnit = row.querySelector(".packingUnit");
  const itemUnitSelect = row.querySelector(".unitProduct");
  const unitPriceInput = row.querySelector(".unitPriceInput");

  let isValid = true; // Flag to track overall validation status

  // Validate itemCodeInput not empty
  const errorItemCodeInput = row.querySelector(".errorItemCodeInput");
  if (itemCodeInput?.value.trim() === "") {
    if (errorItemCodeInput) {
      errorItemCodeInput.style.display = "block";
    }
    isValid = false;
  } else {
    if (errorItemCodeInput) {
      errorItemCodeInput.style.display = "none";
    }
  }

  // Validate itemInput not empty
  const erroritemInput = row.querySelector(".erroritemInput");
  if (itemInput?.value.trim() === "") {
    if (erroritemInput) {
      erroritemInput.style.display = "block";
    }
    isValid = false;
  } else {
    if (erroritemInput) {
      erroritemInput.style.display = "none";
    }
  }

  // Validate packingUnit not empty
  const errorpackingUnit = row.querySelector(".errorpackingUnit");
  if (packingUnit?.value.trim() === "") {
    if (errorpackingUnit) {
      errorpackingUnit.style.display = "block";
    }
    isValid = false;
  } else {
    if (errorpackingUnit) {
      errorpackingUnit.style.display = "none";
    }
  }

  // Validate unitProduct not the default option
  if (itemUnitSelect?.value.trim() === "Select Item Unit") {
    const errorElement = row.querySelector(".errorunitProduct");
    if (errorElement) {
      errorElement.style.display = "block";
    }
    isValid = false;
  } else {
    const errorElement = row.querySelector(".errorunitProduct");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  // Validate unitPriceInput not empty and greater than zero
  if (
    unitPriceInput?.value.trim() === "" ||
    parseFloat(unitPriceInput?.value) <= 0
  ) {
    const errorElement = row.querySelector(".errorunitPriceInput");
    if (errorElement) {
      errorElement.style.display = "block";
    }
    isValid = false;
  } else {
    const errorElement = row.querySelector(".errorunitPriceInput");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  return isValid;
}

// Add new line end

// Modal overlay
function overlayOn() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "block";
}
function overlayOff() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "none";
}
// Modal overlay End

// create invoice modal
function createProductOn() {
  const createProduct = document.getElementById("staticBackdrop");
  createProduct.style.display = "block";
  overlayOn();
}

function createProductOff() {
  const createProduct = document.getElementById("staticBackdrop");
  createProduct.style.display = "none";
  overlayOff();
}
// create invoice modal end

// Edit invoice modal
function editProductOn() {
  const editProduct = document.getElementById("editstaticBackdrop");
  editProduct.style.display = "block";
  overlayOn();
}

function editProductOff() {
  const editProduct = document.getElementById("editstaticBackdrop");
  editProduct.style.display = "none";
  overlayOff();
}
// Edit invoice modal end

// delete invoice modal
function deleteProductOn() {
  const deleteProduct = document.getElementById("deletestaticBackdrop");
  deleteProduct.style.display = "block";
  overlayOn();
}

function deleteProductOff() {
  const deleteProduct = document.getElementById("deletestaticBackdrop");
  deleteProduct.style.display = "none";
  overlayOff();
}
// Delete invoice modal end


function searchProduct() {
  console.log("Search function called");
  let searchInput = document.getElementById("search_input");

  if (searchInput) {
    let searchKey = searchInput.value;
    console.log("Search key:", searchKey);

    searchKey = searchKey?.toLowerCase();
    
    if (searchKey) {
      fetch(`http://localhost:8080/invoice/product/search/${searchKey}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          renderProducts(data.Product);
        })
        .catch((error) => console.error("Error:", error));
    }
  } else {
    console.error("Search input element not found");
  }
}
