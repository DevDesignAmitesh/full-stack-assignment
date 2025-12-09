"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoCallOutline,
} from "react-icons/io5";
import { InputBox } from "../Input";
import { ArrowCircle } from "../ArrowCircle";
import { UserSignup } from "@repo/types/types";
import { useSearchParams } from "next/navigation";
import { useSignup } from "@/hooks/useSignup";
import { useSignin } from "@/hooks/useSignin";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

type mode = "signin" | "signup";

export const MainPage = ({ role }: { role: mode }) => {
  const [mode, setMode] = useState<mode>(role);

  const [form, setForm] = useState<UserSignup>({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const { loading: signupLoading, handleSignup } = useSignup();
  const { loading: signinLoading, handleSignin } = useSignin();

  const handleChange = (key: keyof UserSignup, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (mode === "signin") {
      const { email, password } = form;
      console.log("SIGN IN", { email, password });
      handleSignin(form);
    } else {
      console.log("SIGN UP", form);
      handleSignup(form);
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="relative w-full h-full max-w-xl mx-auto border-x-2 border-neutral-300 flex flex-col pt-8 px-6">
        {/* Back button */}
        <div className="bg-neutral-100 text-neutral-800 rounded-full flex justify-center items-center p-2 absolute left-5 top-5">
          <IoIosArrowRoundBack size={25} />
        </div>

        <h1 className="text-4xl font-semibold text-neutral-800 mt-12">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-[14px] text-neutral-500 font-medium mt-1">
          {mode === "signin"
            ? "Let's get you signed in."
            : "Sign up to get started."}
        </p>

        {/* Animated Inputs */}
        <motion.div
          key={mode} // important so animation replays on mode switch
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col gap-4 w-full"
        >
          {mode === "signup" && (
            <>
              <motion.div variants={itemVariants}>
                <InputBox
                  type="text"
                  placeholder="Enter your name"
                  icon={<IoPersonOutline size={25} />}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InputBox
                  type="text"
                  placeholder="Enter your phone number"
                  icon={<IoCallOutline size={25} />}
                  value={form.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                />
              </motion.div>
            </>
          )}

          <motion.div variants={itemVariants}>
            <InputBox
              type="email"
              placeholder="Enter your email"
              icon={<IoMailOutline size={25} />}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputBox
              type="password"
              placeholder="Enter your password"
              icon={<IoLockClosedOutline size={25} />}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 w-full mt-10"
        >
          <button
            disabled={signupLoading || signinLoading}
            onClick={handleSubmit}
            className="bg-black text-white font-semibold py-3 rounded-full w-full flex justify-center items-center gap-2"
          >
            {signupLoading || signinLoading
              ? "Processing"
              : mode === "signin"
                ? "Sign in"
                : "Sign up"}{" "}
            <ArrowCircle />
          </button>

          <p className="text-neutral-600 text-[14px] text-center">
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
        </motion.div>
      </div>
    </div>
  );
};
