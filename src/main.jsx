import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import { ContactForm } from "./pages/contact-form";
import { ContactDetail } from "./pages/contact-detail";
import { EditContact } from "./pages/contact-edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-contact",
    element: <ContactForm />,
  },
  {
    path: "/contact/:id",
    element: <ContactDetail />,
  },
  {
    path: "/edit-contact/:id",
    element: <EditContact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
