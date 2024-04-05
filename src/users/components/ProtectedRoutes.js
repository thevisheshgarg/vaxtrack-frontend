//For Vaccine Center
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Cookies.get("authenticated") === "true";

    if (!isAuthenticated) {
      // Redirect to the signin page if not authenticated
      navigate("/signin");
    }
  }, [navigate]);


  return;
};

export default useAuth;
