const addButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const resetButton = document.getElementById("reset-button");
const recordContainer = document.querySelector(".record-container");
const deleteButton = document.getElementById("delete-button");

/**************************************/

const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("contact-num");

let contactArray = [];
let id = 0;

// Object constructor for Contact
function Contact(id, name, email, number) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.number = number;
}

// Display available record
document.addEventListener("DOMContentLoaded", function () {
  contactArray = [
    {
      id: 0,
      name: "Aria Adi Pramesta",
      email: "aria@aria.com",
      number: "+6281123415674",
    },
  ];
  displayRecord();
});

// Display function
function displayRecord() {
  contactArray.forEach(function (singleContact) {
    addToList(singleContact);
  });
}

// Adding contact record
addButton.addEventListener("click", function () {
  id++;
  const contact = new Contact(id, name.value, email.value, number.value);
  contactArray.push(contact);

  // Adding to list
  addToList(contact);
});

// Add to list (on the DOM)
{
  function addToList(item) {
    const newRecordDiv = document.createElement("div");
    newRecordDiv.classList.add("record-item");
    newRecordDiv.innerHTML = `
        <div class="record-el">
            <span id="labelling">Contact ID: </span>
            <span id="contact-id-content">${item.id}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Name: </span>
            <span id="name-content">${item.name}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Email: </span>
            <span id="email-content">${item.email}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Contact Number: </span>
            <span id="contact-num-content">${item.number}</span>
        </div>

        <button type="button" id="delete-button">Delete</button>
        `;
    recordContainer.appendChild(newRecordDiv);
  }
}

// Deletion of record
recordContainer.addEventListener("click", function (event) {
  if (event.target.id === "delete-button") {
    // removin from DOM
    let recordItem = event.target.parentElement;
    recordContainer.removeChild(recordItem);
  }
});

// Clear all input fields
cancelButton.addEventListener("click", function () {
  clearInputFields();
});

function clearInputFields() {
  name.value = "";
  email.value = "";
  number.value = "";
}
