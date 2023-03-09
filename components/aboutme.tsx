import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
export default function AboutMe() {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    if (clicks == 5) {
      console.log("running");
      fetch("/api/lights");
      setClicks(clicks + 1);
    }
  }, [clicks]);
  return (
    <div className="about justify-center text-center">
      <div className="pb-4">
        <div className="flex flex-col items-center justify-center text-center md:flex-row">
          <a id="about"></a>
          <Link href="/">
            <div
              className="hover-state relative my-4 h-40 w-40 overflow-hidden 
            rounded-md border
          border-white
          md:right-6 md:px-20"
            >
              <Image
                src="https://portfolio-images-ajayganesh.s3.us-east-2.amazonaws.com/AJGProPhoto.JPG"
                alt="Pro Headshot"
                fill={true}
                className="object-cover"
                sizes="15vw"
              />
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div
              className="flex items-center justify-center"
              onClick={() => setClicks(clicks + 1)}
            >
              <h1 className=" text-5xl font-bold">
                Ajay Ganesh
              </h1>
            </div>
            <p className="text-gray-500">he/him/his</p>
            <h1 className="font-semibold">
            <TypeIt
              options={{
                strings: [
                  "University of Michigan CS Student",
                  "Software Engineer",
                  "Fullstack Developer",
                  "Mobile Developer",
                  "Security Engineer",
                ],
                breakLines: false,
                loop: true,
              }}
              />
              </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
