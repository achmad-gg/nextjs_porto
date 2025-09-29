import { FC } from "react";

type IconProps = {
  className?: string;
};

// React Icon
export const ReactIcon: FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" />
    </g>
  </svg>
);

// Next.js Icon
export const NextjsIcon: FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.998 0C5.371 0 0 5.372 0 12c0 6.627 5.371 12 11.998 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12Zm5.72 18.182-6.72-9.505H10v9.505H8.182V5.818h2.432l6.455 9.064V5.818h1.818v12.364h-1.14Z" />
  </svg>
);

// Tailwind CSS Icon
export const TailwindIcon: FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M24 9.5c-6.4 0-10.4 3.2-12 9.5 2.4-3.2 5.2-4.4 8.4-3.6 1.8.5 3.1 1.7 4.6 3.2 2.4 2.5 5.2 5.3 11 5.3 6.4 0 10.4-3.2 12-9.5-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.5-3.1-1.7-4.6-3.2-2.4-2.5-5.2-5.3-11-5.3ZM12 24c-6.4 0-10.4 3.2-12 9.5 2.4-3.2 5.2-4.4 8.4-3.6 1.8.5 3.1 1.7 4.6 3.2 2.4 2.5 5.2 5.3 11 5.3 6.4 0 10.4-3.2 12-9.5-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.5-3.1-1.7-4.6-3.2-2.4-2.5-5.2-5.3-11-5.3Z"
    />
  </svg>
);

// TypeScript Icon
export const TypescriptIcon: FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="256" height="256" fill="currentColor" rx="24" />
    <path
      fill="#fff"
      d="M145 200h23v-17h-23v-63h-19v63h-23v17h23v18c0 10 5 19 23 19h18v-18h-18c-6 0-7-2-7-6v-13Zm75-80c-19 0-31 9-36 26l18 4c2-7 7-11 15-11 7 0 11 3 11 8 0 6-5 8-14 12-12 4-20 10-20 22 0 13 10 22 26 22 12 0 21-5 26-16l-17-6c-2 5-6 7-11 7-6 0-9-3-9-7 0-5 4-7 13-10 13-5 21-11 21-24 0-14-11-27-33-27Z"
    />
  </svg>
);
