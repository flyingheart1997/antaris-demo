import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'

export const NavUserGroups = () => {
    return (
        <AvatarGroup>
            <Avatar size="2" color='green'>
                <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <Avatar size="2" color='blue'>
                <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar size="2" color='white'>
                {/* Intentionally broken src for fallback demo */}
                <AvatarFallback>FB</AvatarFallback>
            </Avatar>
        </AvatarGroup>
    )
}
