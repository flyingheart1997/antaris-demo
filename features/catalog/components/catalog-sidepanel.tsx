
import { CatalogFilter } from './catalog-filter'
import { CatalogList } from './catalog-list'
import { CreateCustomButton } from './create-custom-button'

interface CatalogSidepanelProps {
    selectedId: string | null
    onSelect: (id: string) => void
}

export const CatalogSidepanel = ({ selectedId, onSelect }: CatalogSidepanelProps) => {
    return (
        <aside className="flex flex-col w-70 h-full gap-3">
            <CatalogFilter />
            <CatalogList selectedId={selectedId} onSelect={onSelect} />
            <CreateCustomButton />
        </aside>
    )
}
