//For Admin 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated") === "true";

    if (!isAuthenticated) {
      // Redirect to the signin page if not authenticated
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuth;
