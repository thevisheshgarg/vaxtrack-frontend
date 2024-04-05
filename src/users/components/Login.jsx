import React, { useState } from 'react';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleCenterRegister = () => {
    // Handle Admin Login
    console.log("Redirecting to center registration page...");
    window.location.href = 'http://localhost:3000/signin';
  };

  const handleCitizenRegister = () => {
    // Handle citizen registration
    console.log("Redirecting to citizen registration page...");
    window.location.href = 'http://localhost:3000/register';
  };

  const handleCenterLogin = () => {
    // Handle center login
    console.log("Redirecting to center login page...");
    window.location.href = 'http://localhost:3000/otpCenter';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 py-12 px-4">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md flex">
        <div className="w-1/2 h-full mr-2">
          <img src="1.png" alt="Vaccination registration" className="h-full object-cover rounded-t-lg rounded-b-lg" />
        </div>
        <div className="w-1/2 flex flex-col justify-center relative">
          <h1 className="text-m font-bold absolute top-0 right-5 mt-6 mr-12">
            Login/Register
          </h1>
          <div className="flex flex-col">
            <button
              onClick={handleCenterRegister}
              className="w-full mt-6 py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              <a href="http://localhost:3000/signin" className="text-white">Login As admin </a>
            </button>
            <button
              onClick={handleCenterLogin}
              className="w-full mt-4 py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              <a href="http://localhost:3000/otpCenter" className="text-white">Login as Centers</a>
            </button>
            <button
              onClick={handleCitizenRegister}
              className="w-full mt-4 py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              <a href="http://localhost:3000/register" className="text-white">Register for vaccination</a>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            By registering, I agree to the <a href="/termsAndConditions" className='text-blue-600'>terms and conditions</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
