import React, { useState } from "react";
import axios from "axios";

const AddVaccine = () => {
  const [vaccineData, setVaccineData] = useState({
    vaccineId: "",
    manufacturer: "",
    dateOfManufacture: "",
    expiryDate: "",
    assigned: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVaccineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vaccineData);
    try {
      await axios.post("http://localhost:8081/api/vaccines/register", vaccineData);
     
      alert("Vaccine added successfully!");
      setVaccineData({
        vaccineId: "",
        manufacturer: "",
        dateOfManufacture: "",
        expiryDate: "",
        assigned: false,
      });
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Vaccine</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="vaccineId" className="block text-sm font-medium text-gray-700">Vaccine ID</label>
          <input
            type="text"
            id="vaccineId"
            name="vaccineId"
            value={vaccineData.vaccineId}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={vaccineData.manufacturer}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfManufacture" className="block text-sm font-medium text-gray-700">Date of Manufacture</label>
          <input
            type="date"
            id="dateOfManufacture"
            name="dateOfManufacture"
            value={vaccineData.dateOfManufacture}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={vaccineData.expiryDate}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Vaccine
        </button>
      </form>
    </div>
  );
};

export default AddVaccine;
