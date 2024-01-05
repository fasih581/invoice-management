// GET: Get the Invoice
document.addEventListener("DOMContentLoaded", function () {
  readInvoice();
});
// readInvoice();
async function readInvoice() {
  try {
    let temp = "";
    fetch("http://localhost:8080/invoice/getInvoice")
      .then((res) => {
        // console.log(response);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.data.length; i++) {
          const id = data.data[i]._id;
          const invoices = data.data[i];

          const itemCount = invoices.items.length;

          temp += `<tr>
        <th scope="row">#${i + 1}</th>
        <td>${invoices.customerName}</td>
        <td>${invoices.billNumber}</td>
        <td>${invoices.poNumber}</td>
        <td>${itemCount}</td>
        <td>${invoices.date}</td>
        <td>${invoices.grandTotal}</td>
        <td class="tdDropdown">
            <div class="dropdown" id="dropDown">
                <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="material-symbols-outlined">more_horiz</span>
                </button>
                <ul class="dropdown-menu" id="dropDown-menu">
                    <li><a class="dropdown-item" href="#" onclick="previewDetails('${id}')"><span
                                class="material-symbols-outlined">visibility</span>Preview</a>
                    </li>
                    <li><a class="dropdown-item" href="#" onclick="editInvoice('${id}')"><span
                                class="material-symbols-outlined">edit</span>Edit</a></li>
                    <li><a class="dropdown-item" href="#" onclick="deleteInvoice('${id}')"><span
                                class="material-symbols-outlined">delete</span>Delete</a>
                    </li>
                </ul>
            </div>
        </td>
    </tr>`;
        }
        document.getElementById("invoiceTBody").innerHTML = temp;
      });
  } catch (error) {
    console.error("Error fetching invoices data:", error);
  }
}
// GET: Get the Invoice End

// Clear the Form 
function clearForm() {
  var form = document.getElementById("newInovice"); 
  form.reset();

  // Reset customer name dropdown
  var customerNameDropdown = document.getElementById("customerName");
  customerNameDropdown.value = "";

  // Reset customer address
  var addressField = document.getElementById("address");
  addressField.textContent = "";
}
// Clear the Form End
// clern and modal off function
function cancelForm() {
  createInvoiceOff();
  clearForm();
}
// clern and modal off function End

// POST: Post the Invoice 
const sumbit_invoice = document.getElementById("newInovice");
sumbit_invoice.addEventListener("submit", (e) => {
  e.preventDefault();

  // Assuming there are multiple items with the class 'tableRow'
  const itemRows = document.getElementsByClassName("items");

  if (itemRows.length === 0) {
    console.error("No items found with class 'tableRow'");
    return;
  }

  // Array to store items data
  const itemsData = [];

  // Loop through item rows
  for (const itemRow of itemRows) {
    const item = {
      item: itemRow.querySelector(".item")?.value,
      unit: itemRow.querySelector(".unit")?.value,
      qty: itemRow.querySelector(".qty")?.value,
      unitPrice: itemRow.querySelector(".unitPrice")?.value,
      totalBD: itemRow.querySelector(".totalBD")?.value,
    };
    itemsData.push(item);
  }

  const post_invoice = {
    date: document.getElementById("date").value,
    customerName: document.getElementById("customerName").value,
    billNumber: document.getElementById("billNumber").value,
    poNumber: document.getElementById("poNumber").value,
    address: document.getElementById("address").textContent,
    grandTotal: document.getElementById("grandTotal").value,
    invoiceitem: itemsData,
  };

  console.log(post_invoice);

  fetch("http://localhost:8080/invoice/newInvoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post_invoice),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      createInvoiceOff();
      readInvoice();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
// POST: Post the Invoice End

// UPDATE: Update the Invoice
function editInvoice(id) {
  console.log(id);

  editInvoiceOn();

  let temp = "";

  fetch(`http://localhost:8080/invoice/getInvoice/${id}`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Invoice received:", data);
      console.log("items received:", data.items);

      const editCustomerName = $("#editCustomerName");

      document.getElementById("editdate").value = data.date;
      document.getElementById("editbillNumber").value = data.billNumber;
      document.getElementById("editpoNumber").value = data.poNumber;
      editCustomerName.val(data.customerName).trigger("change");
      document.getElementById("editaddress").textContent = data.address;
      document.getElementById("editgrandTotal").value = data.grandTotal;

      for (let i = 0; i < data.items.length; i++) {
        const Item = data.items[i];

        temp += `<tr class="items">
          <th scope="row">#${i + 1}</th>
          <td class="IteamTd">
            <select class="js-example-placeholder-multiple js-states form-control editProductItem">
              <option value="${Item.item}" selected>${Item.item}</option>
            </select>
          </td>
          <td>
            <select class="form-select editunit" id="editUnit" aria-label="Default select example">
              <option selected>${Item.unit}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </td>
          <td><input type="number" class="form-control editqty" id="editQty" placeholder="Enter The Qty" value="${
            Item.qty
          }"></td>
<td><input type="number" class="form-control editunitPrice" id="editUnitPrice" min="0.00" step="0.001" placeholder="Enter The Unit Price" value="${
          Item.unitPrice
        }"></td>
<td><input type="number" class="form-control editTotalBD" id="edittotalBD" min="0.00" step="0.001" placeholder="Total Amount" value="${
          Item.totalBD
        }"></td>

          <td></td>
        </tr>`;
      }

      document.getElementById("editTbody").innerHTML = temp;

      fetch("http://localhost:8080/invoice/product")
        .then((response) => response.json())
        .then((data) => {
          const productData = data.data;

          $(".editProductItem").select2({
            placeholder: "Select an item",
            dropdownParent: "#editstaticBackdrop",
            data: productData.map((item) => ({
              id: item.itemInput + " " + item.packingUnit,
              text: item.itemInput + " " + item.packingUnit,
              unit: item.unitProduct,
              unitProduct: item.unitPriceInput,
            })),
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

    const invoiceEdit = document.getElementById("editInvoice");
    invoiceEdit.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      try {
        const invoiceForm = {
          date: document.getElementById("editdate").value,
          billNumber: document.getElementById("editbillNumber").value,
          poNumber: document.getElementById("editpoNumber").value,
          address: document.getElementById("editaddress").textContent,
          customerName: document.getElementById("editCustomerName").value,
          grandTotal: document.getElementById("editgrandTotal").value,
          items: [],
        };
  
        // Loop through each item row in the form
        const itemRows = document.querySelectorAll(".items");
        itemRows.forEach((itemRow) => {
          const item = {
            item: itemRow.querySelector(".editProductItem").value,
            unit: itemRow.querySelector(".editunit").value,
            qty: itemRow.querySelector(".editqty").value,
            unitPrice: itemRow.querySelector(".editunitPrice").value,
            totalBD: itemRow.querySelector(".editTotalBD")?.value,
          };
          invoiceForm.items.push(item);
        });
  
        console.log(invoiceForm);
  
        const response = await fetch(`http://localhost:8080/invoice/editInvoice/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceForm),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const updatedInvoice = await response.json();
        console.log(updatedInvoice);
        editInvoiceOff();
        readInvoice();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    });
  }
// UPDATE: Update the Invoice End

// DELET: Delet the Invoice
function deleteInvoice(id) {
  console.log(id);

  deleteInvoiceOn();

  var modalDelete = document.getElementById("deletInvoiceBtn");
  modalDelete.addEventListener("click", () => {
    fetch(`http://localhost:8080/invoice/deleteInvoice/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          deleteInvoiceOff();
          readInvoice();
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}
// DELET: Delet The Invoice End


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

  // Create the iteam cell
  let cell2 = document.createElement("td");
  cell2.setAttribute("class", "IteamTd");
  let itemInput = document.createElement("select");
  itemInput.setAttribute("id", "productItem" + rowCount);
  itemInput.setAttribute(
    "class",
    "js-example-placeholder-multiple js-states form-control item"
  );

  let placeholderOption = document.createElement("option");
  placeholderOption.setAttribute("value", "");
  placeholderOption.textContent = "Select an option";
  itemInput.appendChild(placeholderOption);

  cell2.appendChild(itemInput);

  fetch("http://localhost:8080/invoice/product")
    .then((response) => response.json())
    .then((data) => {
      const productData = data.data;

      $("#productItem" + rowCount).select2({
        placeholder: "Select an item",
        dropdownParent: "#staticBackdrop",
        data: productData.map((item) => ({
          id: item.itemInput + " " + item.packingUnit,
          text: item.itemInput + " " + item.packingUnit,
          unit: item.unitProduct,
          unitProduct: item.unitPriceInput,
        })),
      });

      $("#productItem" + rowCount).on("change", function (e) {
        const selectedData = $("#productItem" + rowCount).select2("data")[0];

        // console.log("Selected Data:", selectedData);

        // Update the unit dropdown with the selected product's unit information
        $("#productUnit" + rowCount).val(selectedData.unit);
        $("#productPrice" + rowCount).val(selectedData.unitProduct);
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  let cell3 = document.createElement("td");
  let unitSelect = document.createElement("select");
  unitSelect.setAttribute("class", "form-select unit");
  unitSelect.setAttribute("id", "productUnit" + rowCount);
  unitSelect.setAttribute("aria-label", "Default select example");

  // Create and append the default option
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "true");
  // defaultOption.setAttribute("value", "");
  // defaultOption.innerHTML = "Select Unit";
  unitSelect.appendChild(defaultOption);

  // Define an array of values for the options
  const optionValues = ["BOX", "EA", "CT", "PCE"]; // Add your desired values

  // Create a loop to add options
  for (let i = 0; i < optionValues.length; i++) {
    let option = document.createElement("option");
    option.value = optionValues[i];
    option.innerHTML = optionValues[i]; // You can customize the label as needed
    unitSelect.appendChild(option);
  }
  cell3.appendChild(unitSelect);

  let cell4 = document.createElement("td");
  let qtyInput = document.createElement("input");
  qtyInput.setAttribute("type", "number");
  qtyInput.setAttribute("class", "form-control qty");
  qtyInput.setAttribute("value", "");
  qtyInput.setAttribute("id", "productQty" + rowCount);
  qtyInput.setAttribute("placeholder", "Enter The Qty");
  cell4.appendChild(qtyInput);

  let cell5 = document.createElement("td");
  let unitPriceInput = document.createElement("input");
  unitPriceInput.setAttribute("type", "number");
  unitPriceInput.setAttribute("min", "0.00");
  unitPriceInput.setAttribute("step", "0.001");
  unitPriceInput.setAttribute("id", "productPrice" + rowCount);
  unitPriceInput.setAttribute("class", "form-control unitPrice");
  unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
  cell5.appendChild(unitPriceInput);

  let cell6 = document.createElement("td");
  let totalAmountInput = document.createElement("input");
  totalAmountInput.setAttribute("type", "number");
  totalAmountInput.setAttribute("min", "0.00");
  totalAmountInput.setAttribute("step", "0.001");
  totalAmountInput.setAttribute("id", "TotalBD" + rowCount);
  totalAmountInput.setAttribute("class", "form-control totalBD");
  totalAmountInput.setAttribute("placeholder", "Total Amount");
  cell6.appendChild(totalAmountInput);

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

  // Add event listeners to created elements with bind to set the correct 'this'
  qtyInput.addEventListener("input", updateTotal);
  unitPriceInput.addEventListener("input", updateTotal);

  updateGrandTotal();
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

// Function to update the total for a specific row
function updateTotal(event) {
  const targetInput = event.target;
  const rowCount = parseInt(targetInput.id.match(/\d+/)[0], 10);

  const quantity = parseFloat(
    document.getElementById("productQty" + rowCount)?.value
  );
  const unitPrice = parseFloat(
    document.getElementById("productPrice" + rowCount)?.value
  );
  const totalBDInput = quantity * unitPrice;

  const totalElement = document.getElementById("TotalBD" + rowCount);
  if (totalElement) {
    if (Number.isFinite(quantity) && Number.isFinite(unitPrice)) {
      totalElement.value = totalBDInput.toFixed(3);
    }
  }

  updateGrandTotal();
}

function updateGrandTotal() {
  let totalBDInputs = Array.from(document.querySelectorAll(".totalBD"));

  let grandTotal = totalBDInputs.reduce((totalAmount, totalBDInput) => {
    return totalAmount + parseFloat(totalBDInput.value || 0);
  }, 0);

  let grandTotalInput = document.getElementById("grandTotal");
  grandTotalInput.value = grandTotal.toFixed(3);
}

// function updateRowNumbers() {
//   let tableBody = document.getElementById("editTbody");
//   let rows = tableBody.getElementsByTagName("tr");

//   for (let i = 0; i < rows.length; i++) {
//     let row = rows[i];
//     let cells = row.getElementsByTagName("th");
//     let cell = cells[0]; // Assuming the row number is in the first cell

//     // Update the row number
//     cell.textContent = "#" + (i + 1);
//   }
// }


// Add new line end

// edit add new line
// Select the button by ID and add an event listener
// document
//   .getElementById("addEditRowButton")
//   .addEventListener("click", addEditRow);
// function addEditRow() {
//   // Get the table body element in which you want to add row
//   let tableBody = document.getElementById("editTbody");

//   // Create row element
//   let newRow = document.createElement("tr");

//   // Create cells
//   let cell1 = document.createElement("th");
//   cell1.setAttribute("scope", "row");

//   // Get the current row count
//   let rowCount = tableBody.getElementsByTagName("tr").length + 1;
//   cell1.textContent = "#" + rowCount;

//   let cell2 = document.createElement("td");
//   let itemInput = document.createElement("input");
//   itemInput.setAttribute("type", "text");
//   itemInput.setAttribute("class", "form-control item");
//   itemInput.setAttribute("placeholder", "Enter the item");
//   cell2.appendChild(itemInput);

//   let cell3 = document.createElement("td");
//   let unitSelect = document.createElement("select");
//   unitSelect.setAttribute("class", "form-select unit");
//   unitSelect.setAttribute("aria-label", "Default select example");

//   // Create and append the default option
//   let defaultOption = document.createElement("option");
//   defaultOption.setAttribute("selected", "true");
//   defaultOption.innerHTML = "Open this select menu";
//   unitSelect.appendChild(defaultOption);

//   // Define an array of values for the options
//   const optionValues = ["BOX", "value2", "value3", "value4", "value5"]; // Add your desired values

//   // Create a loop to add options
//   for (let i = 0; i < optionValues.length; i++) {
//     let option = document.createElement("option");
//     option.value = optionValues[i];
//     option.innerHTML = optionValues[i]; // You can customize the label as needed
//     unitSelect.appendChild(option);
//   }

//   // Append the select element to the cell
//   cell3.appendChild(unitSelect);

//   let cell4 = document.createElement("td");
//   let qtyInput = document.createElement("input");
//   qtyInput.setAttribute("type", "number");
//   qtyInput.setAttribute("class", "form-control qty");
//   qtyInput.setAttribute("placeholder", "Enter The Qty");
//   cell4.appendChild(qtyInput);

//   let cell5 = document.createElement("td");
//   let unitPriceInput = document.createElement("input");
//   unitPriceInput.setAttribute("type", "number");
//   unitPriceInput.setAttribute("class", "form-control unitPrice");
//   unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
//   cell5.appendChild(unitPriceInput);

//   let cell6 = document.createElement("td");
//   let totalAmountInput = document.createElement("input");
//   totalAmountInput.setAttribute("type", "number");
//   totalAmountInput.setAttribute("class", "form-control");
//   totalAmountInput.setAttribute("placeholder", "Total Amount");
//   totalAmountInput.setAttribute("disabled", "true");
//   cell6.appendChild(totalAmountInput);

//   let cell7 = document.createElement("td");
//   let deleteButton = document.createElement("button");
//   deleteButton.type = "button";
//   deleteButton.classList.add("btn", "btn-danger");
//   deleteButton.innerHTML =
//     '<span class="material-symbols-outlined">delete</span>';
//   deleteButton.addEventListener("click", function () {
//     // Remove the entire row when the delete button is clicked
//     tableBody.removeChild(newRow);
//     updateRowNumbers(); // Update row numbers after deletion
//   });
//   cell7.appendChild(deleteButton);

//   // Append cells to row
//   newRow.appendChild(cell1);
//   newRow.appendChild(cell2);
//   newRow.appendChild(cell3);
//   newRow.appendChild(cell4);
//   newRow.appendChild(cell5);
//   newRow.appendChild(cell6);
//   newRow.appendChild(cell7);

//   // Append row to table body
//   tableBody.appendChild(newRow);
// }

// Function to update row numbers




// edit add new line end

$(document).ready(function () {
  fetch("http://localhost:8080/invoice/customer")
    .then((response) => response.json())
    .then((data) => {
      const productData = data.data;

      // Initialize Select2 dropdown with customer names
      $("#customerName").select2({
        placeholder: "Select The Customer Name",
        dropdownParent: "#staticBackdrop",
        data: productData.map((item) => ({
          id: item.customerSalutation + " " + item.customerName,
          text: item.customerSalutation + " " + item.customerName,
          address: item.customeraddress,
        })),
      });

      // Add event listener for select2:select event
      $("#customerName").on("select2:select", function (e) {
        const selectedData = e.params.data;

        $("#address").text(selectedData.address);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// $(document).ready(function () {
//   fetch("http://localhost:8080/invoice/customer")
//     .then((response) => response.json())
//     .then((data) => {
//       const invoiceData = data.data;

//       // Initialize Select2 dropdown with customer names
//       $("#editCustomerName").select2({
//         placeholder: "Select The Customer Name",
//         dropdownParent: "#editstaticBackdrop",
//         data: invoiceData.map((item) => ({
//           id: item.customerSalutation + " " + item.customerName,
//           text: item.customerSalutation + " " + item.customerName,
//           address: item.customeraddress,
//         })),
//       });

//       // Add event listener for select2:select event
//       $("#editCustomerName").on("select2:select", function (e) {
//         const selectedData = e.params.data;

//         $("#editaddress").text(selectedData.address);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// });

$(document).ready(function () {
  fetch("http://localhost:8080/invoice/customer")
    .then((response) => response.json())
    .then((data) => {
      const invoiceData = data.data;

      // Initialize Select2 dropdown with customer names
      $("#editCustomerName").select2({
        placeholder: "Select The Customer Name",
        dropdownParent: "#editstaticBackdrop",
        data: invoiceData.map((item) => ({
          id: item.customerSalutation + " " + item.customerName,
          text: item.customerSalutation + " " + item.customerName,
          address: item.customeraddress,
        })),
      });

      // Add event listener for select2:select event
      $("#editCustomerName").on("select2:select", function (e) {
        const selectedData = e.params.data;

        // Update the value of #editCustomerName input field
        $("#editCustomerName").val(selectedData.text);

        // Update the value of #editaddress field
        $("#editaddress").text(selectedData.address);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

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
function createInvoiceOn() {
  const createInvoice = document.getElementById("staticBackdrop");
  createInvoice.style.display = "block";
  overlayOn();
}

function createInvoiceOff() {
  const createInvoice = document.getElementById("staticBackdrop");
  createInvoice.style.display = "none";
  overlayOff();
}
// create invoice modal end

// Preview invoice modal
function previewInvoiceOn() {
  const createInvoice = document.getElementById("previwestaticBackdrop");
  createInvoice.style.display = "block";
  overlayOn();
}

function previewInvoiceOff() {
  const createInvoice = document.getElementById("previwestaticBackdrop");
  createInvoice.style.display = "none";
  overlayOff();
}
// Preview invoice modal end

// Edit invoice modal
function editInvoiceOn() {
  const editInvoice = document.getElementById("editstaticBackdrop");
  editInvoice.style.display = "block";
  overlayOn();
}

function editInvoiceOff() {
  const editInvoice = document.getElementById("editstaticBackdrop");
  editInvoice.style.display = "none";
  overlayOff();
}
// Edit invoice modal end

// delete invoice modal
function deleteInvoiceOn() {
  const deleteInvoice = document.getElementById("deletestaticBackdrop");
  deleteInvoice.style.display = "block";
  overlayOn();
}

function deleteInvoiceOff() {
  const deleteInvoice = document.getElementById("deletestaticBackdrop");
  deleteInvoice.style.display = "none";
  overlayOff();
}
// Delete invoice modal end

// date limit
document.addEventListener('DOMContentLoaded', function () {
  var today = new Date();

  var dobInput = document.getElementById('date');
  dobInput.setAttribute('max', today.toISOString().split('T')[0]);

  var editDatepickerInput = document.getElementById('editdate');
  editDatepickerInput.setAttribute('max', today.toISOString().split('T')[0]);
});


