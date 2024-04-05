import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";

const VaccineCentersDashboard = () => {
  const [searchId, setSearchId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [userCenter, setCenterData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const storedCenter = sessionStorage.getItem("centerPhone");
      if (storedCenter) {
        const response = await axios.get(`http://localhost:8081/api/centers/phone/${JSON.parse(storedCenter).substring(3)}`);
        setCenterData(response.data);
        sessionStorage.setItem('centerData', JSON.stringify(response.data)); // Set userData to session storage
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/appointments/${userCenter.centerId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userCenter]);



  const handleSearch = () => {
    // Filter appointments based on the entered ID
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.appointmentId.toString() === searchId
    );
    setAppointments(filteredAppointments);
  };

  const handleStatusChange = (appointmentId, status) => {
    // Update status in the backend
    axios.put(`http://localhost:8081/api/appointments/updateStatus/${appointmentId}?status=${status}`)
      .then(() => {
        // Update status in the frontend
        const updatedAppointments = appointments.map((appointment) =>
          appointment.appointmentId === appointmentId ? { ...appointment, status } : appointment
        );
        setAppointments(updatedAppointments);
        setUpdatedStatus(status);
        setConfirmationOpen(true);
      })
      .catch(error => console.error("Error updating appointment status:", error));
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Vaccine Center</Typography>
        </Toolbar>
      </AppBar>

      <div className="px-10">
        <Box className="text-center my-4" style={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '20px auto 0' }}>
          <TextField
            label="Search by Appointment ID"
            variant="outlined"
            size="small"
            style={{ flex: 1, marginRight: '16px' }}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#1976D2', color: 'white', minWidth: '100px' }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>


        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Vaccine ID</TableCell>
                <TableCell>Appointment ID</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.appointmentId}>
                  <TableCell>{appointment.patientId}</TableCell>
                  <TableCell>{appointment.vaccineId}</TableCell>
                  <TableCell>{appointment.appointmentId}</TableCell>
                  <TableCell>
                    <Select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.appointmentId, e.target.value)}
                    >
                      <MenuItem value="Scheduled">Scheduled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Canceled">Canceled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Snackbar
        open={confirmationOpen}
        autoHideDuration={6000}
        onClose={handleConfirmationClose}
        message={`Status updated to ${updatedStatus}`}
      />
    </div>
  );
};

export default VaccineCentersDashboard;
