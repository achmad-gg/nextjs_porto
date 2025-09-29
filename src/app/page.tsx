"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import StarBorder from "../components/ui/StarBorder";
import StackingCard from "@/components/ui/stacking-card";
import InfoModal from "@/components/ui/InfoModal";
import AboutSection from "@/components/ui/AboutSection";

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const projects = [
  {
    title: "Kanban Board",
    description: truncateText(
      "Kanban Taskly is a modern, user-friendly task management application built with Next.js, featuring an intuitive drag-and-drop Kanban board interface. Designed to streamline task organization and enhance productivity, it allows users to efficiently manage tasks across four distinct columns: To Do, In Progress, Review, and Done. Each column is visually distinguished with unique background colors (white, light blue, light yellow, and light green) to provide a clear and engaging user experience.",
      150
    ),
    link: "/images/porto.jpg",
    categories: ["Next.js", "React", "Tailwind CSS"],
    color: "#1447e6",
  },
  {
    title: "Clément Chapillon",
    description: truncateText(
      "Kanban Taskly is a modern, user-friendly task management application built with Next.js, featuring an intuitive drag-and-drop Kanban board interface. Designed to streamline task organization and enhance productivity, it allows users to efficiently manage tasks across four distinct columns: To Do, In Progress, Review, and Done. Each column is visually distinguished with unique background colors (white, light blue, light yellow, and light green) to provide a clear and engaging user experience.",
      150
    ),
    link: "/images/porto.jpg",
    categories: ["Nuxt.js", "Vue", "Tailwind CSS"],
    color: "#1035a3",
  },
  {
    title: "Zissou",
    description: truncateText(
      "Kanban Taskly is a modern, user-friendly task management application built with Next.js, featuring an intuitive drag-and-drop Kanban board interface. Designed to streamline task organization and enhance productivity, it allows users to efficiently manage tasks across four distinct columns: To Do, In Progress, Review, and Done. Each column is visually distinguished with unique background colors (white, light blue, light yellow, and light green) to provide a clear and engaging user experience.",
      150
    ),
    link: "/images/porto.jpg",
    categories: ["Next.js", "React", "Tailwind CSS"],
    color: "#0b236c",
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description: truncateText(
      "Kanban Taskly is a modern, user-friendly task management application built with Next.js, featuring an intuitive drag-and-drop Kanban board interface. Designed to streamline task organization and enhance productivity, it allows users to efficiently manage tasks across four distinct columns: To Do, In Progress, Review, and Done. Each column is visually distinguished with unique background colors (white, light blue, light yellow, and light green) to provide a clear and engaging user experience.",
      150
    ),
    link: "/images/porto.jpg",
    categories: ["Next.js", "React", "Tailwind CSS"],
    color: "#040e2c",
  },
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-quad",
      once: false,
      offset: 100,
    });
  }, []);

  // Detect mobile device on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsModalOpen(false);
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const targetY = aboutSection.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const duration = 1500;
      const startTime = performance.now();

      const easeOutQuad = (t: number) => t * (2 - t);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        window.scrollTo(0, startY + (targetY - startY) * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <>
      {/* Modal */}
      <InfoModal isOpen={isModalOpen} onClose={closeModal} />

      {/* MARK:Heroes */}
      <section className="min-h-screen overflow-hidden text-white">
        {/* Background Gradient Blue Glow */}
        <div className="flex justify-center overflow-hidden">
          <motion.div
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[20rem] h-[20rem] xs:w-[25rem] xs:h-[25rem] sm:w-[30rem] sm:h-[30rem] md:w-[40rem] md:h-[40rem] lg:w-[60rem] lg:h-[60rem] bg-blue-600/80 blur-[80px] xs:blur-[100px] sm:blur-[120px] md:blur-[150px] lg:blur-[200px] rounded-full -top-[15rem] xs:-top-[18rem] sm:-top-[20rem] md:-top-[25rem] lg:-top-[40rem] -z-10"
          />
        </div>

        <div className="flex items-center justify-center w-full min-h-screen px-4 xs:px-6 sm:px-8 md:items-end md:px-12">
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white/70 drop-shadow-sm max-w-[90%] xs:max-w-[80%] sm:max-w-[70%] md:max-w-[60rem] mx-auto md:mx-0"
            >
              Howdy! Meet your web developers who love creating modern, simple,
              and easy-to-use websites.
            </motion.p>

            <div className="relative w-20 mx-auto my-2 md:mx-0">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="cursor-pointer title text-[16px] xs:text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px] group"
                onClick={scrollToAbout}
              >
                Explore
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all duration-500 group-hover:w-full z-50" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="title text-[40px] xs:text-[50px] sm:text-[60px] md:text-[125px] lg:text-[241px] xl:text-[241px] lg:h-[13rem] leading-none tracking-tighter"
              >
                AchmadGG
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARK:About */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Project Section */}
      <section id="projects" className="relative min-h-screen py-16">
        {/* Glow Gradient Blue */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="flex justify-center">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="absolute w-[30rem] h-[30rem] xs:w-[30rem] xs:h-[30rem] md:w-[50rem] md:h-[50rem] bg-blue-600/90 blur-[100px] md:blur-[180px] rounded-full -bottom-[15rem] md:-bottom-[35rem] z-10"
            />
          </div>
        </div>

        <div data-aos="zoom-in" data-aos-delay="100" id="project">
          <StackingCard projects={projects} />
        </div>
      </section>
    </>
  );
};

export default Home;
