"use client";

import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoCallOutline,
} from "react-icons/io5";
import { InputBox } from "../Input";
import { ArrowCircle } from "../ArrowCircle";

export const MainPage = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (mode === "signin") {
      const { email, password } = form;
      console.log("SIGN IN", { email, password });
    } else {
      console.log("SIGN UP", form);
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="relative w-full h-full max-w-xl mx-auto border-x-2 border-neutral-300 flex flex-col justify-start items-start pt-8 px-6">
        {/* back button */}
        <div className="bg-neutral-100 text-neutral-800 rounded-full flex justify-center items-center p-2">
          <IoIosArrowRoundBack size={25} />
        </div>

        <h1 className="text-4xl font-semibold text-neutral-800 mt-6">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-[14px] text-neutral-500 font-medium mt-1">
          {mode === "signin"
            ? "Let's get you signed in."
            : "Sign up to get started."}
        </p>

        <div className="mt-8 flex flex-col gap-4 w-full">
          {mode === "signup" && (
            <>
              <InputBox
                type="text"
                placeholder="Enter your name"
                icon={
                  <IoPersonOutline className="text-neutral-500" size={25} />
                }
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <InputBox
                type="text"
                placeholder="Enter your phone number"
                icon={<IoCallOutline className="text-neutral-500" size={25} />}
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </>
          )}

          <InputBox
            type="email"
            placeholder="Enter your email"
            icon={<IoMailOutline className="text-neutral-500" size={25} />}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <InputBox
            placeholder="Enter your password"
            type="password"
            icon={
              <IoLockClosedOutline className="text-neutral-500" size={25} />
            }
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-4 w-full mt-10">
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-semibold py-3 rounded-full 
          cursor-pointer w-full text-center"
          >
            {mode === "signin" ? "Sign in" : "Sign up"} <ArrowCircle />
          </button>

          <p className="text-neutral-600 text-[14px] w-full text-center">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="font-medium text-[#649a0d] cursor-pointer hover:underline"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("signin")}
                  className="font-medium text-[#649a0d] cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
