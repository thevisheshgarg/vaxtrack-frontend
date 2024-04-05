import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddVaccinationCenter = () => {
  const [centerData, setCenterData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    pincode: "",
    state: "",
    district: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCenterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8081/api/centers/register",
        centerData
      );
      alert("Vaccination center added successfully!");
      // Clear form after successful submission
      setCenterData({
        name: "",
        address: "",
        phoneNumber: "",
        pincode: "",
        state: "",
        district: "",
      });
    } catch (error) {
      console.error("Error adding vaccination center:", error);
    }
  };

  return (
    <div className="my-8 p-6 h-[100vh] bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Vaccination Center</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={centerData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={centerData.address}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={centerData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Pincode"
            variant="outlined"
            name="pincode"
            value={centerData.pincode}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={centerData.state}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="District"
            variant="outlined"
            name="district"
            value={centerData.district}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary" className="mt-4">
          Add Center
        </Button>
      </form>
    </div>
  );
};

export default AddVaccinationCenter;
