const addButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const recordContainer = document.querySelector(".record-container");
const deleteButton = document.getElementById("delete-button");

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("contact-num");

let contacts = [];
let id = 0;

// Object constructor for Contact
function Contact(id, name, email, phone) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.phone = phone;
}

// Display available record
document.addEventListener("DOMContentLoaded", function () {
  contacts = [
    {
      id: 1,
      name: "Aria Adi Pramesta",
      email: "aria@aria.com",
      phone: "+6281123415674",
    },
  ];
  displayContact();
});

// Display function
function displayContact() {
  contacts.forEach(function (singleContact) {
    renderToList(singleContact);
  });
}

// Adding contact record
addButton.addEventListener("click", function () {
  const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
  const contact = new Contact(
    (id = newId),
    name.value,
    email.value,
    phone.value
  );
  contacts.push(contact);

  // Adding to list
  renderToList(contact);
});

// Add to list (on the DOM)
{
  function renderToList(item) {
    // const queryString = window.location.search;
    // const params = new URLSearchParams(queryString);
    // const keyword = params.get("q").toLowerCase;

    // const contactsFilter = contacts.filter((contact) => {
    //   if (contact.name.toLocaleLowerCase().includes(keyword)) {
    //     return contact;
    //   }
    // });

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
            <span id="labelling">Phone: </span>
            <span id="contact-num-content">${item.phone}</span>
        </div>

        <button type="button" id="delete-button">Delete</button>
        <button type="button" id="edit-button">Edit</button>
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

// Cancel all input fields
cancelButton.addEventListener("click", function () {
  cancelInputFields();
});

function cancelInputFields() {
  name.value = "";
  email.value = "";
  phone.value = "";
}

// window.addEventListener("load", renderToList);
