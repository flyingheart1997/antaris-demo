import { Tabs } from "@/components/ui/tabs"
import { ComponentPreviewHeader } from "./component-preview-header"
import { ComponentPreviewPanel } from "./component-preview-panel"
import { useCatalogSelection } from "../../hooks/use-catalog-selection"
import { EmptyPreviewSection } from "./empty-preview-section"


const CatalogComponentPreview = () => {
    const { selectedComponentTab } = useCatalogSelection()
    if (!selectedComponentTab) return <EmptyPreviewSection />
    return (
        <Tabs value={selectedComponentTab || undefined} className="flex flex-col h-full w-full min-w-0">
            <ComponentPreviewHeader />
            <ComponentPreviewPanel />
        </Tabs>
    )
}

export default CatalogComponentPreview