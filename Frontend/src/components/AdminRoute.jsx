import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/profile");

        if (res.data.user.role === "admin") {
          setAllowed(true);
        }
      } catch (err) {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking access...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
