"use client";
import Image from "next/image";
import React from "react";
import { HeroAirPods, HeroBanner } from "@/public";
import { motion } from "framer-motion";

const Hero = () => {
  const variants = {
    hidden: { x: 0, y: 70, opacity: 0.5 },
    visible: { x: 0, y: -10, opacity: 1, transition: { duration: 1 } },
  };
  return (
    <div className="w-full md:h-[400px] h-[200px] flex items-center  ">
      <div className="hero-section">
        <div className="object-cover">
          {/* Add banner in hero section */}
          <Image src={HeroBanner} height={100} width={1400} alt="Air Banner" />
        </div>
        {/* Airpods in Hero Section */}
        <div className="air-pods">
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <Image src={HeroAirPods} height={100} width={700} alt="Air Pods" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
