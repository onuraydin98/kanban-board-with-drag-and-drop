"use client"

// TODO: Bu layout'u client'ten kurtarabilir miyiz sonra bak!
import { useState, createContext, type PropsWithChildren } from "react"
import Navbar from "@components/main-layout/Navbar"
import Sidebar from "@components/main-layout/Sidebar"
import Breadcrumb from "@/components/main-layout/Breadcrumb"

export const ViewContext = createContext<ViewType>("grid")

export type ViewType = "grid" | "list" | null

const MainLayout = ({
    viewTypeCookie,
    children,
}: PropsWithChildren<{ viewTypeCookie: string | null }>) => {
    const [viewType, setViewType] = useState<ViewType>(
        (viewTypeCookie as ViewType) ?? "grid",
    )

    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="ml-52 flex flex-1 flex-col max-w-[100dvw] max-lg:ml-0 2xl:ml-64 ">
                <div className="flex flex-col">
                    <Navbar viewTypeConfig={[viewType, setViewType]} />
                    <Breadcrumb />
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
