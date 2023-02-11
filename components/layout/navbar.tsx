import Link from "next/link";
import { navLinks } from "../../src/data";

export default function NavBar() {
  return (
    <div
      className="fixed top-0 left-0 z-10 m-0 flex h-16 w-full flex-row
                        justify-center bg-gray-800 md:bg-inherit text-center
                        text-white shadow-md md:h-full md:w-16 md:flex-col"
    >
      {navLinks.map((link) => (
        <NavBarIcon
          key={link.name}
          icon={link.icon}
          name={link.name}
          path={link.path}
        />
      ))}
    </div>
  );
}

const NavBarIcon = ({
  icon,
  name,
  path,
}: {
  icon: React.ReactNode;
  name: string;
  path: string;
}) => (
  <Link href={path}>
    <div className="sidebar-icon group">
      <div key={name}>{icon}</div>
      <span className="sidebar-tooltip md:group-hover:scale-100">{name}</span>
    </div>
  </Link>
);
