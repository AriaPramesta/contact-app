import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function EditContact() {
  const { id } = useParams(); // Get ID from URL
  const [contact, setContact] = useState(null); // State to store the selected contact
  const [name, setName] = useState(""); // State for contact name
  const [phone, setPhone] = useState(""); // State for contact phone
  const [email, setEmail] = useState(""); // State for contact email
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch contacts from localStorage when the component mounts
    const storedContacts =
      JSON.parse(localStorage.getItem("contactDataList")) || [];

    // Convert id from string to number for comparison
    const selectedContact = storedContacts.find((c) => c.id === Number(id));

    // If contact is found, set states
    if (selectedContact) {
      setContact(selectedContact);
      setName(selectedContact.name);
      setPhone(selectedContact.phone);
      setEmail(selectedContact.email);
    }
  }, [id]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Update the contact in localStorage
    const storedContacts =
      JSON.parse(localStorage.getItem("contactDataList")) || [];

    const updatedContacts = storedContacts.map(
      (c) => (c.id === Number(id) ? { ...c, name, phone, email } : c) // Update the specific contact
    );

    localStorage.setItem("contactDataList", JSON.stringify(updatedContacts)); // Update localStorage
    navigate("/"); // Redirect to the home page after saving
  };

  // Loading state or when contact is not found
  if (!contact) {
    return <div className="text-white">Loading...</div>; // Show loading if data is not available
  }

  return (
    <div className="relative text-white p-5 md:p-8 mx-auto min-w-[320px] max-w-[768px] min-h-screen bg-slate-900 lg:rounded-xl">
      <h2 className="text-2xl font-semibold mb-5">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="bg-slate-800 p-5 rounded-lg">
        <div className="flex flex-col gap-5 md:gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              placeholder="Enter your name"
              required
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update phone state
              placeholder="Enter your phone number"
              required
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="Enter your email (optional)"
              required
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
            />
          </div>
        </div>
        <button
          type="submit" // Submit the form
          className="mt-5 p-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300" // Styling for the save button
        >
          Save Changes {/* Button label */}
        </button>
      </form>
    </div>
  );
}
