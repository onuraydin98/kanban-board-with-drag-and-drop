import { useContext, useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@utilities/cn"
import { ViewContext } from "@layouts/MainLayout"
import { SortableCard } from "./Card"
import type { Task } from "@constants/tasks"

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    tasks: Task[]
    id: string
}

const List = ({ className, id, tasks, ...props }: ListProps) => {
    const viewType = useContext(ViewContext)
    const { setNodeRef } = useDroppable({
        id,
        data: {
            data: { id },
            type: "List",
        },
    })

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    return (
        <SortableContext
            id={id}
            items={tasksIds}
            strategy={verticalListSortingStrategy}
        >
            <div
                className={cn(
                    "xs:grid xs:grid-cols-2 relative flex min-h-[200px] flex-col gap-4 overflow-y-auto rounded-md bg-gray-800 p-4",
                    // "xs:grid @lg/main:grid-cols-2 @4xl/main:grid-cols-3 ",
                    viewType === "grid" &&
                        "max-h-[calc(100dvh_-_9rem)] md:flex",
                )}
                ref={setNodeRef}
                {...props}
            >
                {tasks.map(task => (
                    <SortableCard task={task} key={task.id} />
                ))}
            </div>
        </SortableContext>
    )
}

export default List
