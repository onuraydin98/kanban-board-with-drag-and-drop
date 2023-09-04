import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/utilities/cn"
import { SortableCard } from "./Card"
import type { Task } from "@constants/tasks"

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    // children: React.ReactNode
    tasks: Task[]
    id: string
}

const List = ({ className, id, tasks, ...props }: ListProps) => {
    // console.log("children", children, id)
    // console.log("sortableContext - id:", id)
    const { setNodeRef } = useDroppable({
        id,
    })

    return (
        <SortableContext
            id={id}
            items={tasks}
            strategy={verticalListSortingStrategy}
        >
            <div
                className="flex flex-col gap-4 bg-yellow-500 p-4"
                ref={setNodeRef}
                {...props}
            >
                {tasks.map((task) => (
                    <SortableCard task={task} key={task.id} />
                ))}
            </div>
        </SortableContext>
    )
}

export default List
