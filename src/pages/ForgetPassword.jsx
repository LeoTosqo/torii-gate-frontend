import React, { useState } from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../utils/formValidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../utils/axiosInstance";
import { PiWarningCircle } from "react-icons/pi";

const ForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const handleForgotPassword = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        ...data,
      });
      if (response.status === 200) {
        localStorage.setItem('email', data.email)
        //redirect to the page
        redirect("/check-email");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthWrapper>
      <div className="bg-white py-[29px] px-[26px] rounded-lg shadow-lg w-full lg:w-[505px]">
        <Link to="/register" className="border border-[#f2f2f2]">
          <button className="flex items-center gap-1.5">
            <FaArrowLeft /> Back
          </button>
        </Link>
        <div className="max-w-[332px] my-5"></div>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <label htmlFor="email" className="label">
            Email<sup className="text-red-500 mb-1.5">*</sup>
          </label>
          <input
            type="email "
            id="email"
            className="w-full my-2 h-[56px] border-[#d9d9d9] rounded-lg border p-3 text-[] outline-0"
            placeholder="Enter Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          {errorMessage && (
            <div className="w-full rounded-xl py-2 my-2.5 px-4 bg-[#FF37370D] border border-[#ff3737] text-[#ff3737] flex items-center gap-3">
              <PiWarningCircle size={22} />
              <p>{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-black text-[16px] rounded-xl h-[56px] text-white w-full mt-6"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md text-black"></span>
            ) : (
              "Continue"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center my-6">
          <h1>Remember you Password? </h1>
          <Link to="/register">Sign in</Link>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ForgetPassword;
  