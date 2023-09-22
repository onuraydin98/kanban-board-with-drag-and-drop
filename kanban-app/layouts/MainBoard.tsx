"use client"

import { useContext, useState } from "react"
import { ViewContext } from "./MainLayout"
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    closestCenter,
    DragOverlay,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import List from "@components/List"
import { Card } from "@components/Card"
import { cn } from "@utilities/cn"
import {
    defaultLists,
    defaultTasks,
    ListType,
    type Task,
} from "@constants/index"
import useListStore from "@stores/useListStore"
import generateId from "@/utilities/generateId"

export default function MainBoard() {
    const viewType = useContext(ViewContext)

    const [storeLists, storeBulkUpdate, storeChangeTaskListType] = useListStore(
        state => [state.lists, state.bulkUpdate, state.changeTaskListType],
    )

    const storeListv2 = useListStore.getState().lists

    const [lists, setLists] = useState(defaultLists)
    const [tasks, setTasks] = useState<Task[]>(defaultTasks)

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    function handleDragStart(event: DragStartEvent) {
        const { active } = event
        const { id } = active

        setActiveTask(active.data.current?.task)

        // console.log("drag start")
        console.log("active task", active.data.current?.task)
        const activeIndex = storeLists[
            active.data.current?.task.listType as ListType
        ].findIndex(t => t.id === id)
        console.log("drag start active index", activeIndex)
        // console.log("tasks", tasks)
        // console.log(tasks.findIndex(t => t.id === id))
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveTask(null)

        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        // console.log("event", event)
        // console.log("activeId", activeId)
        // console.log("overId", overId)
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        // console.log("active", active, "over", over)
        // console.log(
        //     "active-index",
        //     tasks.findIndex(t => t.id === activeId),
        //     "over-index",
        //     tasks.findIndex(t => t.id === overId),
        // )

        const activeTaskListType = active.data.current?.task
            .listType as ListType

        const isTaskOverTask =
            (active.data.current?.type && over.data.current?.type) === "Task"

        const isTaskOverList =
            active.data.current?.type === "Task" &&
            over.data.current?.type === "List"

        if (isTaskOverTask) {
            const overTaskListType = over.data.current?.task
                .listType as ListType

            const activeIndex = storeLists[activeTaskListType].findIndex(
                t => t.id === activeId,
            )
            const overIndex = storeLists[overTaskListType].findIndex(
                t => t.id === overId,
            )

            // Tasks' list types are not same
            if (activeTaskListType !== overTaskListType) {
                storeChangeTaskListType(
                    activeId as string,
                    activeTaskListType,
                    overTaskListType,
                    true,
                )
            }

            // Same list type tasks
            if (activeTaskListType === overTaskListType) {
                storeBulkUpdate(
                    arrayMove(
                        storeLists[activeTaskListType],
                        activeIndex,
                        overIndex,
                    ),
                    activeTaskListType,
                )
            }
        }

        // Task over list
        if (isTaskOverList) {
            const overTaskListType = over.data.current?.data.id

            storeChangeTaskListType(
                activeId as string,
                activeTaskListType,
                overTaskListType,
            )
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <main
                className={cn(
                    "grid grid-cols-1 gap-8 p-4 transition-all duration-300 ease-in-out",
                    viewType === "grid" &&
                        "md:grid md:flex-1 md:grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]",
                    // viewType === "list" && "grid-cols-1",
                )}
            >
                {Object.keys(storeLists).map(listType => (
                    <List
                        key={listType}
                        tasks={storeLists[listType as ListType]}
                        id={listType}
                    />
                ))}
                <DragOverlay>
                    {activeTask?.id ? (
                        <Card
                            task={activeTask!}
                            id={activeTask.id ?? "overlay-card"}
                        >
                            This is card {activeTask.id}
                        </Card>
                    ) : null}
                </DragOverlay>
            </main>
        </DndContext>
    )
}
