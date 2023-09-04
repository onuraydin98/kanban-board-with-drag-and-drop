import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@constants/tasks"
import { cn } from "@utilities/cn"
import type { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    task?: Task
}

export function Card({ task, children, className, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={cn(
                className,
                "flex min-h-[100px] w-full items-center justify-center bg-red-300 ",
            )}
        >
            {children}
        </div>
    )
}

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
                className="flex min-h-[100px] w-full items-center justify-center bg-blue-300 opacity-30 "
            />
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card task={task} {...props}>
                <p>This is card {task.id}</p>
            </Card>
        </div>
    )
}

// export { SortableCard, Card }
