// pages/admin.js
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* This needs to be replaced with actual admin functionality  */}
      <p>Admin content will go here</p>
    </div>
  );
};

export default AdminDashboard;

// app/router.js (or similar routing file)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from "@/pages/dashboard";
import Leads from "@/pages/leads";
import Contacts from "@/pages/contacts";
import Tasks from "@/pages/tasks";
import AdminDashboard from "@/pages/admin";
import NotFound from "@/pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "leads", element: <Leads /> },
      { path: "contacts", element: <Contacts /> },
      { path: "tasks", element: <Tasks /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;