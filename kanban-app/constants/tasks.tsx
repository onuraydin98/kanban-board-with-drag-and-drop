import type { ListType } from "./lists"

export type PriorityType = "LOW" | "MED" | "HIGH"

export type Task = {
    id: string
    summary: string
    priority: PriorityType
    weight: number
    assignee: string
    listType: ListType | Omit<ListType, string> // This is for suggestion of the types => ("backlog", "todo", "done")
}

const defaultTasks: Task[] = [
    {
        id: "1",
        summary:
            "Being able to rename and edit users lorem rename and edit users, being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignee: "eda",
        listType: "backlog",
    },
    {
        id: "2",
        summary:
            "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignee: "eda",
        listType: "todo",
    },
    {
        id: "3",
        summary:
            "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 5,
        assignee: "onur",
        listType: "todo",
    },
    {
        id: "4",
        summary:
            "Being able to rename and edit users lorem rename and edit users",
        priority: "MED",
        weight: 3,
        assignee: "tolga",
        listType: "backlog",
    },
    {
        id: "5",
        summary:
            "Being able to rename and edit users lorem rename and edit users, being able to rename and edit users lorem rename and edit users, being able to rename and edit users lorem rename and edit users",
        priority: "HIGH",
        weight: 8,
        assignee: "onur",
        listType: "backlog",
    },
    {
        id: "6",
        summary:
            "Being able to rename and edit users lorem rename and edit users",
        priority: "LOW",
        weight: 13,
        assignee: "onur",
        listType: "done",
    },
]

export default defaultTasks
