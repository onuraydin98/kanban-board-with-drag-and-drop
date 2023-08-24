"use client"

import { Mail, Menu, LayoutGrid, List } from "lucide-react"
import {
    useState,
    type PropsWithChildren,
    type ChangeEvent,
    type SetStateAction,
    type Dispatch,
    createContext,
} from "react"
import debounce from "@/utilities/debounce"
import { ModeToggle } from "@components/ToggleTheme"
import { ButtonWithIcon } from "@components/ui/button"
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
import { setCookie } from "cookies-next"

export const ViewContext = createContext<ViewType>("grid")

export type ViewType = "grid" | "list" | undefined

const ViewToggle = ({
    opts,
}: {
    opts: [ViewType, Dispatch<SetStateAction<ViewType>>]
}) => {
    const [viewState, setState] = [...opts]
    const viewType = viewState === "grid" ? "list" : "grid"

    return (
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
                setState((prev) => {
                    if (prev === "grid") return "list"
                    return "grid"
                })
            }}
            variant="outline"
            className="max-md:hidden"
        />
    )
}

const SidebarSheet = ({
    button,
}: {
    button: React.ReactElement<HTMLButtonElement>
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{button}</SheetTrigger>
            <SheetContent side={"left"}>
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

const MainLayout = ({
    viewTypeCookie,
    children,
}: PropsWithChildren<{ viewTypeCookie: string | undefined }>) => {
    const [viewType, setViewType] = useState<ViewType>(
        (viewTypeCookie as ViewType) ?? "grid",
    )

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || e.target.value.length < 2) return

        console.log("input value", e.target.value) // search alg
    }

    return (
        <div className="flex h-full">
            <aside className="h-full w-48 max-lg:hidden xl:w-60 2xl:w-80">
                <nav className="flex flex-col">
                    {[...new Array(5)].map((_, idx) => (
                        <ButtonWithIcon
                            icon={<Mail className="h-4 w-4" />}
                            variant="ghost"
                            key={idx}
                            className="text-xl xl:text-2xl"
                        >
                            {`Navigation ${idx}`}
                        </ButtonWithIcon>
                    ))}
                </nav>
            </aside>
            <div className="flex flex-1 flex-col">
                <div className="flex w-full justify-between bg-purple-500 p-4">
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
                        <Separator
                            orientation="vertical"
                            className="lg:hidden"
                        />
                        <div className="px-4">
                            <Input
                                placeholder="Search"
                                className="w-40 text-base transition-[width] duration-300 sm:w-48 sm:focus-visible:w-60 md:text-lg lg:text-xl"
                                onChange={debounce(handleSearch, 500)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ViewToggle opts={[viewType, setViewType]} />
                        <ModeToggle />
                    </div>
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
