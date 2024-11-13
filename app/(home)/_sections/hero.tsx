"use client";

import Image from "next/image";

import React, { useContext, useEffect } from "react";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BRANDS } from "../_constants";

const heroElementVariants = {
  down: {
    y: 30,
    opacity: 0,
  },
  up: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const cardVariants: Variants = {
  off: {
    opacity: 0,
  },
  on: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const marqueeVariants: Variants = {
  stop: {
    x: 0,
  },
  start: {
    x: "calc(-100% - 0.75rem)",
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function Hero() {
  const heroTextControls = useAnimationControls();
  const cartContrls = useAnimationControls();
  const marqueeControls = useAnimationControls();

  useEffect(() => {
    const sequenceAnimation = async () => {
      await heroTextControls.start("up");
      await cartContrls.start("on");
      await marqueeControls.start("start");
    };

    sequenceAnimation();
  }, [heroTextControls, cartContrls, marqueeControls]);

  return (
    <div className="relative">
      <motion.div
        initial="down"
        variants={heroElementVariants}
        animate={heroTextControls}
        className="mt-4 flex flex-col items-center justify-center gap-5 text-white sm:pt-8">
        <motion.h1
          variants={heroElementVariants}
          className="text-center text-7xl font-bold leading-[1.1] [word-spacing:-5px]">
          Transform Your HR Management
        </motion.h1>
        <motion.h1
          variants={heroElementVariants}
          className="-mt-4 text-center text-7xl font-bold leading-[1.1] [word-spacing:-5px]">
          with Real-Time Insights
        </motion.h1>
        <motion.p
          variants={heroElementVariants}
          className="max-w-4xl text-center text-lg text-[#A1A1AA] mt-4">
          Streamline payroll, leave, attendance, and expense management—all in one intuitive
          platform.
          <br />
          Empower every startup owner to manage like a pro. Simple, effective, and engaging.
        </motion.p>
        <div className="w-full max-w-[32rem] px-3">
          <motion.div variants={heroElementVariants} className="mt-4 flex justify-center">
            <Button className="relative h-[55px] border-[2.5px] border-[#24272b] bg-[#09090B] px-12 text-base font-semibold before:absolute before:-bottom-[2px] before:h-[1px] before:w-[50%] before:rounded before:bg-gradient-to-r before:from-[#24272b] before:via-[#22D3EE] before:to-[#24272b] before:transition-all hover:bg-[#24272b] hover:before:w-[80%]">
              Register Now
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="off"
        variants={cardVariants}
        animate={cartContrls}
        className="mt-24 flex min-w-full gap-3 overflow-x-hidden bg-black">
        <motion.div variants={cardVariants}>
          {/* <img */}
          {/*   src="/big-circle.svg" */}
          {/*   className="absolute inset-0 -z-10 w-full -translate-y-1/2 opacity-30 lg:-translate-y-[40%] sm:-translate-y-16" */}
          {/* /> */}
          <img
            src="/big-circle.png"
            className="absolute inset-0 -z-10 w-full -translate-y-1/2 opacity-30 md:hidden lg:-translate-y-[40%]"
          />
        </motion.div>
        <motion.div
          initial="stop"
          animate={marqueeControls}
          variants={marqueeVariants}
          className="flex min-w-full flex-shrink-0 justify-around gap-3 py-6">
          {BRANDS.map((project, idx) => (
            <div key={idx}>
              <img src={project.projectSourceUrl} alt="project-1" className="h-full w-full" />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="stop"
          animate={marqueeControls}
          variants={marqueeVariants}
          className="flex min-w-full flex-shrink-0 justify-around gap-3 py-6">
          {BRANDS.map((project, idx) => (
            <div key={idx}>
              <img src={project.projectSourceUrl} alt="project-1" className="h-full w-full" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
