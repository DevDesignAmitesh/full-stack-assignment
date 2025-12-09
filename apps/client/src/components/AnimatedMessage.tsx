import { motion } from "motion/react";

export const AnimatedMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};
