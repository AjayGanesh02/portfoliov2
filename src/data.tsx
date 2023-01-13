import { FaCode } from "react-icons/fa"
import { SiAboutdotme } from "react-icons/si"
import { MdContactPage } from "react-icons/md"
import { BsFillPencilFill } from "react-icons/bs"
import { AiFillHome } from "react-icons/ai"


export const navLinks = [
    { name: "Home", 
     path: "/",
     icon: <AiFillHome/>
    },
    {
      name: "About Me",
      path: "/#about",
      icon: <SiAboutdotme/>
    },
    {
        name: "Projects",
        path: "/#projects",
        icon: <FaCode/>,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <BsFillPencilFill/>
    },
    {
      name: "Contact Me",
      path: "#contact",
      icon: <MdContactPage/>
    },
  ];