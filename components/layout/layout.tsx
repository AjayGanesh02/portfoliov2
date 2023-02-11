import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pt-24 md:pt-16 md:pt-16 md:pl-24 bg-gray-800">
      <NavBar />
      {children}
    </div>
  );
}
