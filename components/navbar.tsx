import Link from "next/link"
import { navLinks } from "../src/data"

export default function NavBar() {
    return (
        <div className="flex flex-col sticky left-0 w-1/6">
            <div>
                <h1 className="p-8">Ajay Ganesh</h1>
            </div>
            <ul className="list-none m-0 p-0 overflow-hidden flex flex-col items-center justify-center">
                {navLinks.map((link) => (
                    <li key={link.name} className="float-left p-8">
                        <Link href={link.path}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}