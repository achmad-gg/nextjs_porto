"use client";

import React, { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";

// Dynamically import framer-motion to reduce bundle size
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
  }
);

type IconType =
  | "nextjs"
  | "nuxtjs"
  | "javascript"
  | "react"
  | "node"
  | "tailwind";
type GlowColor = "cyan" | "blue";

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
  scale: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
  scale: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<
  IconType,
  { component: () => React.JSX.Element; color: string }
> = {
  nextjs: {
    component: () => (
      <svg viewBox="0 0 180 180" fill="currentColor" className="w-full h-full">
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path
            d="M149.508 157.52L69.744 54H54V125.96h12.696V70.72l72.276 95.36h10.536z"
            fill="white"
          />
          <path d="M115.5 54H103v72h12.5V54z" fill="white" />
        </g>
      </svg>
    ),
    color: "#fff",
  },
  nuxtjs: {
    component: () => (
      <img src="/nuxt.svg" alt="Nuxt Logo" className="w-full h-full" />
    ),
    color: "#1572B6",
  },
  javascript: {
    component: () => (
      <img src="/vue.svg" alt="Vue Logo" className="w-full h-full" />
    ),
    color: "#339933",
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            transform="rotate(120 12 12)"
          />
        </g>
      </svg>
    ),
    color: "#61DAFB",
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path
          d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z"
          fill="#339933"
        />
      </svg>
    ),
    color: "#339933",
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    ),
    color: "#06B6D4",
  },
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = "SkillIcon";

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  {
    id: "nextjs",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "nextjs",
    phaseShift: 0,
    glowColor: "cyan",
    label: "Next.Js",
  },
  {
    id: "nuxtjs",
    orbitRadius: 100,
    size: 45,
    speed: 1,
    iconType: "nuxtjs",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Nuxt.Js",
  },
  {
    id: "javascript",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "javascript",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Vue.js",
  },
  // Outer Orbit
  {
    id: "react",
    orbitRadius: 180,
    size: 50,
    speed: -0.6,
    iconType: "react",
    phaseShift: 0,
    glowColor: "blue",
    label: "React",
  },
  {
    id: "node",
    orbitRadius: 180,
    size: 45,
    speed: -0.6,
    iconType: "node",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "blue",
    label: "Node.Js",
  },
  {
    id: "tailwind",
    orbitRadius: 180,
    size: 40,
    speed: -0.6,
    iconType: "tailwind",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "blue",
    label: "Tailwind CSS",
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle, scale }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const scaledSize = Math.max(25, Math.min(50, size * scale)); // Batas ukuran
  const scaledRadius = orbitRadius * scale; // Radius responsif
  const x = Math.cos(angle) * scaledRadius;
  const y = Math.sin(angle) * scaledRadius;

  return (
    <div
      className="absolute transition-all duration-300 ease-out top-1/2 left-1/2"
      style={{
        width: `${scaledSize}px`,
        height: `${scaledSize}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center md:justify-end
          transition-all duration-300 cursor-pointer
          ${isHovered ? "scale-125 shadow-2xl" : "shadow-lg hover:shadow-xl"}
        `}
        style={{
          padding: `${Math.max(2, scaledSize * 0.1)}px`,
          boxShadow: isHovered
            ? `0 0 ${Math.min(30, scaledSize * 0.75)}px ${
                iconComponents[iconType]?.color
              }40, 0 0 ${Math.min(60, scaledSize * 1.5)}px ${
                iconComponents[iconType]?.color
              }20`
            : undefined,
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div
            className="absolute z-30 px-2 py-1 text-white -translate-x-1/2 rounded pointer-events-none -bottom-10 left-1/2 bg-gray-900/95 backdrop-blur-sm whitespace-nowrap"
            style={{
              fontSize: `${Math.max(10, scaledSize * 0.25)}px`,
              bottom: `-${Math.max(32, scaledSize * 0.8)}px`,
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = "OrbitingSkill";

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(
  ({
    radius,
    glowColor = "cyan",
    animationDelay = 0,
    scale,
  }: GlowingOrbitPathProps) => {
    const glowColors = {
      cyan: {
        primary: "rgba(103, 232, 249, 0.4)",
        secondary: "rgba(103, 232, 249, 0.2)",
        border: "rgba(103, 232, 249, 0.3)",
      },
      blue: {
        primary: "rgba(59, 130, 246, 0.4)",
        secondary: "rgba(59, 130, 246, 0.2)",
        border: "rgba(59, 130, 246, 0.3)",
      },
    };

    const colors = glowColors[glowColor] || glowColors.cyan;
    const scaledRadius = radius * scale;

    return (
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none top-1/2 left-1/2"
        style={{
          width: `${scaledRadius * 2}px`,
          height: `${scaledRadius * 2}px`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        {/* Glowing background */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
            boxShadow: `0 0 ${Math.min(60, scaledRadius * 0.33)}px ${
              colors.primary
            }, inset 0 0 ${Math.min(60, scaledRadius * 0.33)}px ${
              colors.secondary
            }`,
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: `${animationDelay}s`,
          }}
        />

        {/* Static ring for depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${colors.border}`,
            boxShadow: `inset 0 0 ${Math.min(20, scaledRadius * 0.11)}px ${
              colors.secondary
            }`,
          }}
        />
      </div>
    );
  }
);
GlowingOrbitPath.displayName = "GlowingOrbitPath";

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 450,
    height: 450,
  });

  // Calculate responsive scale based on container size
  const getScale = () => {
    const baseSize = 450;
    const currentSize = Math.min(containerSize.width, containerSize.height);
    return Math.max(0.3, Math.min(1, currentSize / baseSize)); // Minimum scale of 0.3
  };

  const scale = getScale();

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (vw < 640) {
          // Mobile: scale based on 25% of viewport width with a lower minimum
          const size = Math.max(90, vw * 0.4); 
          setContainerSize({ width: size, height: size });
        } else if (vw < 768) {
          // Tablet: scale based on 50% of viewport width
          const size = Math.max(100, vw * 0.5);
          setContainerSize({ width: size, height: size });
        } else {
          // Desktop: fixed size with maximum scale
          setContainerSize({ width: 600, height: 550 });
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{
    radius: number;
    glowColor: GlowColor;
    delay: number;
  }> = [
    { radius: 100, glowColor: "cyan", delay: 0 },
    { radius: 180, glowColor: "blue", delay: 1.5 },
  ];

  const centralIconSize = Math.max(50, 80 * scale);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden md:justify-end">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central "Code" Icon with enhanced glow */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full shadow-2xl bg-gradient-to-br from-gray-700 to-gray-900"
          style={{
            width: `${centralIconSize}px`,
            height: `${centralIconSize}px`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"
            style={{
              filter: `blur(${Math.max(8, centralIconSize * 0.15)}px)`,
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse"
            style={{
              animationDelay: "1s",
              filter: `blur(${Math.max(12, centralIconSize * 0.2)}px)`,
            }}
          ></div>
          <div className="relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={Math.max(24, centralIconSize * 0.45)}
              height={Math.max(24, centralIconSize * 0.45)}
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
            scale={scale}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
              scale={scale}
            />
          );
        })}
      </div>
    </div>
  );
}
