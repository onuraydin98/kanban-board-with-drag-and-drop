import { MoveLeft } from "lucide-react"
import { cn } from "@utilities/cn"
import { Separator } from "@components/ui/separator"

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

const Breadcrumb = () => {
    return (
        <>
            <nav
                className={cn(
                    "flex items-center divide-x-2 divide-slate-800 px-6 py-3 transition-[transform,colors]",
                )}
            >
                <a
                    href="/"
                    className="pr-3 duration-200 ease-linear hover:-translate-x-1 hover:text-indigo-400 dark:hover:text-teal-600"
                >
                    <MoveLeft className="h-5 w-5" />
                </a>

                {links.map(link => (
                    <a
                        key={link.title}
                        href={link.slug}
                        className="px-3 duration-200 ease-linear hover:text-indigo-400 dark:hover:text-teal-600"
                    >
                        {link.title}
                    </a>
                ))}
            </nav>
            <Separator
                orientation="horizontal"
                className="mx-auto h-[2px] w-[calc(100%_-_2rem)] bg-gradient-to-r from-indigo-400 to-slate-50 dark:from-slate-100 dark:to-slate-800"
            />
        </>
    )
}

export default Breadcrumb
