import { motion } from "framer-motion";
import React from "react";

const variants = {
    initial: { x: 300, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: -300, opacity: 0 }
};

export const PageTransition: React.FC<React.PropsWithChildren> = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={{ duration: 0.4 }}
        className="h-full"
    >
        {children}
    </motion.div>
);
