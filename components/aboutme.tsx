import TypeIt from "typeit-react";
export default function AboutMe() {

  return (
    <div className="about justify-center text-center">
      <div className="pb-4">
        <h1 className="text-5xl pb-4">Ajay Ganesh</h1>
        <TypeIt options={{
          strings: ["University of Michigan CS Student", "Software Engineer", "Fullstack Developer", "Mobile Developer"],
          breakLines: false,
          loop: true
        }}/>
      </div>
      <p>
        Hello! I&apos;m a junior at the University of Michigan studying Computer
        Science. I&apos;m super passionate about Software Engineering, and
        I&apos;d love to share that passion with you! On this site, you can find
        projects that I&apos;ve worked on and code that I&apos;m experimenting
        with.
      </p>
    </div>
  );
}
