import { cn } from "@utilities/cn"

const links = [
    {
        slug: "/",
        title: "Home",
    },
    {
        slug: "/",
        title: "Dashboard",
    },
    {
        slug: "/",
        title: "Epic",
    },
]

// export interface Breadcrumb extends React.HTMLAttributes<HTMLDivElement> {}

const Breadcrumb = () => {
    return (
        <nav className={cn("flex gap-4 divide-x-2 divide-gray-800 px-6 py-3")}>
            {links.map(link => (
                <a
                    key={link.slug}
                    href={link.slug}
                    className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                >
                    {link.title}
                </a>
            ))}
        </nav>
    )
}

export default Breadcrumb
