import React, { useState, useEffect } from "react";
import axios from "axios";

const Menu = ({ showMenu }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = sessionStorage.getItem("userPhone");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        const response = await axios.get(`http://localhost:8081/api/patients/phone/${JSON.parse(storedUser).substring(3)}`);
        setUserData(response.data);
        sessionStorage.setItem('userData', JSON.stringify(response.data)); // Set userData to session storage
      }
    };

    fetchData();
  }, []);

  const scrollToFAQ = (e) => {
    e.preventDefault();
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/${userData.patientId}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "vaccination_certificate.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userPhone");
    sessionStorage.removeItem("userData");
    setUser(null);
    setUserData({});
  };

  return (
    <div className={`${showMenu ? "block" : "hidden"} md:flex justify-center items-center`}>
      <a href="/" className="text-white hover:text-gray-300 px-3 py-2 block md:inline">Home</a>
      <a href="/about" onClick={scrollToAbout} className="text-white hover:text-gray-300 px-3 py-2 block md:inline">About</a>
      <a href="/faq" onClick={scrollToFAQ} className="text-white hover:text-gray-300 px-3 py-2 block md:inline">FAQs</a>

      <div>
        {user ? (
          <>
            <a href="/myprofile" className="text-white hover:text-gray-300 px-3 py-2 block md:inline">{userData.firstName}</a>
            <button onClick={handleDownloadCertificate} className="text-white hover:text-gray-300 px-3 py-2 block md:inline">Download Certificate</button>
            <button onClick={handleLogout} className="text-white hover:text-red-500 hover:bg-red-100 px-3 py-2 block md:inline">Logout</button>
          </>
        ) : (
          <a href="/login" className="bg-white px-4 py-3 rounded-sm text-blue-008DDA hover:text-white hover:bg-blue-700">Register/Login</a>
        )}
      </div>
    </div>
  );
};

export default Menu;
