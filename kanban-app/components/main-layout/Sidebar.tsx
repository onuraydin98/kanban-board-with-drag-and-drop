import {
    Mail,
    Kanban,
    Home,
    MessageSquare,
    ListChecks,
    Compass,
    RefreshCw,
    Plus,
    HelpCircle,
    BellRing,
    LucideIcon,
} from "lucide-react"
import { cn } from "@utilities/cn"
import Avatar from "@components/Avatar"
import { Separator } from "@components/ui/separator"
import { Button, buttonVariants } from "@components/ui/button"

export type NavigationMenu = {
    text: string
    href: string
    Icon: LucideIcon
    isActive: boolean
}

export const upperNavigationMenu: NavigationMenu[] = [
    {
        text: "Dashboard",
        href: "#dashboard",
        Icon: Home,
        isActive: true,
    },
    {
        text: "Feedback",
        href: "#feedback",
        Icon: MessageSquare,
        isActive: false,
    },
    {
        text: "Task",
        href: "#task",
        Icon: ListChecks,
        isActive: false,
    },
    {
        text: "Roadmap",
        href: "#roadmap",
        Icon: Compass,
        isActive: false,
    },
    {
        text: "Changelog",
        href: "#changelog",
        Icon: RefreshCw,
        isActive: false,
    },
]

export const lowerNavigationMenu: NavigationMenu[] = [
    {
        text: "Invite People",
        href: "#invite",
        Icon: Plus,
        isActive: false,
    },
    {
        text: "Help & Comm.",
        href: "#help-community",
        Icon: HelpCircle,
        isActive: false,
    },
    {
        text: "Notifications",
        href: "#notifications",
        Icon: BellRing,
        isActive: false,
    },
]

const Sidebar = () => {
    return (
        <aside className="group fixed flex h-full w-52 flex-col bg-indigo-200 p-3 dark:bg-slate-900 max-lg:hidden 2xl:w-64">
            <div className="dark:dark-gradient-text-r gradient-text-r flex h-[3.25rem] items-start justify-start gap-1 pl-4 transition-colors hover:text-slate-800 dark:hover:text-slate-50">
                <Kanban
                    className={cn(
                        "h-6 w-6 text-indigo-400 delay-200 duration-200 group-hover:animate-3d-flip group-hover:text-slate-800 dark:text-teal-600 dark:group-hover:text-slate-50",
                    )}
                />
                <h2 className="delay-150 duration-150 [line-height:1em] group-hover:text-slate-800 dark:group-hover:text-slate-50">
                    Board
                </h2>
            </div>
            {/* Navigation Menus */}
            <nav className="flex flex-1 flex-col items-start justify-between">
                <ul className="flex w-full flex-col gap-2">
                    {upperNavigationMenu.map((element, idx) => (
                        <li key={`up-nav-${idx}`}>
                            <a
                                href={element.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full items-center justify-start gap-2 text-base hover:text-indigo-400 dark:hover:text-teal-600",
                                    element.isActive &&
                                        "bg-slate-100 text-indigo-400 dark:bg-slate-800 dark:text-slate-100",
                                )}
                            >
                                <element.Icon className="h-5 w-5" />
                                {element.text}
                            </a>
                        </li>
                    ))}
                </ul>

                <ul className="flex w-full flex-col gap-2">
                    {lowerNavigationMenu.map((element, idx) => (
                        <li key={`down-nav-${idx}`}>
                            <a
                                href={element.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full items-center justify-start gap-2 text-base hover:text-indigo-400 dark:hover:text-teal-600",
                                    element.isActive &&
                                        "bg-slate-100 text-indigo-400 dark:bg-slate-800 dark:text-slate-100",
                                )}
                            >
                                <element.Icon className="h-5 w-5" />
                                {element.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <Separator
                orientation="vertical"
                className="absolute ml-[12.2rem] w-[1px] -translate-y-[0.8rem] bg-gradient-to-t from-indigo-400 to-slate-50 dark:from-slate-800 dark:to-slate-100 2xl:ml-[15.2rem]"
            />
            <Separator
                orientation="horizontal"
                className="sm my-2 h-[2px] bg-gradient-to-r from-slate-50 to-indigo-400 dark:from-slate-800 dark:to-slate-100"
            />
            <div className="group/user w-full">
                <Button
                    variant="ghost"
                    type="button"
                    className="w-full items-center justify-start gap-2 bg-gradient-to-r from-indigo-400 to-slate-900 bg-clip-text text-base text-transparent hover:text-slate-700 dark:from-teal-600 dark:to-slate-100 dark:hover:text-slate-100"
                >
                    <Avatar
                        src="https://avatars.githubusercontent.com/u/32241352?s=400&u=4882818a0b850c5a51b5223dfbe766583d659365&v=4"
                        alt="@onuraydin98"
                        className="group-hover/user:outline-slate-900 group-hover/user:dark:outline-slate-100"
                    />
                    Onur Aydin
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar
