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
        <AvatarLayout className={cn(className, "h-6 w-6")} {...props}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </AvatarLayout>
    )
}

export default Avatar
