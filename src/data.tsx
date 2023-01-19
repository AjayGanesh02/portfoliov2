import { FaCode } from "react-icons/fa"
import { SiAboutdotme } from "react-icons/si"
import { MdContactPage } from "react-icons/md"
import { BsFillPencilFill } from "react-icons/bs"
import { IoMdContact } from "react-icons/io"
import { AiFillHome, AiFillLinkedin, AiFillGithub } from "react-icons/ai"


export const navLinks = [
    { name: "Home", 
     path: "/",
     icon: <AiFillHome size={"1.5em"}/>
    },
    {
      name: "About Me",
      path: "/#about",
      icon: <SiAboutdotme size={"1.5em"}/>
    },
    {
        name: "Projects",
        path: "/#projects",
        icon: <FaCode size={"1.5em"}/>,
    },
    // {
    //   name: "Blog",
    //   path: "/blog",
    //   icon: <BsFillPencilFill size={"1.5em"}/>
    // },
    {
      name: "Contact Me",
      path: "#contact",
      icon: <IoMdContact size={"1.5em"}/>
    },
    {
      name: "Github",
      path: "https://github.com/AjayGanesh02",
      icon: <AiFillGithub size={"1.5em"}/>
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/ajay-ganesh/",
      icon: <AiFillLinkedin size={"1.5em"}/>
    },
    {
      name: "Resume",
      path: "https://drive.google.com/file/d/16OfwHaL3uAmaRH4SUelHejZcd977_-Wj/view?usp=share_link",
      icon: <MdContactPage size={"1.5em"}/>
    }
  ];