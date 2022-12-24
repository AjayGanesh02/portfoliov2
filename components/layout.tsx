import NavBar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <NavBar/>
        { children }
        </>
    )
}