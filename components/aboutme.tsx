import Image from "next/image";
import Link from "next/link";
import TypeIt from "typeit-react";
export default function AboutMe() {
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
              />
            </div>
          </Link>
          <div className="flex flex-col content-center items-center gap-4 text-center">
            <h1 className="text-5xl">Ajay Ganesh</h1>
            <p className="text-gray-500">he/him/his</p>
            <TypeIt
              options={{
                strings: [
                  "University of Michigan CS Student",
                  "Software Engineer",
                  "Fullstack Developer",
                  "Mobile Developer",
                ],
                breakLines: false,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
