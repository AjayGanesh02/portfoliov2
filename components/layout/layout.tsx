import AboutMe from "../aboutme";
import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <NavBar />
      <main className="flex flex-col items-center justify-center bg-neutral-900 pt-24 md:pt-16 md:pl-24">
        <div className="h-full w-full p-8 md:w-2/3">
          <AboutMe />
          {children}
        </div>
      </main>
    </div>
  );
}
