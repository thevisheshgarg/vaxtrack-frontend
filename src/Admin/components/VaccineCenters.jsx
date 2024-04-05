import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const VaccineCenters = () => {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/centers");
        setCenters(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCenters();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-10 py-4">
      <h2 className="text-2xl font-bold mb-4">Vaccination Centers</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-blue-008DDA">
              <TableCell sx={{ color: 'white' }}>Center ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Pincode</TableCell>
              <TableCell sx={{ color: 'white' }}>State</TableCell>
              <TableCell sx={{ color: 'white' }}>District</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {centers.map((center) => (
              <TableRow
                key={center.centerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{center.centerId}</TableCell>
                <TableCell>{center.name}</TableCell>
                <TableCell>{center.address}</TableCell>
                <TableCell>{center.phoneNumber}</TableCell>
                <TableCell>{center.pincode}</TableCell>
                <TableCell>{center.state}</TableCell>
                <TableCell>{center.district}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VaccineCenters;
