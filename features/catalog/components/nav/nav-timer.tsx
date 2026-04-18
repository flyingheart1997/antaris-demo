import { Text } from '@/components/ui/text'
import { useNavTimer } from '@/hooks/use-nav-timer'

export const NavTimer = () => {
    const { dateString, timeString, isLoading } = useNavTimer()

    if (isLoading) return <div className="min-w-50" /> // Placeholder to prevent layout shift

    return (
        <div className="flex items-center gap-16 select-none" data-slot="nav-timer">
            <Text
                type="heading"
                size="lg"
                weight="regular"
                color="primary"
                className="whitespace-nowrap"
            >
                {dateString}
            </Text>
            <Text
                type="heading"
                size="lg"
                weight="regular"
                color="selected"
                className="whitespace-nowrap"
            >
                {timeString}
            </Text>
        </div>
    )
}
