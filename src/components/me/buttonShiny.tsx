"use client";

import React, { useEffect, useState } from "react";
import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Languages } from "../../app/api/config";

const animationProps = {
  initial: { "--x": "100%", scale: 0.98 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;
interface ShinyButtonProps {
  className?: string;
  signIn: () => void;
}
const ShinyButton = ({ className, signIn, ...props }: ShinyButtonProps) => {
  const languages = new Languages();
  const { language } = languages;
  const [lang, setLanguage] = useState<string>("Iniciar Sesion");

  useEffect(() => {
    setLanguage(language ? "Login" : "Iniciar Sesion");
  }, [language]);
  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        "flex items-center relative rounded-full text-[10px] p-2.5 h-6 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:bg-primary/90 dark:hover:bg-[#ccc] dark:hover:shadow bg-primary bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
        className
      )}
      onClick={signIn}
    >
      <span
        className="relative w-20 text-xs tracking-wide  text-white dark:text-slate-950 "
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {lang}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] dark:bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))]"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;
