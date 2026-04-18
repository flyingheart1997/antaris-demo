import { Tabs } from "@/components/ui/tabs"
import { ComponentPreviewHeader } from "./component-preview-header"
import { ComponentPreviewPanel } from "./component-preview-panel"
import { EmptyPreviewSection } from "./empty-preview-section"
import { useCatalogSelection } from "@/features/catalog/hooks/use-catalog-selection"


export const CatalogComponentPreview = () => {
    const { componentId } = useCatalogSelection()

    if (!componentId) return <EmptyPreviewSection />

    return (
        <Tabs value={componentId || undefined} className="flex flex-col h-full w-full min-w-0">
            <ComponentPreviewHeader />
            <ComponentPreviewPanel />
        </Tabs>
    )
}