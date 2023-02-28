import Image from "next/image";
import TypeIt from "typeit-react";
export default function AboutMe() {
  return (
    <div className="about justify-center text-center">
      <div className="pb-4">
        <div className="flex flex-col items-center justify-center text-center md:flex-row">
          <a id="about"></a>
          <div
            className="hover-state relative my-4 h-40 w-40 overflow-hidden 
            rounded-md border
          border-white
          md:right-6 md:px-20"
          >
            <Image
              src="https://portfolio-images-ajayganesh.s3.us-east-2.amazonaws.com/AJGProPhoto.JPG"
              alt="Pro Headshot"
              // width={100}
              // height={100}
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col content-center items-center text-center gap-4">
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
      <p className="mr-6 md:mr-0">
        Hello! I&apos;m a junior at the University of Michigan studying Computer
        Science. I&apos;m super passionate about Software Engineering, and
        I&apos;d love to share that passion with you! On this site, you can find
        projects that I&apos;ve worked on and code that I&apos;m experimenting
        with.
      </p>
    </div>
  );
}
