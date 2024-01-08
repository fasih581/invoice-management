// PREVIWE INVOICE
function previewDetails(id) {
  previewInvoiceOn();

  let temp = "";

  fetch(`http://localhost:8080/invoice/getInvoice/${id}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
      console.log("id =", id);
    })
    .then((data) => {
      console.log(data);

      document.getElementById("invoiceDate").innerHTML = data.date;
      document.getElementById("invoiceBill.NO").innerHTML = data.billNumber;
      document.getElementById("invoicePO.NO").innerHTML = data.poNumber;
      document.getElementById("invoiceCustomerName").innerHTML =
        data.customerName;
      document.getElementById("invoiceAddress").innerHTML = data.address;
      document.getElementById("invoiceGrandTotal").innerHTML = data.grandTotal;

      const amount = data.grandTotal;
      const words = convertNumberToWords(amount);
      console.log(`${amount} BAHRAINI DINARS ${words}`);

      const textBeforeAmount = "Bahraini Dinars ";
      document.getElementById("AmountWord").innerHTML = textBeforeAmount + words;

      for (let i = 0; i < data.items.length; i++) {
        const Item = data.items[i];

        temp += `   <tr class="items">
        <th scope="row">${i + 1}</th>
        <td>${Item.item}</td>
        <td>${Item.unit}</td>
        <td>${Item.qty}</td>
        <td>${Item.unitPrice}</td>
        <td class="bd">${Item.totalBD}</td>
    </tr>`;
      }

      document.getElementById("previweTbody").innerHTML = temp;
    });
}

// End-PREVIWE INVOICE

// PRINT PDF INVOICE
function printdiv(elem) {
  var header_str =
    "<html><head><title>" + document.title + "</title><style></style></head><body>";
  var footer_str = "</body></html>";
  var new_str = document.getElementById(elem).innerHTML;
  var old_str = document.body.innerHTML;
  document.body.innerHTML = header_str + new_str + footer_str;
  window.print();
  document.body.innerHTML = old_str;
  return false;
}
function previewOff(elem) {
  printdiv(elem);
  previewInvoiceOff();
}
// End-PRINT PDF INVOICE

// CONVERT NUMBER TO WORDS INVOICE
function convertNumberToWords(number) {
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function convertGroup(num) {
      if (num === 0) return "";
      else if (num < 10) return units[num];
      else if (num < 20) return teens[num - 10];
      else return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
  }

  function convertToWords(num) {
      if (num === 0) return "zero";

      const billion = Math.floor(num / 1000000000);
      const million = Math.floor((num % 1000000000) / 1000000);
      const thousand = Math.floor((num % 1000000) / 1000);
      let remainder = num % 1000;

      let result = "";

      if (billion > 0) {
          result += convertGroup(billion) + " billion ";
      }

      if (million > 0) {
          result += convertGroup(million) + " million ";
      }

      if (thousand > 0) {
          result += convertGroup(thousand) + " thousand ";
      }

      if (remainder >= 100) {
          result += convertGroup(Math.floor(remainder / 100)) + " hundred ";
          remainder %= 100;
      }

      if (remainder > 0) {
          result += convertGroup(remainder);
      }

      return result.trim().toUpperCase();
  }

  const integerPart = Math.floor(number);
  const decimalPart = (number - integerPart).toFixed(3).slice(2); // Get the three-digit decimal part

  let words = convertToWords(integerPart);

  if (decimalPart > 0) {
      words += ` & ${decimalPart}/1000 Fils Only`;
  }

  return words;
}
// End-CONVERT NUMBER TO WORDS INVOICE