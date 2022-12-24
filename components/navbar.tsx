import Link from "next/link"
import { navLinks } from "../src/data"

export default function NavBar() {
    return (
        <div className="flex flex-row sticky top-0">
            <div>
                <h1 className="p-8">Ajay Ganesh</h1>
            </div>
            <ul className="list-none m-0 p-0 overflow-hidden">
                {navLinks.map((link) => (
                    <li key={link.name} className="inline-block float-left p-8">
                        <Link href={link.path}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}