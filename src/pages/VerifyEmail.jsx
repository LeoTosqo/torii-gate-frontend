import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import Icon from "../assets/SVGRepo_iconCarrier.png";
import { BounceLoader } from "react-spinners";
import { MdCancel } from "react-icons/md";

const VerifyEmail = () => {
  const { token } = useParams();
  //   const redirect = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("verifying");
  const checkToken = async () => {
    try {
      const response = await axiosInstance.post(`/auth/verify-email/${token}`, {
        token,
      });
      if (response.status === 200) {
        setStatus("success");
      }
    } catch (error) {
      setErrorMsg("Email Verification Failed");
      setStatus("error");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (status === "verifying") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-md text-center">
          <BounceLoader className="mx-auto"/>
          <h1 className="text-xl font-semibold my-3 lg:text[30px]">Email verifying</h1>
          <p className="text-[#666]">Please Wait</p>
          
        </div>
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-md text-center">
          <img src={Icon} alt="Icon" className="block mx-auto" />
          <h1>verification Successful</h1>
          <p className="text-[#666] mb-4">Your account has been verified Successfully</p>
          <Link to="/login">
            <button className="w-full h-[56px] font-semibold rounded-xl bg-[#0c0c0c] text-white">
              Proceed to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-md text-center">
          <MdCancel size={80} className="text-red-500 mx-auto"/>
          <h1>verification Failed</h1>
          <p>Invalid or expired Token
          </p>
          <Link to="/login">
            <button className="w-full h-[56px] font-semibold rounded-xl bg-[#0c0c0c] text-white">
              Resend Verification mail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
