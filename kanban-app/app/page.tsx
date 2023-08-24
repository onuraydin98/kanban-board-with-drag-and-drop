import { getCookie } from "./cookies.server"
import MainBoard from "@layouts/MainBoard"
import Navbar from "@components/Navbar"
import MainLayout from "@layouts/MainLayout"

export default async function Home() {
    const viewType = await getCookie("viewType")

    return (
        <MainLayout viewTypeCookie={viewType}>
            <Navbar />
            <MainBoard />
        </MainLayout>
    )
}
