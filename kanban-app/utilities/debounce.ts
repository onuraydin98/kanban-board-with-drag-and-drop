type Timer = ReturnType<typeof setTimeout>

export default function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timer: Timer | null

    return function (...args: Parameters<T>): void {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func(...args)
            timer = null
        }, delay)
    }
}
