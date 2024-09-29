import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [contacts, setContacts] = useState([]); // State to store contacts
  const [searchVisible, setSearchVisible] = useState(false); // State to toggle search input visibility
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // useEffect to fetch contacts from localStorage on component mount
  useEffect(() => {
    const storedContacts =
      JSON.parse(localStorage.getItem("contactDataList")) || []; // Retrieve contacts from localStorage or set as an empty array
    setContacts(storedContacts); // Set the contacts state with the stored contacts
  }, []);

  // Function to handle click on the Add Contact button
  const handleAddContact = () => {
    navigate("/add-contact"); // Navigate to /add-contact route
  };

  // Function to categorize contacts by the first letter of their names
  const categorizeContacts = () => {
    return contacts.reduce((acc, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase(); // Get the first letter of the contact's name
      if (!acc[firstLetter]) {
        acc[firstLetter] = []; // Create a new array for the first letter if it doesn't exist
      }
      acc[firstLetter].push(contact); // Push the contact to the corresponding array
      return acc;
    }, {});
  };

  const categorizedContacts = categorizeContacts(); // Categorize the contacts

  // Function to handle click on a contact
  const handleContactClick = (id) => {
    navigate(`/contact/${id}`); // Navigate to /contact/:id route with the specific contact ID
  };

  // Function to toggle the visibility of the search input
  const toggleSearch = () => {
    setSearchVisible(!searchVisible); // Toggle the search input visibility
    setSearchInput(""); // Reset the input when showing the search box
  };

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update the search input state with the current value
  };

  // Filter contacts based on the search input
  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchInput.toLowerCase()) // Check if contact name includes the search input
  );

  // Re-categorize contacts based on the filtered list
  const categorizedFilteredContacts = categorizeContacts(); // This might not be used; consider removing if not needed

  return (
    <div className="relative text-white p-5 md:p-8 mx-auto min-w-[320px] max-w-[768px] min-h-screen bg-slate-900 lg:rounded-xl">
      <nav className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Contact App</h1>
        <div className="flex gap-5">
          <button onClick={toggleSearch}>
            <GoSearch className="text-3xl" /> {/* Search icon button */}
          </button>
        </div>
      </nav>

      {/* Search Input */}
      {searchVisible && (
        <div className="mt-5">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange} // Handle input change
            placeholder="Search contacts..." // Placeholder for the search input
            className="p-3 rounded-full focus:bg-stone-800 focus:text-white w-full" // Styling for the search input
          />
        </div>
      )}

      {/* Contact List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-5">Contact List</h2>
        {filteredContacts.length > 0 ? ( // Check if there are any filtered contacts
          Object.keys(categorizedContacts).length > 0 ? ( // Check if there are categorized contacts
            Object.keys(categorizedContacts)
              .sort() // Sort the letters for display
              .map((letter) => (
                <div key={letter} className="mb-4">
                  <h3 className="text-lg font-bold">{letter}</h3>
                  <ul className="space-y-4">
                    {categorizedContacts[letter]
                      .filter(
                        (contact) =>
                          contact.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase()) // Filter contacts by search input
                      )
                      .map((contact) => (
                        <li
                          key={contact.id} // Use contact.id as the key
                          className="p-4 bg-slate-800 rounded-lg flex justify-between items-center cursor-pointer" // Styling for the contact item
                          onClick={() => handleContactClick(contact.id)} // Navigate to contact details on click
                        >
                          <div>
                            <p>{contact.name}</p>{" "}
                            {/* Display the contact's name */}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ))
          ) : (
            <p>No contacts available.</p> // Message if no contacts are available
          )
        ) : (
          <p>No contacts found for your search.</p> // Message if no contacts match the search
        )}
      </div>

      {/* Add Contact Button */}
      <div className="absolute bottom-5 right-5">
        <button
          onClick={handleAddContact} // Add onClick for navigation to add contact
          className="text-3xl p-5 rounded-full bg-neutral-700 hover:bg-neutral-600 shadow-lg" // Styling for the add contact button
        >
          <GoPlus /> {/* Plus icon for adding a contact */}
        </button>
      </div>
    </div>
  );
}
