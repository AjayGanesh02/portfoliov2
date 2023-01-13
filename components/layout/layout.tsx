import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex pl-24">
        <NavBar/>
        { children }
        </div>
    )
}