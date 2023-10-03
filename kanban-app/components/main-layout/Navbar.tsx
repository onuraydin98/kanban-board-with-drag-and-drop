"use client"

import { setCookie } from "cookies-next"
import { Menu, LayoutGrid, List } from "lucide-react"
import debounce from "@utilities/debounce"
import { Input } from "@components/ui/input"
import { Separator } from "@components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@components/ui/sheet"
import { Button, ButtonWithIcon } from "@components/ui/button"
import { ModeToggle } from "@components/ToggleTheme"
import {
    type ChangeEvent,
    type SetStateAction,
    type Dispatch,
    useCallback,
} from "react"
import useListStore from "@stores/useListStore"
import generateId from "@utilities/generateId"
import type { ViewType } from "@layouts/MainLayout"

type NavbarProps = {
    viewTypeConfig: [ViewType, Dispatch<SetStateAction<ViewType>>]
}

const SidebarSheet = ({
    button,
}: {
    button: React.ReactElement<HTMLButtonElement>
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{button}</SheetTrigger>
            <SheetContent side={"left"} className="sm:max-w-xs">
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                </SheetHeader>
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
        // TODO: Belki animasyon eklenebilir
        <ButtonWithIcon
            icon={
                viewState === "grid" ? (
                    <List className="h-4 w-4" />
                ) : (
                    <LayoutGrid className="h-4 w-4" />
                )
            }
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
            className="bg-inherit dark:bg-inherit max-md:hidden"
        />
    )
}

const Navbar = ({ viewTypeConfig }: NavbarProps) => {
    const [viewType, setViewType] = viewTypeConfig
    const [lists, addTask] = useListStore(state => [state.lists, state.addTask])
    const generateID = useCallback(() => generateId(), [lists])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || e.target.value.length < 2) return

        console.log("input value", e.target.value) // search algorithm
    }

    return (
        <>
            <div className="relative flex h-16 w-full justify-between px-6 py-3">
                <div className="flex items-center gap-4">
                    <SidebarSheet
                        button={
                            <ButtonWithIcon
                                icon={<Menu className="h-4 w-4" />}
                                variant="ghost"
                                className="px-3 py-0 lg:hidden"
                            />
                        }
                    />
                    <Separator orientation="vertical" className="lg:hidden" />
                    <div className="max-lg:pl-4">
                        <Input
                            placeholder="Search"
                            className="w-40 text-base ring-offset-0 transition-[width,colors] duration-300 focus:w-[calc(100%_-_1rem)] focus-visible:ring-0 dark:border-slate-200 dark:bg-slate-200 dark:text-black dark:ring-offset-0 dark:focus:placeholder-purple-700 sm:w-56 sm:focus-visible:w-96"
                            onChange={debounce(handleSearch, 500)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ViewToggle opts={[viewType, setViewType]} />
                    <ModeToggle />
                    {/* <Button
                    onClick={() => {
                        addTask({ ...defaultTasks[0], id: generateID() })
                    }}
                >
                    Add
                </Button> */}
                </div>
            </div>
            <Separator
                orientation="horizontal"
                className="mx-auto h-[2px] w-[calc(100%_-_2rem)] dark:bg-slate-700"
            />
        </>
    )
}

export default Navbar
