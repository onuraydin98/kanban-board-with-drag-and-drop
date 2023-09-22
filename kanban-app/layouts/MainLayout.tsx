"use client"

// TODO: Bu layout'u client'ten kurtarabilir miyiz sonra bak!

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
import { useState, createContext, type PropsWithChildren } from "react"
import { Button, ButtonWithIcon } from "@components/ui/button"
import Navbar from "@components/Navbar"
import { cn } from "@utilities/cn"

import Avatar from "@components/Avatar"
import { Separator } from "@components/ui/separator"

export const ViewContext = createContext<ViewType>("grid")

export type ViewType = "grid" | "list" | null

type NavigationMenu = {
    text: string
    href: string
    icon: React.ReactElement<LucideProps> // WTF - LucideIcon
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

const MainLayout = ({
    viewTypeCookie,
    children,
}: PropsWithChildren<{ viewTypeCookie: string | null }>) => {
    const [viewType, setViewType] = useState<ViewType>(
        (viewTypeCookie as ViewType) ?? "grid",
    )

    return (
        <div className="flex h-full">
            <aside className="fixed flex h-full w-52 flex-col p-3 max-lg:hidden 2xl:w-64 ">
                <div className="flex h-[3.25rem] items-start justify-center gap-1 ">
                    <Kanban className="h-6 w-6" />
                    <h2 className="[line-height:1em]">Board</h2>
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
                                        "w-full items-center justify-start gap-2 text-sm sm:text-base 2xl:text-xl",
                                        element.isActive && "bg-slate-700",
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
                                        "w-full items-center justify-start gap-2 text-sm sm:text-base 2xl:text-xl",
                                        element.isActive && "bg-slate-700",
                                    )}
                                >
                                    <a href={element.href}>{element.text}</a>
                                </ButtonWithIcon>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Separator
                    orientation="horizontal"
                    className="sm my-2 h-[2px] bg-white"
                />
                <div className="w-full">
                    <Button
                        variant="ghost"
                        type="button"
                        className="w-full items-center justify-start gap-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-sm text-transparent sm:text-base 2xl:text-xl"
                    >
                        <Avatar
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        Eric Clarkin
                    </Button>
                </div>
            </aside>
            <div className="ml-52 flex flex-1 flex-col max-lg:ml-0 2xl:ml-64 ">
                <div className="flex h-16 w-full justify-between bg-purple-500 px-6 py-3">
                    <Navbar viewTypeConfig={[viewType, setViewType]} />
                </div>
                <div className="flex flex-1 flex-col">
                    <ViewContext.Provider value={viewType}>
                        {children}
                    </ViewContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
