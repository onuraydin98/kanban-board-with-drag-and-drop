import { cn } from "@/utilities/cn"
import {
    Avatar as AvatarLayout,
    AvatarFallback,
    AvatarImage,
} from "@components/ui/avatar"

interface AvatarProps extends React.ComponentProps<typeof AvatarLayout> {
    src: string
    alt: string
    fallback?: string
}

const Avatar = ({ src, alt, fallback, className, ...props }: AvatarProps) => {
    return (
        <AvatarLayout
            className={cn(
                "h-6 w-6 outline outline-1 outline-offset-2 outline-indigo-600 hover:outline-slate-900 dark:outline-teal-200 dark:hover:outline-slate-100",
                className,
            )}
            {...props}
        >
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </AvatarLayout>
    )
}

export default Avatar
