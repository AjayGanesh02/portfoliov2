import Link from "next/link"
import { navLinks } from "../../src/data"

export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 text-center
                        flex flex-col
                        bg-gray-700 text-white shadow-md">
            <ul className="">
                {navLinks.map((link) => (
                    <NavBarIcon key={link.name} icon={link.icon} name={link.name} path={link.path} />
                ))}
            </ul>
        </div>
    )
}

const NavBarIcon = ({ icon, name, path }: { icon: React.ReactNode, name: string, path: string }) => (
    <Link href={path}>
        <div className="sidebar-icon group">
            <li key={name}>
                {icon}
            </li>
            <span className="sidebar-tooltip group-hover:scale-100">
                {name}
            </span>
        </div>
    </Link>
);