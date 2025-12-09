"use client";

import { RiRobot2Line } from "react-icons/ri";
import { IntroText } from "./IntroText";
import Link from "next/link";
import { motion } from "motion/react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const MainPage = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden">

      {/* Ambient blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full 
        blur-[150px] bg-[#3a4f19]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full 
        blur-[150px] bg-[#0f2345]"
      />

      {/* Main Card */}
      <motion.div
        initial="hidden"
        animate="show"
        className="z-10 flex flex-col items-center justify-center w-full h-full 
        mx-auto max-w-xl border-x-2 border-neutral-800"
      >
        {/* Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            },
          }}
          className="h-16 w-16 rounded-2xl bg-linear-to-br 
          from-[#a3e635] to-[#22c55e] flex justify-center items-center"
        >
          <RiRobot2Line size={30} fill="#000" />
        </motion.div>

        {/* Intro */}
        <motion.div variants={fadeUp} transition={{ delay: 0.2 }}>
          <IntroText />
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.35 }}
          className="text-center text-neutral-400 text-[14px] font-semibold mt-4"
        >
          Experience the future of shopping with your <br /> own intelligent
          companion.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="w-full flex justify-center"
        >
          <Link
            href="/signin"
            className="bg-white mt-28 text-black font-semibold py-3 
            rounded-full w-[80%] text-center"
          >
            Start a new chat
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.75 }}
          className="text-center text-neutral-400 text-[13px] font-medium mt-2"
        >
          Powered by Human
        </motion.p>
      </motion.div>
    </div>
  );
};
