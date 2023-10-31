import useListStore from "@/stores/useListStore"
import type { ListType } from "@constants/index"

const idQueue: number[] = []

const generateId = () => {
    const lists = useListStore.getState().lists

    if (idQueue.length) return String(idQueue.shift())

    let initialId = 1
    let flatTaskIds = new Set<number>()

    for (let list in lists) {
        lists[list as ListType].forEach(task => {
            flatTaskIds.add(Number(task.id))
        })
    }

    const max = Math.max(...flatTaskIds)

    while (initialId !== max) {
        if (!flatTaskIds.has(initialId)) idQueue.push(initialId)
        initialId++
    }

    return String(idQueue.shift() ?? initialId + 1)
}

export default generateId
