import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// ✅ FIX: Import components directly from their files
import DisclosurePanel from "./cbseDisclosure/DisclosurePanel";
import EditDisclosure from "./cbseDisclosure/EditDisclosure";
const PrivateRoute = () => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// ✅ Export these if needed for routing in App.jsx or elsewhere
export { DisclosurePanel, EditDisclosure };
