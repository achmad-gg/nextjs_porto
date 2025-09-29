"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef, forwardRef } from "react";

interface ProjectData {
  title: string;
  description: string;
  link: string;
  categories: string[];
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  categories: string[];
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  categories,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky flex items-center justify-center h-screen top-10"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 20}px)`,
        }}
        className={`flex flex-col relative h-[300px] -top-[25%] md:h-[400px] lg:h-[550px] w-[90%] md:w-[70%] rounded-md p-6 md:p-10 origin-top`}
      >
        <h2 className="font-semibold text-center text-md lg:text-2xl md:text-lg">
          {title}
        </h2>
        <div
          className={`flex flex-col md:flex-row h-full mt-3 md:mt-5 gap-3 md:gap-10`}
        >
          <div className={`w-full md:w-[40%] relative`}>
            <p className="text-xs text-justify md:text-sm">{description}</p>
            <div className="inline-block group">
              <span className="flex items-center gap-2 pt-1">
                <a
                  href={url}
                  target="_blank"
                  className="text-xs underline cursor-pointer md:text-sm"
                >
                  See more
                </a>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 -rotate-[40deg] group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="white"
                  />
                </svg>
              </span>

              <div className="grid grid-cols-1 gap-3 my-2 sm:grid-cols-2 md:grid-cols-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={`${category}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="items-center justify-center hidden px-3 py-1 text-xs text-center text-white transition-all duration-300 border border-gray-700 rounded-sm md:flex bg-gray-800/50 sm:text-sm hover:bg-gray-700/70"
                    role="listitem"
                    aria-label={`Category: ${category}`}
                  >
                    <span>{category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className={`relative w-full h-full rounded-lg overflow-hidden`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img
                src={url}
                alt={`${title} project image`}
                className="absolute inset-0 object-cover w-full h-full md:object-fill"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects }, ref) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "end end"],
    });

    return (
      <ReactLenis root>
        <main ref={container}>
          <section className="text-white h-[5vh] md:h-[20vh] w-full grid place-content-center">
            <h1 className="md:text-4xl lg:text-6xl text-3xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              This is the projects <br /> I&apos;ve worked on
            </h1>
            <h2 className="flex justify-center mt-5 text-xl">Scroll it!</h2>
          </section>

          <section className="w-full text-white">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.05;

              return (
                <Card
                  key={`p_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  color={project.color}
                  description={project.description}
                  categories={project.categories}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </section>
        </main>
      </ReactLenis>
    );
  }
);

Component.displayName = "Component";

export default Component;
