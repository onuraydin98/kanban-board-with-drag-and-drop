import type { ListType, Task } from "@constants/index"

const distributeTasks = (tasks: Task[]) => {
    const lists: Record<ListType, Task[]> = {
        backlog: [],
        todo: [],
        done: [],
    }

    tasks.forEach(task => {
        switch (task.listType) {
            case "backlog":
                lists.backlog.push(task)
                break
            case "todo":
                lists.todo.push(task)
                break
            case "done":
                lists.done.push(task)
                break
            default:
                break
        }
    })

    // for (let list in lists) {
    //     lists[list as ListType].sort()
    // }

    return lists
}

export default distributeTasks
