import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'

export const NavUserGroups = () => {
    return (
        <AvatarGroup>
            <Avatar size="2" color='green' title='Koushik Mondal'>
                <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <Avatar size="2" color='blue' title='Antaris'>
                <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar size="2" color='white' title='Facebook'>
                {/* Intentionally broken src for fallback demo */}
                <AvatarFallback>FB</AvatarFallback>
            </Avatar>
        </AvatarGroup>
    )
}
