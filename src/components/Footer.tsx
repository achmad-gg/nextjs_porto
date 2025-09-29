import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SocialLinks } from "@/components/ui/social-links";

const socials = [
  {
    name: "Instagram",
    image: "https://link-hover-lndev.vercel.app/instagram.png",
    link: "https://www.instagram.com/achmadqt?igsh=MW5tbnI2c2h4amZsaA=="
  },
  {
    name: "LinkedIn",
    image: "https://link-hover-lndev.vercel.app/linkedin.png",
  },
  // {
  //   name: "Spotify",
  //   image: "https://link-hover-lndev.vercel.app/spotify.png",
  // },
  {
    name: "TikTok",
    image: "https://link-hover-lndev.vercel.app/tiktok.png",

  },
];

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 text-white border-t border-gray-700">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto sm:px-6 lg:px-8">
        {/* Social Media Links */}
        <SocialLinks socials={socials} className="hidden mt-5 md:flex" />

        {/* Social links mobile  */}
        <div className="flex gap-2 md:hidden">
          <a href="https://www.instagram.com/achmadqt?igsh=MW5tbnI2c2h4amZsaA==" className="transition-all title hover:text-blue-500 focus:-scale-75">Instagram</a>
        </div>

        {/* Copyright Text */}
        <p className="my-5 text-sm text-center">
          &copy; {new Date().getFullYear()} Portofolio's Achmad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
