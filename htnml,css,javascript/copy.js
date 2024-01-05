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

  // Fetch data from the API
  // fetch("http://localhost:8080/invoice/product")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     dataArray = data.data;

  //     $("#productItem" + rowCount).select2({
  //       placeholder: "Select an item",
  //       dropdownParent: "#staticBackdrop",
  //       data: dataArray.map((item) => ({
  //         id: item.itemCodeInput,
  //         text: item.itemInput + " " + item.packingUnit,
  //       })),
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //   });

    // // Fetch data from the API for products
    // fetch("http://localhost:8080/invoice/product")
    // .then((response) => response.json())
    // .then((data) => {
    //   const productData = data.data;

    //   // Initialize Select2 dropdown with product names
    //   $("#productItem" + rowCount).select2({
    //     placeholder: "Select an item",
    //     dropdownParent: "#staticBackdrop",
    //     data: productData.map((item) => ({
    //       id: item.itemCodeInput,
    //       text: item.itemInput + " " + item.packingUnit,
    //       unit: item.unitProduct, // Add the unit information to the data
    //     })),
    //   });

      
    //   $("#productItem" + rowCount).on("select2:select", function (e) {

    //     const selectedData = e.params.data;

    //     console.log("Selected Data:", selectedData);
    //     // Update the unit dropdown with the selected product's unit information
    //     $("#productUnit" + rowCount).val(selectedData.unit);
    //   });
    // })
    // .catch((error) => {
    //   console.error("Error fetching product data:", error);
    // });

    // Fetch data from the API for products
fetch("http://localhost:8080/invoice/product")
.then((response) => response.json())
.then((data) => {
  const productData = data.data;

  // Initialize Select2 dropdown with product names
  $("#productItem" + rowCount).select2({
    placeholder: "Select an item",
    dropdownParent: "#staticBackdrop",
    data: productData.map((item) => ({
      id: item.itemCodeInput,
      text: item.itemInput + " " + item.packingUnit,
      unit: item.unitProduct,
      unitProduct: item.unitPriceInput,
    })),
  });

  $("#productItem" + rowCount).on("change", function (e) {
   
    const selectedData = $("#productItem" + rowCount).select2("data")[0];

    console.log("Selected Data:", selectedData);

    // Update the unit dropdown with the selected product's unit information
    $("#productUnit" + rowCount).val(selectedData.unit);
    $("#productuPrice" + rowCount).val(selectedData.unitProduct);
  });
})
.catch((error) => {
  console.error("Error fetching product data:", error);
});



  let cell3 = document.createElement("td");
  let unitSelect = document.createElement("select");
  unitSelect.setAttribute("class", "form-select unit");
  unitSelect.setAttribute("id", "productUnit"+ rowCount);
  unitSelect.setAttribute("aria-label", "Default select example");

  // Create and append the default option
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", "true");
  // unitSelect.setAttribute("id", "searchProduct");
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
  qtyInput.setAttribute("class", "form-control  form-calc qty");
  qtyInput.setAttribute("value", "");
  qtyInput.setAttribute("id", "productQty"+ rowCount);
  qtyInput.setAttribute("placeholder", "Enter The Qty");
  cell4.appendChild(qtyInput);

  let cell5 = document.createElement("td");
  let unitPriceInput = document.createElement("input");
  unitPriceInput.setAttribute("type", "number");
  unitPriceInput.setAttribute("min", "0.00");
  unitPriceInput.setAttribute("step", "0.001");
  unitPriceInput.setAttribute("name", "Productprice[]");
  unitPriceInput.setAttribute("id", "productuPrice" + rowCount);
  unitPriceInput.setAttribute("class", "form-control form-calc unitPrice");
  unitPriceInput.setAttribute("placeholder", "Enter The Unit Price");
  cell5.appendChild(unitPriceInput);

  let cell6 = document.createElement("td");
  let totalAmountInput = document.createElement("input");
  totalAmountInput.setAttribute("type", "number");
  totalAmountInput.setAttribute("min", "0.00");
  totalAmountInput.setAttribute("step", "0.001");
  totalAmountInput.setAttribute("readonly", "readonly");
  totalAmountInput.setAttribute("id", "TotalBD");
  totalAmountInput.setAttribute("class", "form-control totalBD");
  totalAmountInput.setAttribute("placeholder", "Total Amount");
  cell6.appendChild(totalAmountInput);

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

  qtyInput.addEventListener("input", updateTotal);

  // Add event listener to unit price input
  unitPriceInput.addEventListener("input", updateTotal);

  // Call the updateGrandTotal function initially
  updateGrandTotal();
}

function updateGrandTotal() {
  // Get all the totalBD inputs
  let totalBDInputs = document.querySelectorAll(".totalBD");

  // Calculate the grand total
  let grandTotal = Array.from(totalBDInputs).reduce((sum, input) => {
    return sum + (parseFloat(input.value) || 0);
  }, 0);

  // Update the grand total display
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(3);
}