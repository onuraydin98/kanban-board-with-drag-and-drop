import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@constants/tasks"
import { cn } from "@utilities/cn"
import type { HTMLAttributes } from "react"
import Image from "next/image"
import { Diamond } from "lucide-react"
import Avatar from "./Avatar"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    task: Task
}

export function Card({ task, children, className, ...props }: CardProps) {
    return (
        <div
            {...props}
            className={cn(
                className,
                "@container/card flex h-[150px] min-h-[150px] w-full cursor-grab resize-none flex-col items-start justify-between gap-8 rounded-lg bg-slate-900 p-2 ",
                // 'before:absolute before:bottom-0 before:top-0 before:z-[2] before:-ml-4 before:h-full before:w-[90%] before:-translate-x-full  before:bg-slate-900 before:transition-all before:duration-500 before:ease-linear before:[content:""]',
                // 'after:absolute after:left-0 after:right-0 after:z-[-1] after:h-[2%] after:w-full after:-translate-y-[25px] after:-skew-y-6 after:bg-white after:transition-all after:duration-300 after:ease-linear after:[content:""]',
                // 'after:absolute after:bottom-0 after:top-0 after:z-[-1] after:h-full after:w-[2%] after:translate-x-[15rem] after:bg-white after:transition-all after:duration-300 after:ease-linear after:[content:""]',
                // "after:hover:translate-x-2 after:hover:opacity-10",
                // "before:hover:translate-x-[25rem] before:hover:opacity-0",
                // 'after:[content=""] after:shadow-inner-custom after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:h-full after:w-full after:p-2 after:opacity-0 after:transition-[opacity] after:duration-500 after:ease-linear',
                // "after:hover:opacity-100 ",
            )}
        >
            <section className="line-clamp-2">
                <p>{task.title}</p>
            </section>
            <div className="@[180px]/card:flex-row @[180px]/card:items-center flex w-full flex-col items-start justify-between">
                <div className="flex items-center gap-2">
                    <span>
                        <Diamond />
                    </span>
                    <span>{task.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>{task.priority}</span>
                    <span>{task.weight}</span>
                    <span>
                        <Avatar
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
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
                className="relative h-[150px] min-h-[150px] w-full rounded-lg border border-slate-600"
            />
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card task={task} id={task.id} {...props} />
        </div>
    )
}
