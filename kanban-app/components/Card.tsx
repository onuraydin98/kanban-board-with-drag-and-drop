import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@constants/tasks"
import { cn } from "@utilities/cn"
import Avatar from "@components/Avatar"
import type { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    task: Task
}

export function Card({ task, children, className, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex h-[150px] min-h-[150px] w-full cursor-grab resize-none flex-col items-start justify-between gap-8 rounded-lg bg-indigo-200 p-2 text-sm @container/card hover:scale-[1.02] dark:bg-teal-900",
                className,
            )}
        >
            <section>
                <p className="line-clamp-3">{task.summary}</p>
            </section>
            <div className="flex w-full flex-col items-start justify-between @[180px]/card:flex-row @[180px]/card:items-center">
                <div className="flex items-center gap-2">
                    <span>{task.priority}</span>
                    <span>{task.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/32241352?s=400&u=4882818a0b850c5a51b5223dfbe766583d659365&v=4"
                            alt="@onuraydin98"
                            className="outline-dark group-hover:outline-offset-4 dark:outline-slate-100"
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}

// HoC
export function SortableCard({ task, ...props }: CardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="relative h-[150px] min-h-[150px] w-full rounded-lg border-none bg-gradient-to-tl from-slate-600 via-indigo-300 to-slate-100 text-sm dark:from-slate-100 dark:via-teal-700 dark:to-slate-900 dark:to-70%"
            />
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card task={task} id={task.id} {...props} />
        </div>
    )
}
