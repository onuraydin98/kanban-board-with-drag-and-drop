import { cn } from "@/utilities/cn"

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const List = ({ children, className }: ListProps) => {
    return <div className={cn("bg-purple-500", className)}>{children}</div>
}

export default List
