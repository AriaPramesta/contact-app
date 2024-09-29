import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaUser, FaArrowLeft } from "react-icons/fa"; // Importing icons

export function ContactDetail() {
  const { id } = useParams(); // Get ID from URL
  const [contact, setContact] = useState(null); // State to store the selected contact
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch contacts from localStorage when the component mounts
    const storedContacts =
      JSON.parse(localStorage.getItem("contactDataList")) || [];
    console.log("Stored Contacts:", storedContacts); // Debug: log stored contacts

    // Convert id from string to number for comparison
    const selectedContact = storedContacts.find((c) => c.id === Number(id));
    console.log("Selected Contact:", selectedContact); // Debug: log the selected contact

    setContact(selectedContact); // Set the selected contact in state
  }, [id]);

  // Function to delete the contact
  const handleDelete = () => {
    const storedContacts =
      JSON.parse(localStorage.getItem("contactDataList")) || [];
    // Filter out the deleted contact from the stored contacts
    const updatedContacts = storedContacts.filter((c) => c.id !== Number(id));
    // Update localStorage with the new contact list
    localStorage.setItem("contactDataList", JSON.stringify(updatedContacts));
    navigate("/"); // Redirect to the home page after deletion
  };

  // Function to navigate to the edit contact page
  const handleEdit = () => {
    navigate(`/edit-contact/${id}`); // Navigate to the edit page for the specific contact ID
  };

  // Function to navigate back
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Loading state or when contact is not found
  if (!contact) {
    return <div className="text-white">Loading...</div>; // Show loading if data is not available
  }

  return (
    <div className="text-white">
      <div className="p-5 md:p-16 mx-auto min-w-[320px] max-w-[768px] min-h-screen bg-slate-900 flex flex-col justify-between lg:rounded-xl relative">
        {/* Back button */}
        <button
          onClick={handleBack} // Call handleBack on button click
          className="absolute top-4 right-4 text-blue-400 hover:text-blue-300 transition-colors" // Styling for the back button
        >
          <FaArrowLeft className="text-2xl" /> {/* Back icon */}
        </button>

        <div className="flex flex-col gap-5 md:gap-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">
            Contact Details
          </h2>
          <div className="flex items-center bg-slate-800 p-4 md:p-5 rounded-lg shadow-md">
            <FaUser className="text-blue-400 mr-3 text-lg md:text-xl" />{" "}
            <p className="text-base md:text-lg">{contact.name}</p>{" "}
          </div>
          <div className="flex items-center bg-slate-800 p-4 md:p-5 rounded-lg shadow-md">
            <FaPhone className="text-blue-400 mr-3 text-lg md:text-xl" />{" "}
            <p className="text-base md:text-lg">{contact.phone}</p>{" "}
          </div>
          <div className="flex items-center bg-slate-800 p-4 md:p-5 rounded-lg shadow-md">
            <FaEnvelope className="text-blue-400 mr-3 text-lg md:text-xl" />{" "}
            <p className="text-base md:text-lg">{contact.email}</p>{" "}
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row justify-evenly items-center">
          <button
            onClick={handleEdit} // Call handleEdit on button click
            className="hover:bg-neutral-700 py-3 px-10 md:px-14 rounded-full text-base md:text-lg" // Styling for the edit button
          >
            Edit Contact
          </button>
          <p className="hidden md:block">|</p>
          <button
            onClick={handleDelete} // Call handleDelete on button click
            className="hover:bg-neutral-700 py-3 px-10 md:px-14 rounded-full text-base md:text-lg" // Styling for the delete button
          >
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  );
}
