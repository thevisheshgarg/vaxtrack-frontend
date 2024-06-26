import React, { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpRegister = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseInitialized(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Initialize RecaptchaVerifier after Firebase is initialized
    if (firebaseInitialized && !recaptchaVerifier) {
      setRecaptchaVerifier(
        new RecaptchaVerifier(auth, "recaptcha-container", {})
      );
    }
  }, [firebaseInitialized, recaptchaVerifier]);

  // Function to handle sign-up process
  const onSignup = async () => {
    setLoading(true);

    try {
      // Make API request to check if phone number exists
      const response = await axios.get(
        `http://localhost:8081/api/patients/phone/${ph.substring(2)}`
      );

      if (response.data) {
        // Phone number exists in the database
        const formatPh = "+" + ph;

        setUpRecaptha(formatPh)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sent successfully!");
          })
          .catch((error) => {
            console.error("Error setting up reCAPTCHA:", error);
            setLoading(false);
          });
      } else {
        // Phone number doesn't exist in the database
        setLoading(false);
        toast.error("Wrong credentials: Phone number not found");
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      setLoading(false);
    }
  };

  // Function to handle OTP verification
  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        sessionStorage.setItem('userPhone', JSON.stringify(res.user.providerData[0].phoneNumber));
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
      });
  };

  return (
    <section className="bg-blue-008DDA flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍 Registered Successfully
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> VaxTrack
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-blue-008DDA w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  disableDropdown={true} // Disable country code dropdown
                />
                <button
                  onClick={onSignup}
                  className="bg-blue-800 hover:bg-blue-950 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

function setUpRecaptha(number) {
  const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}

export default OtpRegister;
