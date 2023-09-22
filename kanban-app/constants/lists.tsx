export type ListType = "backlog" | "todo" | "done"

type List = {
    id: ListType
    title: string
}

const defaultLists: List[] = [
    {
        id: "backlog",
        title: "Backlog",
    },
    {
        id: "todo",
        title: "Todo",
    },
    {
        id: "done",
        title: "Done",
    },
]

export default defaultLists
