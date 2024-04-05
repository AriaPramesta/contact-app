function saveContacts(contacts) {
  localStorage.setItem("contact-app", JSON.stringify(contacts));
}

function loadContacts() {
  const contacts = localStorage.getItem("contact-app");
  if (!contacts) {
    saveContacts([]);
  }

  try {
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to load contacts", error);
  }
}

const searchInput = document.getElementById("search-input");

function searchContacts(contacts, keyword) {
  searchInput.value = keyword;

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return filteredContacts;
}

const contactsListElement = document.getElementById("contacts-list");

function renderContacts() {
  const contacts = loadContacts();
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const keyword = params.get("q");
  const contactsToRender = keyword
    ? searchContacts(contacts, keyword)
    : contacts;

  const contactItemElements = contactsToRender.map((contact) => {
    return `<a href="/contact-detail">
    <div class="single-contact">
      <p>${contact.name}</p>
      <p>${contact.phone}</p>
    </div>
  </a>`;
    // <button onclick="deleteContactById(${contact.id})">Delete</button>
  });

  const contactItems = contactItemElements.join("");
  contactsListElement.innerHTML = contactItems;
}

const addContactForm = document.getElementById("add-contact");

function addContact(event) {
  event.preventDefault();
  const contactFormData = new FormData(addContactForm);

  const contacts = loadContacts();

  const newContact = {
    id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
    name: contactFormData.get("name"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone"),
  };

  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);

  addContactForm.reset();
  renderContacts();
}

function deleteContactById(id) {
  const contacts = loadContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(id)
  );

  saveContacts(updatedContacts);
  renderContacts();
}

addContactForm.addEventListener("submit", addContact);

window.addEventListener("load", renderContacts);
