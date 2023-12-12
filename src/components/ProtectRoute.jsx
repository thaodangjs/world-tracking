import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated === false) navigate("/");
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

export default ProtectRoute;
