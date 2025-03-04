import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard as we don't have admin functionality anymore
    navigate("/dashboard");
  }, [navigate]);

  return null;
}