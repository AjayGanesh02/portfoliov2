import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
        <NavBar/>
        { children }
        </div>
    )
}