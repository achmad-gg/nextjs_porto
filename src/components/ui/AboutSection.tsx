import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const AboutSection = () => {
  // Refs for sections to detect when in view
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stackRef = useRef(null);
  const specialPlaceRef = useRef(null);

  // UseInView hooks
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const descriptionInView = useInView(descriptionRef, { once: true, margin: "-100px" });
  const stackInView = useInView(stackRef, { once: true, margin: "-100px" });
  const specialPlaceInView = useInView(specialPlaceRef, { once: true, margin: "-100px" });

  // Variants for fade-up animation similar to AOS
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  // Stagger container for stack items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  // Globe variants with scale and rotation
  const globeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeInOut" as const } },
    hover: { rotate: 360, transition: { duration: 10, repeat: Infinity, ease: "linear" as const } },
  };

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      <div className="px-5 mx-auto md:px-16 lg:px-28">
        {/* Title */}
        <div className="pt-20" ref={titleRef}>
          <motion.h2
            variants={fadeUpVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            className="mb-6 text-5xl font-extrabold lg:text-7xl"
          >
            About me.
          </motion.h2>

          {/* Description */}
          <div className="flex items-start gap-4" ref={descriptionRef}>
            <motion.div
              initial={{ height: 0 }}
              animate={descriptionInView ? { height: 80 } : { height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              className="w-1.5 bg-blue-600 rounded"
            />
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate={descriptionInView ? "visible" : "hidden"}
              className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
            >
              Developing beautiful and functional websites is what I love doing,
              and that’s why I give my all in every new challenge.
            </motion.p>
          </div>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2">
          {/* My Stack */}
          <div ref={stackRef}>
            <motion.h3
              variants={fadeUpVariants}
              initial="hidden"
              animate={stackInView ? "visible" : "hidden"}
              className="mb-6 text-2xl font-semibold"
            >
              My Stack.
            </motion.h3>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              animate={stackInView ? "visible" : "hidden"}
            >
              {[
                "Tailwindcss",
                "React",
                "Next Js",
                "Vue Js",
                "Nuxt Js",
                "Team Player",
                "JavaScript",
                "PostgreSQL",
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SpotlightCard
                    className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-100 shadow-sm cursor-pointer rounded-xl hover:bg-purple-50"
                    spotlightColor="oklch(0.488 0.243 264.376)"
                  >
                    {item}
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* My Special Place */}
          <div ref={specialPlaceRef}>
            <motion.h3
              variants={fadeUpVariants}
              initial="hidden"
              animate={specialPlaceInView ? "visible" : "hidden"}
              className="mb-6 text-2xl font-semibold"
            >
              My Special Place.
            </motion.h3>
            <motion.div
              className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-xl"
              variants={globeVariants}
              initial="hidden"
              animate={specialPlaceInView ? "visible" : "hidden"}
            >
              {/* Ganti dengan globe 3D/animasi nanti */}
              <span className="text-gray-500">[ Globe Placeholder ]</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;