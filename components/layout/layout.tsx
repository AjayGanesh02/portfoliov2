import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pl-4 pt-24 md:pt-16 md:pt-16 md:pl-24">
      <NavBar />
      {children}
    </div>
  );
}
