export const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Articles", href: "/articles" },
  { name: "About", href: "/about" },
];

import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiStackoverflow, SiDevdotto } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io5";

export const socialNavigation = [
  { name: "GitHub", Icon: AiFillGithub, href: "https://github.com/BerenBoden" },
  {
    name: "LinkedIn",
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/beren-b-5766ba1a0/",
  },
  {
    name: "Stack Overflow",
    Icon: SiStackoverflow,
    href: "https://stackoverflow.com/users/12826492/berenboden",
  },
  { name: "Dev.to", Icon: SiDevdotto, href: "" },
  {
    name: "Youtube",
    Icon: IoLogoYoutube,
    href: "https://www.youtube.com/channel/UCoNZkBNKW6bI-luin6TdhpA",
  },
];
