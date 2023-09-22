import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { Draft, produce } from "immer"
import { defaultTasks, type Task, type ListType } from "@constants/index"
import distributeTasks from "@utilities/distribute-tasks"

type UseListStore = {
    lists: {
        [key in ListType]: Task[]
    }
    addTask: (task: Task) => void
    changeTaskListType: (
        taskId: string,
        from: ListType,
        to: ListType,
        overTask?: boolean,
    ) => void
    bulkUpdate: (taskArray: Task[], listType: ListType) => void
}

const initalLists = distributeTasks(defaultTasks)

const useListStore = create(
    immer<UseListStore>(set => ({
        lists: initalLists,
        addTask: task =>
            set(
                produce((state: Draft<UseListStore>) => {
                    state.lists.backlog.push(task)
                }),
            ),
        changeTaskListType: (taskId, from, to, overTask) =>
            // Needs to be fixed
            set(
                produce((state: Draft<UseListStore>) => {
                    const taskIndex = state.lists[from].findIndex(
                        task => task.id === taskId,
                    )

                    if (taskIndex === -1) return

                    const task = state.lists[from][taskIndex]
                    task.listType = to
                    // Remove the task from the source list
                    state.lists[from].splice(taskIndex, 1)

                    if (overTask) {
                        console.log("overTask")
                        state.lists[to].splice(taskIndex, 0, task)
                        return
                    }
                    // Push the task to the target list

                    state.lists[to].push(task)
                    console.log("changeTaskListType")
                }),
            ),
        bulkUpdate: (taskArray, listType) =>
            set(
                produce((state: Draft<UseListStore>) => {
                    state.lists[listType] = [...taskArray]
                    console.log("bulkUpdate")
                }),
            ),
    })),
)

export default useListStore
