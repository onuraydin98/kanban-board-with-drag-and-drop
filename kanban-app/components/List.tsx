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
        <div className="flex flex-col">
            <div className="group">
                <div className="flex items-center justify-between px-4 py-4">
                    <h3 className="uppercase transition-all duration-500 group-hover:tracking-[.2rem]">
                        {id}
                    </h3>
                    <span
                        id={`task-count-${id}`}
                        className="flex h-[1.5rem] w-min min-w-[1.5rem] animate-3d-flip-reverse items-center justify-center rounded-full bg-indigo-200 text-dark group-hover:animate-3d-flip group-hover:border-none group-hover:bg-indigo-100 group-hover:text-dark group-hover:duration-500 dark:bg-slate-900 dark:text-slate-100 group-hover:dark:bg-transparent group-hover:dark:text-slate-50"
                    >
                        {tasks.length}
                    </span>
                </div>
                <SortableContext
                    id={id}
                    items={tasksIds}
                    strategy={verticalListSortingStrategy}
                >
                    <div
                        id={`list-item-${id}`}
                        className={cn(
                            "relative flex min-h-[200px] flex-col gap-4 overflow-y-auto rounded-md bg-indigo-100 p-4 dark:bg-slate-900 xs:grid xs:grid-cols-2",
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
            </div>
        </div>
    )
}

export default List
