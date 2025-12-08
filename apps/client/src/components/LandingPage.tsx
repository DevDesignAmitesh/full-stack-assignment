"use client";

import { RiRobot2Line } from "react-icons/ri";
import { motion } from "motion/react";

export const LandingPage = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-linear-to-br from-black via-neutral-950 to-black">
      <div className="relative h-full w-full max-w-xl mx-auto border-x-2 border-neutral-800 flex items-center justify-center p-6">

        {/* Ambient Glow Motion */}
        <motion.div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-green-500/20 blur-[160px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-400/10 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-md w-full p-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center h-16 w-16 rounded-xl bg-green-500/20 border border-green-400/40 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <RiRobot2Line size={32} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mt-8 text-3xl md:text-5xl font-bold leading-tight"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-white">Your</span>{" "}
            <span
              className="
                relative inline-block px-3 py-1.5 rounded-lg
                bg-linear-to-r from-green-500 to-emerald-400
                text-black font-semibold
                shadow-[0_0_25px_rgba(34,197,94,0.7)]
              "
            >
              Personal
              <span className="absolute inset-0 rounded-lg bg-green-400 opacity-30 blur-sm -z-10" />
            </span>
            <br />
            <span className="text-white">AI Assistant</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-2 text-neutral-400 text-sm md:text-base"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Experience the future of shopping with an intelligent, always-on
            assistant built just for you.
          </motion.p>

          {/* CTA */}
          <motion.button
            className="mt-28 w-full py-3 rounded-lg font-medium text-black bg-white 
            hover:scale-[1.02] hover:opacity-90 cursor-pointer active:scale-100 transition-all"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start chatting
          </motion.button>

          {/* Footer */}
          <motion.span
            className="mt-4 text-xs text-neutral-500"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            Powered by AI
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};
