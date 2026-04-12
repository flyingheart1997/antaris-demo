
import { CatalogFilter } from './catalog-filter'
import { CatalogList } from './catalog-list'
import { CreateCustomButton } from './create-custom-button'

export const CatalogSidepanel = () => {
    return (
        <aside className="flex flex-col w-70 h-full gap-3">
            <CatalogFilter />
            <CatalogList />
            <CreateCustomButton />
        </aside>
    )
}
