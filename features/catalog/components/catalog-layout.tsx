'use client'

import { CatalogNav } from "./nav/catalog-nav";
import CatalogCategoryDrawer from "./sidepanel/catalog-category-drawer";
interface CatalogLayoutProps {
    children: React.ReactNode
}

const CatalogLayout = ({ children }: CatalogLayoutProps) => {
    return (
        <main className="flex flex-col h-full w-full">
            <CatalogNav />
            <section className="flex flex-1 min-w-0">
                <CatalogCategoryDrawer />
                <section className="flex min-w-0 flex-1">
                    {children}
                </section>
            </section>
        </main>
    )
}

export default CatalogLayout
