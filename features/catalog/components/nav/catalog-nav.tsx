import { Text } from '@/components/ui/text'
import { NavUserGroups } from './nav-user-groups'
import { NavTimer } from './nav-timer'

export const CatalogNav = () => {
    return (
        <nav className="py-16 px-20 flex items-center justify-between">
            <Text size='lg' type='heading'>Catalog</Text>
            <div className='flex items-center gap-24'>
                <NavUserGroups />
                <NavTimer />
            </div>
        </nav>
    )
}
