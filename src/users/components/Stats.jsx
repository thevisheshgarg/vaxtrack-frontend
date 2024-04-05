import React, { useState, useEffect } from 'react';
import axios from "axios";

const Stats = () => {
    const [totalVaccinations, setTotalVaccinations] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8081/api/vaccination-records");
            setTotalRecords(response.data.length);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalVaccinations(prevTotal => prevTotal < totalRecords ? prevTotal + 1 : totalRecords);
        }, 10);

        // Clean up the interval when the component is unmounted or the data reaches the actual value
        return () => clearInterval(interval);
    }, [totalRecords]);

    return (
        <div className="bg-[#093045] py-8 sm:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-y-4 text-center lg:grid-cols-2">
                    <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                        <dt className="text-base leading-7 text-white">Total Vaccinated</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{totalVaccinations.toLocaleString()}</dd>
                    </div>
                    <div className="m-auto flex max-w-xs flex-col">
                        <a href="/viewmore" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-md">
                            View More
                        </a>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Stats;
