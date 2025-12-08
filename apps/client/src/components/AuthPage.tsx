"use client";

import { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "./InputBox";
import { PrimaryButton } from "./PrimaryButton";
import { ArrowCircle } from "./ArrowCircle";
import { Spinner } from "./Spinner";

type Mode = "signin" | "signup";

export const AuthPage = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
  });

  const [signinData, setSigninData] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setMode("signin");
  }, []);

  const mockDelay = async () => new Promise((res) => setTimeout(res, 1200));

  const handleSignup = async () => {
    setLoading(true);
    await mockDelay();

    localStorage.setItem("user", JSON.stringify(signupData));
    setLoading(false);

    toast.success("Account created successfully");
    setMode("signin");
  };

  const handleSignin = async () => {
    setLoading(true);
    await mockDelay();

    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setLoading(false);
      toast.error("User not found. Please sign up first");
      return;
    }

    const user = JSON.parse(savedUser);
    if (
      user.phone === signinData.phone &&
      user.password === signinData.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      setLoading(false);
      toast.success("Signed in successfully 🚀");
    } else {
      setLoading(false);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="h-screen w-full bg-linear-to-br from-black via-neutral-950 to-black overflow-hidden">
      <div className="relative h-full w-full max-w-xl mx-auto border-x-2 border-neutral-800 flex items-center justify-center p-6">
        {/* Animated glow */}
        <motion.div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-green-500/20 blur-[160px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-400/10 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Card */}
        <motion.div
          className="relative z-10 w-full max-w-md p-8 flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/20 border border-green-400/40 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <RiRobot2Line size={28} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-center text-3xl font-bold text-white"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </motion.h2>

          {/* Form */}
          <motion.div
            className="flex flex-col gap-4 mt-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {mode === "signup" && (
              <>
                <Input
                  placeholder="Full name"
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone"
                  onChange={(e) =>
                    setSignupData({ ...signupData, phone: e.target.value })
                  }
                />
                <Input
                  placeholder="Address"
                  onChange={(e) =>
                    setSignupData({ ...signupData, address: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />

                <PrimaryButton disabled={loading} onClick={handleSignup}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      Sign up <ArrowCircle />
                    </>
                  )}
                </PrimaryButton>
              </>
            )}

            {mode === "signin" && (
              <>
                <Input
                  placeholder="Phone"
                  onChange={(e) =>
                    setSigninData({ ...signinData, phone: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setSigninData({ ...signinData, password: e.target.value })
                  }
                />

                <PrimaryButton disabled={loading} onClick={handleSignin}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      Sign in <ArrowCircle />
                    </>
                  )}
                </PrimaryButton>
              </>
            )}
          </motion.div>

          {/* Switch */}
          <motion.p
            className="text-center text-sm text-neutral-500 mt-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-green-400 cursor-pointer hover:underline"
                  onClick={() => setMode("signin")}
                >
                  Sign in
                </span>
              </>
            ) : (
              <>
                New here?{" "}
                <span
                  className="text-green-400 cursor-pointer hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create account
                </span>
              </>
            )}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
