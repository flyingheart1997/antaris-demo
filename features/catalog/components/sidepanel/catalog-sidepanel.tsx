'use client'

import { CatalogFilter } from '../catalog-filter'
import { CatalogList } from '../sidepanel/catalog-list'
import { CreateCustomButton } from './create-custom-button'

export const CatalogSidepanel = () => {
    return (
        <aside className="flex h-full w-70 shrink-0 flex-col gap-3">
            <CatalogFilter />
            <CatalogList />
            <CreateCustomButton />
        </aside>
    )
}
