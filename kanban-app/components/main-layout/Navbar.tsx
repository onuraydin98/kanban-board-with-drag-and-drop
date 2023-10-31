"use client"

import { setCookie } from "cookies-next"
import { Menu, LayoutGrid, List, Kanban, PlusIcon } from "lucide-react"

import type { ViewType } from "@layouts/MainLayout"
import { Input } from "@components/ui/input"
import { Separator } from "@components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@components/ui/sheet"
import { Button, buttonVariants } from "@components/ui/button"
import { ModeToggle } from "@components/ToggleTheme"
import {
    type ChangeEvent,
    type SetStateAction,
    type Dispatch,
    useState,
} from "react"
import { upperNavigationMenu, lowerNavigationMenu } from "./Sidebar"
import Avatar from "@components/Avatar"
import TaskModal from "@components/TaskModal"
import debounce from "@utilities/debounce"
import { cn } from "@/utilities/cn"
import type { DialogProps } from "@radix-ui/react-dialog"

interface SidebarSheetProps extends DialogProps {}

type NavbarProps = {
    viewTypeConfig: [ViewType, Dispatch<SetStateAction<ViewType>>]
}

const SidebarSheet = ({ open, onOpenChange }: SidebarSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={"left"} className="flex flex-col sm:max-w-xs">
                <SheetHeader>
                    <SheetTitle className="flex items-start justify-start gap-1 pl-4">
                        {" "}
                        <Kanban className="h-6 w-6 text-indigo-400 dark:text-teal-600" />
                        <p className="dark:dark-gradient-text-r gradient-text-r text-[1.5rem] font-bold">
                            Board
                        </p>
                    </SheetTitle>
                </SheetHeader>
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
                    orientation="horizontal"
                    className="sm my-2 h-[2px] bg-gradient-to-r from-slate-50 to-indigo-400 dark:from-slate-900 dark:to-teal-600"
                />
                <SheetFooter>
                    <div className="group/user w-full">
                        <Button
                            variant="ghost"
                            type="button"
                            className="w-full items-center justify-start gap-2 bg-gradient-to-r from-slate-400 to-indigo-800 bg-clip-text text-base text-transparent hover:text-slate-700 dark:from-teal-600 dark:to-slate-100 dark:hover:text-slate-100"
                        >
                            <Avatar
                                src="https://avatars.githubusercontent.com/u/32241352?s=400&u=4882818a0b850c5a51b5223dfbe766583d659365&v=4"
                                alt="@onuraydin98"
                                className="group-hover/user:outline-slate-900 group-hover/user:dark:outline-slate-100"
                            />
                            Onur Aydin
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

const ViewToggle = ({
    opts,
}: {
    opts: [ViewType, Dispatch<SetStateAction<ViewType>>]
}) => {
    const [viewState, setState] = [...opts]
    const viewType = viewState === "grid" ? "list" : "grid"

    return (
        <Button
            onClick={() => {
                setCookie("viewType", viewType, {
                    maxAge: 7900000,
                })
                setState(prev => {
                    if (prev === "grid") return "list"
                    return "grid"
                })
            }}
            variant="outline"
            type="button"
            size="icon"
            className="bg-inherit dark:bg-inherit max-md:hidden"
        >
            {viewState === "grid" ? (
                <List className="h-4 w-4" />
            ) : (
                <LayoutGrid className="h-4 w-4" />
            )}
        </Button>
    )
}

const Navbar = ({ viewTypeConfig }: NavbarProps) => {
    const [viewType, setViewType] = viewTypeConfig
    const [openTaskModal, setOpenTaskModal] = useState(false)
    const [openSidebarSheet, setOpenSidebarSheet] = useState(false)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || e.target.value.length < 2) return

        console.log("input value", e.target.value) // Search Algorithm
    }

    return (
        <>
            <div className="relative flex h-16 w-full justify-between px-6 py-3">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="bg-inherit px-3 py-0 dark:bg-inherit lg:hidden"
                        onClick={() => setOpenSidebarSheet(true)}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                    <SidebarSheet
                        open={openSidebarSheet}
                        onOpenChange={setOpenSidebarSheet}
                    />
                    <Separator
                        orientation="vertical"
                        className="bg-gradient-to-t dark:from-slate-800 dark:to-slate-100 lg:hidden"
                    />
                    <div className="max-lg:pl-4">
                        <Input
                            placeholder="Search"
                            className="w-40 bg-indigo-100 text-base ring-offset-0 transition-all duration-300 placeholder:text-dark focus-visible:w-[calc(100%_-_1rem)] focus-visible:bg-indigo-400 focus-visible:text-slate-50 focus-visible:ring-0 focus-visible:placeholder:text-slate-50 dark:border-slate-100 dark:bg-inherit dark:bg-teal-900 dark:ring-offset-0 dark:placeholder:text-slate-100 dark:focus-visible:bg-slate-200 dark:focus-visible:text-black dark:focus-visible:placeholder:text-black sm:w-56 sm:focus-visible:w-96"
                            onChange={debounce(handleSearch, 500)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="dark:bg-inherit"
                        onClick={() => setOpenTaskModal(true)}
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                    <TaskModal
                        open={openTaskModal}
                        onOpenChange={setOpenTaskModal}
                    />
                    <ViewToggle opts={[viewType, setViewType]} />
                    <ModeToggle />
                </div>
            </div>
            <Separator
                orientation="horizontal"
                className="mx-auto h-[2px] w-[calc(100%_-_2rem)] bg-gradient-to-r from-slate-50 to-indigo-400 dark:from-slate-800 dark:to-slate-100"
            />
        </>
    )
}

export default Navbar
