function validateNewRow(row) {
    const itemCodeInput = row.querySelector(".itemCodeInput");
    const itemCode = itemCodeInput.value.trim();
  
    // Select the element
  // let value = itemCodeInput.value;
  
  // Check if the element exists
  // if (itemCodeInput) {
  //   // Element exists, safe to access its properties
  //   let value = itemCodeInput.value;
  //   console.log("Item Code Input Value:", value);
  // } else {
  //   // Element does not exist, handle accordingly
  //   console.log("Item Code Input not found");
  // }
  
  
    const itemInput = row.querySelector(".itemInput");
    const packingUnit = row.querySelector(".packingUnit");
    const itemUnitSelect = row.querySelector(".unitProduct");
    const unitPriceInput = row.querySelector(".unitPriceInput");
  
    let isValid = true; // Flag to track overall validation status
  
    // Validate itemCodeInput not empty
    if (itemCode === "") {
      row.querySelector(".errorItemCodeInput").style.display = "block";
      isValid = false;
    } else {
      row.querySelector(".errorItemCodeInput").style.display = "none";
    }
  
    // Validate itemInput not empty
    if (itemInput.value.trim() === "") {
      row.querySelector(".erroritemInput").style.display = "block";
      isValid = false;
    } else {
      row.querySelector(".erroritemInput").style.display = "none";
    }
  
    // Validate packingUnit not empty
    if (packingUnit.value.trim() === "") {
      row.querySelector(".errorpackingUnit").style.display = "block";
      isValid = false;
    } else {
      row.querySelector(".errorpackingUnit").style.display = "none";
    }
  
    // Validate unitProduct not the default option
    if (itemUnitSelect.value.trim() === "Select Item Unit") {
      row.querySelector(".errorunitProduct").style.display = "block";
      isValid = false;
    } else {
      row.querySelector(".errorunitProduct").style.display = "none";
    }
  
    // Validate unitPriceInput not empty and greater than zero
    if (
      unitPriceInput.value.trim() === "" ||
      parseFloat(unitPriceInput.value) <= 0
    ) {
      row.querySelector(".errorunitPriceInput").style.display = "block";
      isValid = false;
    } else {
      row.querySelector(".errorunitPriceInput").style.display = "none";
    }
  
    return isValid;
  }