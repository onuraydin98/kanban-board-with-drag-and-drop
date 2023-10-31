"use client"

import { useContext, useState } from "react"
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import useListStore from "@stores/useListStore"
import { ListType, type Task } from "@constants/index"

import { ViewContext } from "@layouts/MainLayout"
import List from "@components/List"
import { Card } from "@components/Card"
import { cn } from "@utilities/cn"
import generateId from "@/utilities/generateId"

export default function MainBoard() {
    const viewType = useContext(ViewContext)

    const [storeLists, storeBulkUpdate, storeChangeTaskListType] = useListStore(
        state => [state.lists, state.bulkUpdate, state.changeTaskListType],
    )

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    function handleDragStart(event: DragStartEvent) {
        const { active } = event
        setActiveTask(active.data.current?.task)
    }

    // function handleDragEnd(event: DragEndEvent) {
    //     setActiveTask(null)

    //     const { active, over } = event
    //     if (!over) return

    //     const activeId = active.id
    //     const overId = over.id

    //     if (activeId === overId) return
    // }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

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
                    "grid grid-cols-1 gap-8 xs:p-4 transition-all duration-300 ease-in-out",
                    viewType === "grid" &&
                        "md:grid md:flex-1 md:grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]",
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
                            className='after:[content=""] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:h-full after:w-full after:rounded-lg after:p-2 after:opacity-0 after:shadow-inner-custom after:transition-[opacity] after:duration-300 after:ease-linear after:hover:opacity-100 '
                        />
                    ) : null}
                </DragOverlay>
            </main>
        </DndContext>
    )
}
