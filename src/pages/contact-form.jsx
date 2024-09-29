import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function ContactForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    id: null, // Add id here
    name: "",
    phone: "",
    email: "", // Email is optional
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in formData
    }));
  };

  // Function to validate phone number format
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Validate phone number (10-15 digits)
    return phoneRegex.test(phone); // Return true if valid
  };

  // Function to validate email format
  const validateEmail = (email) => {
    if (!email) return true; // If email is empty, consider it valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    return emailRegex.test(email); // Return true if valid
  };

  // Function to check for duplicate names or phone numbers
  const isDuplicate = (newData) => {
    const existingData =
      JSON.parse(localStorage.getItem("contactDataList")) || []; // Get existing contacts
    return existingData.some(
      (data) =>
        data.name.toLowerCase() === newData.name.toLowerCase() || // Check for duplicate name
        data.phone === newData.phone // Check for duplicate phone number
    );
  };

  // Function to handle cancel action
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate("/"); // Navigate back to home
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      toast.error(
        "Invalid phone number. Please enter a valid phone number with 10-15 digits."
      );
      return; // Exit if validation fails
    }

    // Validate email if provided
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return; // Exit if validation fails
    }

    // Check for duplicate name or phone number
    if (isDuplicate(formData)) {
      toast.error(
        "Name or phone number already exists. Please use a different one."
      );
      return; // Exit if duplication found
    }

    // Add unique id to the contact data before saving
    const contactWithId = {
      ...formData,
      id: Date.now(), // Generate a unique id based on the current timestamp
    };

    // Save data to localStorage
    const existingData =
      JSON.parse(localStorage.getItem("contactDataList")) || []; // Get existing contacts
    const updatedData = [...existingData, contactWithId]; // Add new contact to existing ones
    localStorage.setItem("contactDataList", JSON.stringify(updatedData)); // Save updated contacts

    toast.success("Data saved!"); // Show success notification

    // Reset the form after successfully saving data
    setFormData({
      id: null, // Reset id
      name: "",
      phone: "",
      email: "", // Reset email as well
    });

    // Navigate back to home after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="text-white">
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-16 mx-auto min-w-[320px] max-w-[768px] min-h-screen bg-slate-900 flex flex-col justify-between lg:rounded-xl"
      >
        <div className="flex flex-col gap-5 md:gap-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">
            Add Contact
          </h2>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
              required // Name is required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
              required // Phone is required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email (optional)"
              className="rounded-lg p-3 focus:bg-stone-800 transition-colors delay-75 text-black focus:text-white"
            />
          </div>
        </div>

        <div className="flex justify-evenly items-center mt-6">
          <button
            onClick={handleCancel} // Call handleCancel on button click
            className="hover:bg-neutral-700 py-3 px-14 rounded-full transition duration-300"
          >
            Cancel
          </button>
          <p>|</p>
          <button
            type="submit" // Submit button
            className="hover:bg-neutral-700 py-3 px-14 rounded-full transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer /> // Toast container for notifications
    </div>
  );
}
