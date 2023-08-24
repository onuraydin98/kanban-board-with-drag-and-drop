import { cookies } from "next/headers"

export async function getCookie(key: string): Promise<string | undefined> {
    const cookiesObj = cookies()

    if (cookiesObj.has(key)) {
        const cookieValue = cookiesObj.get(key)?.value
        return cookieValue
    }

    return undefined
}
