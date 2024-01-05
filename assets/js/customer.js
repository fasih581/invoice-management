// GET METHOD 
readCustomer();
async function readCustomer() {
  try {
    let temp = "";
    const response = await fetch("http://localhost:8080/invoice/customer")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.data.length; i++) {
          const id = data.data[i]._id;
          const customers = data.data[i];

          temp += `<tr class="customerRow">
                  <th scope="row">#${i + 1}</th>
                  <td>${
                    customers.customerSalutation + " " + customers.customerName
                  }</td>
                  <td class="addressTd">${customers.customeraddress}</td>
                  <td class="pEdit">
                      <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editstaticBackdrop">
                        <span class="material-symbols-outlined" onclick="editCustomer('${id}')">Edit</span>
                      </button>
                  </td>
                  <td class="pdelet">
                      <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletestaticBackdrop">
                        <span class="material-symbols-outlined" onclick="deleteCustomer('${id}')">delete</span>
                      </button>
                  </td>
              </tr>`;
        }
        document.getElementById("customerTbody").innerHTML = temp;
      });
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
}
// GET method End

//send the POST request
const sumbitCustomer = document.getElementById("addcustomer");
sumbitCustomer.addEventListener("click", (e) => {
  e.preventDefault();

  //   const isValid = FormValidation();
  //   if(!isValid){
  //     return;
  //   }

  var customerSalutation = document.getElementById("customerSalutation").value;
  var customerName = document.getElementById("customerName").value;
  var customeraddress = document.getElementById("customeraddress").value;

  const postCustomer = {
    customerSalutation,
    customerName,
    customeraddress,
  };

  fetch("http://localhost:8080/invoice/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postCustomer),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // createCustomerOff();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      // Handle errors if necessary
    });
    createCustomerOff();
    readCustomer();
});

//send the POST request End

// PUT method
function editCustomer(id) {
  console.log(id);

  editCustomerOn();

  fetch(`http://localhost:8080/invoice/customer/${id}`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Item received:", data.data);

      console.log("customerSalutation:", data.data.customerSalutation);
      console.log("customerName:", data.data.customerName);
      console.log("customeraddress:", data.data.customeraddress);

      document.getElementById("editcustomerSalutation").value =
        data.data.customerSalutation;
      document.getElementById("editcustomerName").value =
        data.data.customerName;
      document.getElementById("editcustomeraddress").value =
        data.data.customeraddress;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  const customerEdit = document.getElementById("editCustomer");
  customerEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    let customerForm = {
      customerSalutation: document.getElementById("editcustomerSalutation")
        .value,
      customerName: document.getElementById("editcustomerName").value,
      customeraddress: document.getElementById("editcustomeraddress").value,
    };

    fetch(`http://localhost:8080/invoice/customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedCustomer) => {
        console.log(updatedCustomer);
        editCustomerOff();
        readCustomer();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}
// PUT METHOD END

// DELETE CUSTOMER
function deleteCustomer(id) {
  console.log(id);

  deleteCustomerOn();

  var modalDelete = document.getElementById("DeleteBtn");
  modalDelete.addEventListener("click", () => {
    fetch(`http://localhost:8080/invoice/customer/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          deleteCustomerOff();
          readCustomer();
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}
// DELETE CUSTOMER END

// Clear the Form 
function clearForm() {
  var form = document.getElementById("newCustomer");
  form.reset();
}
// Clear the Form End


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
function createCustomerOn() {
  const createCustomer = document.getElementById("newCustomerInvoice");
  createCustomer.style.display = "block";
  overlayOn();
}

function createCustomerOff() {
  const createCustomer = document.getElementById("newCustomerInvoice");
  createCustomer.style.display = "none";
  overlayOff();
}
// create invoice modal end

// Edit invoice modal
function editCustomerOn() {
  const editCustomer = document.getElementById("editCustomerInvoice");
  editCustomer.style.display = "block";
  overlayOn();
}

function editCustomerOff() {
  const editCustomer = document.getElementById("editCustomerInvoice");
  editCustomer.style.display = "none";
  overlayOff();
}
// Edit invoice modal end

// delete invoice modal
function deleteCustomerOn() {
  const deleteCustomer = document.getElementById("deleteCustomerInvoice");
  deleteCustomer.style.display = "block";
  overlayOn();
}

function deleteCustomerOff() {
  const deleteCustomer = document.getElementById("deleteCustomerInvoice");
  deleteCustomer.style.display = "none";
  overlayOff();
}
// Delete invoice modal end

