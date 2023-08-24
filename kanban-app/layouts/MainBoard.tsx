"use client"

import { useContext } from "react"
import { ViewContext } from "./MainLayout"
import List from "@components/List"
import { cn } from "@utilities/cn"

export default function MainBoard() {
    const viewType = useContext(ViewContext)

    return (
        <main
            className={cn(
                "grid gap-8 p-4 transition-all duration-300 ease-in-out",
                viewType === "grid" && "md:flex-1 md:grid-flow-col",
                viewType === "list" && "grid-cols-1",
            )}
        >
            <List>This is card 1</List>
            <List>This is card 2</List>
            <List>This is card 3</List>
        </main>
    )
}
