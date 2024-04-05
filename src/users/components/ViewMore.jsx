import React, { useState, useEffect } from 'react';
import './ViewMore.css';
import VaccinationByGenderImage from "../../assets/ss1.png";
import VaccinationByType from "../../assets/ss2.png";
import VaccinationByAge from "../../assets/ss3.png";
import axios from "axios";

const ViewMore = () => {

    const [totalVaccinated, setTotalVaccinated] = useState(0);
    const [totalCenters, setTotalCenters] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios.get("http://localhost:8081/api/vaccination-records");
            setTotalVaccinated(response1.data.length);

            const response2 = await axios.get("http://localhost:8081/api/centers");
            setTotalCenters(response2.data.length);

            const response3 = await axios.get("http://localhost:8081/api/patients");
            setTotalPatients(response3.data.length);

        };

        fetchData();
    }, [])

    return (
        <div id="view-more">
            <div className="header">
                <h1>View More</h1>
            </div>
            <div className="card-container">
                <div className="card">
                    <h2>Total Vaccination Doses</h2>
                    <p>{totalVaccinated}</p>

                </div>
                <div className="card">
                    <h2>Sites Conducting Vaccination</h2>
                    <p>{totalCenters}</p>

                </div>
                <div className="card">
                    <h2>Total Registrations</h2>
                    <p>{totalPatients}</p>

                </div>
            </div>
            <div className="image-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/India_Vaccination_Map.jpg" alt="India Vaccination Map" style={{ maxHeight: '600px', margin: '20px auto', display: 'block' }} />
            </div>
            <div className="card-container">
                <div className="card2">
                    <h2>Vaccination By Gender</h2>
                    <img src={VaccinationByGenderImage} alt="Vaccination By Gender" />
                </div>
                <div className="card2">
                    <h2>Vaccination By Type</h2>
                    <img src={VaccinationByType} alt="Vaccination By Type" />
                </div>
                <div className="card2">
                    <h2>Vaccination By Age</h2>
                    <img src={VaccinationByAge} alt="Vaccination By Age" />
                </div>
            </div>
        </div>
    );
};

export default ViewMore;
