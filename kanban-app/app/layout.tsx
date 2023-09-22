import { cn } from "@/utilities/cn"
import "./globals.css"
import { ThemeProvider } from "@components/ThemeProvider"
import { Inter, Roboto_Serif } from "next/font/google"
import type { Metadata } from "next"

// Will be decided
const inter = Inter({ subsets: ["latin"] })
const robotoSerif = Roboto_Serif({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Kanban board template",
    description: "Kanban board with drag & drop ability.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(robotoSerif.className, "h-screen")}>
                {" "}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
