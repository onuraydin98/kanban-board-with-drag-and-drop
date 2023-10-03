import { cn } from "@utilities/cn"
import { MoveLeft } from "lucide-react"

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
        <nav
            className={cn(
                "flex items-center divide-x-2 divide-gray-800 px-6 py-3 transition-[transform,colors]",
            )}
        >
            <a
                href="/"
                className="pr-3 duration-200 ease-linear hover:-translate-x-1 dark:hover:text-slate-300"
            >
                <MoveLeft className="h-5 w-5" />
            </a>

            {links.map(link => (
                <a
                    key={link.title}
                    href={link.slug}
                    className="px-3 duration-200 ease-linear dark:hover:text-slate-300"
                >
                    {link.title}
                </a>
            ))}
        </nav>
    )
}

export default Breadcrumb
