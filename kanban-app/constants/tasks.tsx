export type PriorityType = "LOW" | "MEDIUM" | "HIGH"
export type ListType = "backlog" | "todo" | "done"

export type Task = {
    id: string
    tag: string
    title: string
    priority: PriorityType
    weight: number
    assignedTo: string
    listType: ListType | Omit<ListType, string>
}

const defaultTasks: Task[] = [
    {
        id: "1",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignedTo: "eda",
        listType: "backlog",
    },
    {
        id: "2",
        tag: "EPC",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignedTo: "eda",
        listType: "todo",
    },
    {
        id: "3",
        tag: "EPC",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignedTo: "onur",
        listType: "todo",
    },
    {
        id: "4",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "MEDIUM",
        weight: 3,
        assignedTo: "tolga",
        listType: "backlog",
    },
    {
        id: "5",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignedTo: "onur",
        listType: "backlog",
    },
    {
        id: "6",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 13,
        assignedTo: "onur",
        listType: "done",
    },
]

export default defaultTasks
