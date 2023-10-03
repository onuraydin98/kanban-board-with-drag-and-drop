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
    type LucideProps,
} from "lucide-react"
import { cn } from "@utilities/cn"
import Avatar from "@components/Avatar"
import { Separator } from "@components/ui/separator"
import { Button, ButtonWithIcon } from "@components/ui/button"

type NavigationMenu = {
    text: string
    href: string
    icon: React.ReactElement<LucideProps>
    isActive: boolean
}

const upperNavigationMenu: NavigationMenu[] = [
    {
        text: "Dashboard",
        href: "#dashboard",
        icon: <Home className="h-5 w-5" />,
        isActive: true,
    },
    {
        text: "Feedback",
        href: "#feedback",
        icon: <MessageSquare className="h-5 w-5" />,
        isActive: false,
    },
    {
        text: "Task",
        href: "#task",
        icon: <ListChecks className="h-5 w-5" />,
        isActive: false,
    },
    {
        text: "Roadmap",
        href: "#roadmap",
        icon: <Compass className="h-5 w-5" />,
        isActive: false,
    },
    {
        text: "Changelog",
        href: "#changelog",
        icon: <RefreshCw className="h-5 w-5" />,
        isActive: false,
    },
]

const lowerNavigationMenu: NavigationMenu[] = [
    {
        text: "Invite People",
        href: "#invite",
        icon: <Plus className="h-5 w-5" />,
        isActive: false,
    },
    {
        text: "Help & Comm.",
        href: "#help-community",
        icon: <HelpCircle className="h-5 w-5" />,
        isActive: false,
    },
    {
        text: "Notifications",
        href: "#notifications",
        icon: <BellRing className="h-5 w-5" />,
        isActive: false,
    },
]

const Sidebar = () => {
    return (
        <aside className="fixed flex h-full w-52 flex-col p-3 max-lg:hidden 2xl:w-64">
            <div className="dark:dark-gradient-text-r group flex h-[3.25rem] items-start justify-start gap-1 pl-4 transition-colors hover:text-slate-50">
                <Kanban
                    className={cn(
                        "group-hover:animate-coin-flip h-6 w-6 text-purple-700 delay-200 duration-200 group-hover:text-slate-50",
                        // "rounded-full shadow-[inset_0px_-2px_2px_white]" Ball shadow?
                    )}
                />
                <h2 className="delay-150 duration-150 [line-height:1em]">
                    Board
                </h2>
            </div>
            {/* Navigation Menus */}
            <nav className="flex flex-1 flex-col items-start justify-between">
                <ul className="flex w-full flex-col gap-2">
                    {upperNavigationMenu.map((element, idx) => (
                        <li key={`up-nav-${idx}`}>
                            <ButtonWithIcon
                                icon={element.icon}
                                variant="ghost"
                                key={element.text}
                                type="button"
                                className={cn(
                                    "w-full items-center justify-start gap-2 text-base hover:text-slate-700 dark:hover:text-slate-200",
                                    element.isActive &&
                                        "bg-slate-100 dark:bg-slate-800",
                                )}
                            >
                                <a href={element.href}>{element.text}</a>
                            </ButtonWithIcon>
                        </li>
                    ))}
                </ul>

                <ul className="flex w-full flex-col gap-2">
                    {lowerNavigationMenu.map((element, idx) => (
                        <li key={`down-nav-${idx}`}>
                            <ButtonWithIcon
                                icon={element.icon}
                                variant="ghost"
                                key={element.text}
                                type="button"
                                className={cn(
                                    "w-full items-center justify-start gap-2 text-base hover:text-slate-700 dark:hover:text-slate-200",
                                    element.isActive &&
                                        "bg-slate-100 dark:bg-slate-800",
                                )}
                            >
                                <a href={element.href}>{element.text}</a>
                            </ButtonWithIcon>
                        </li>
                    ))}
                </ul>
            </nav>
            <Separator
                orientation="vertical"
                className="absolute ml-[12.2rem] h-[calc(100%_-_1.8rem)] w-[2px] dark:bg-slate-700 2xl:ml-[15.2rem]"
            />
            <Separator
                orientation="horizontal"
                className="sm my-2 h-[2px] dark:bg-slate-700"
            />
            <div className="w-full">
                <Button
                    variant="ghost"
                    type="button"
                    className="w-full items-center justify-start gap-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-base text-transparent hover:text-slate-700 dark:hover:text-slate-200"
                >
                    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
                    Eric Clarkin
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar
