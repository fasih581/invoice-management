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

  let cell2 = document.createElement("td");
  let itemCodeInput = document.createElement("input");
  itemCodeInput.setAttribute("type", "text");
  itemCodeInput.setAttribute("class", "form-control itemCodeInput");
  itemCodeInput.setAttribute("placeholder", "Enter the item code");
  cell2.appendChild(itemCodeInput);

  let cell3 = document.createElement("td");
  let itemInput = document.createElement("input");
  itemInput.setAttribute("type", "text");
  itemInput.setAttribute("class", "form-control itemInput");
  itemInput.setAttribute("placeholder", "Enter The Item");
  cell3.appendChild(itemInput);

  let cell4 = document.createElement("td");
  let pkUnitInput = document.createElement("input");
  pkUnitInput.setAttribute("type", "text");
  pkUnitInput.setAttribute("class", "form-control packingUnit");
  pkUnitInput.setAttribute("placeholder", "Enter The Packing Unit");
  cell4.appendChild(pkUnitInput);

  let cell5 = document.createElement("td");
  let itemUnitSelect = document.createElement("select");
  itemUnitSelect.setAttribute("class", "form-select unit");
  itemUnitSelect.setAttribute("aria-label", "Default select example");

  // Create and append the default option
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "true");
  defaultOption.innerHTML = "Select Item Unit";
  itemUnitSelect.appendChild(defaultOption);

  // Define an array of values for the options
  const optionValues = ["BOX", "EA", "CT", "PCE"]; // Add your desired values

  // Create a loop to add options
  for (let i = 0; i < optionValues.length; i++) {
    let option = document.createElement("option");
    option.value = optionValues[i];
    option.innerHTML = optionValues[i]; // You can customize the label as needed
    itemUnitSelect.appendChild(option);
  }
  cell5.appendChild(itemUnitSelect);

  let cell6 = document.createElement("td");
  let unitPriceInput = document.createElement("input");
  unitPriceInput.setAttribute("type", "number");
  unitPriceInput.setAttribute("min", "0.00");
  unitPriceInput.setAttribute("step", "0.001");
  unitPriceInput.setAttribute("class", "form-control unitPriceInput");
  unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
  cell6.appendChild(unitPriceInput);

  let cell7 = document.createElement("td");

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
}
// Add new line end

// edit add new line
// Select the button by ID and add an event listener
document
  .getElementById("addEditRowButton")
  .addEventListener("click", addEditRow);
function addEditRow() {
  // Get the table body element in which you want to add row
  let tableBody = document.getElementById("editTbody");

  // Create row element
  let newRow = document.createElement("tr");

  // Create cells
  let cell1 = document.createElement("th");
  cell1.setAttribute("scope", "row");

  // Get the current row count
  let rowCount = tableBody.getElementsByTagName("tr").length + 1;
  cell1.textContent = "#" + rowCount;

  let cell2 = document.createElement("td");
  let itemInput = document.createElement("input");
  itemInput.setAttribute("type", "text");
  itemInput.setAttribute("class", "form-control item");
  itemInput.setAttribute("placeholder", "Enter the item");
  cell2.appendChild(itemInput);

  let cell3 = document.createElement("td");
  let unitSelect = document.createElement("select");
  unitSelect.setAttribute("class", "form-select unit");
  unitSelect.setAttribute("aria-label", "Default select example");

  // Create and append the default option
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "true");
  defaultOption.innerHTML = "Open this select menu";
  unitSelect.appendChild(defaultOption);

  // Define an array of values for the options
  const optionValues = ["BOX", "value2", "value3", "value4", "value5"]; // Add your desired values

  // Create a loop to add options
  for (let i = 0; i < optionValues.length; i++) {
    let option = document.createElement("option");
    option.value = optionValues[i];
    option.innerHTML = optionValues[i]; // You can customize the label as needed
    unitSelect.appendChild(option);
  }

  // Append the select element to the cell
  cell3.appendChild(unitSelect);

  let cell4 = document.createElement("td");
  let qtyInput = document.createElement("input");
  qtyInput.setAttribute("type", "number");
  qtyInput.setAttribute("class", "form-control qty");
  qtyInput.setAttribute("placeholder", "Enter The Qty");
  cell4.appendChild(qtyInput);

  let cell5 = document.createElement("td");
  let unitPriceInput = document.createElement("input");
  unitPriceInput.setAttribute("type", "number");
  unitPriceInput.setAttribute("class", "form-control unitPrice");
  unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
  cell5.appendChild(unitPriceInput);

  let cell6 = document.createElement("td");
  let totalAmountInput = document.createElement("input");
  totalAmountInput.setAttribute("type", "number");
  totalAmountInput.setAttribute("class", "form-control");
  totalAmountInput.setAttribute("placeholder", "Total Amount");
  totalAmountInput.setAttribute("disabled", "true");
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
}

// Function to update row numbers
function updateRowNumbers() {
  let tableBody = document.getElementById("editTbody");
  let rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let cells = row.getElementsByTagName("th");
    let cell = cells[0]; // Assuming the row number is in the first cell

    // Update the row number
    cell.textContent = "#" + (i + 1);
  }
}
// edit add new line end
