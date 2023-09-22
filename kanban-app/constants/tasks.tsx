import type { ListType } from "./lists"

export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export type Task = {
    id: string
    tag: string
    title: string
    priority: PriorityType
    weight: number
    assignee: string
    listType: ListType | Omit<ListType, string>
}

const defaultTasks: Task[] = [
    {
        id: "1",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignee: "eda",
        listType: "backlog",
    },
    {
        id: "2",
        tag: "EPC",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignee: "eda",
        listType: "todo",
    },
    {
        id: "3",
        tag: "EPC",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignee: "onur",
        listType: "todo",
    },
    {
        id: "4",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "MEDIUM",
        weight: 3,
        assignee: "tolga",
        listType: "backlog",
    },
    {
        id: "5",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignee: "onur",
        listType: "backlog",
    },
    {
        id: "6",
        tag: "TSK",
        title: "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 13,
        assignee: "onur",
        listType: "done",
    },
]

export default defaultTasks
