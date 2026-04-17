'use client'

import { useCatalogSelection } from '../../hooks/use-catalog-selection'
import { TabsContent } from '@/components/ui/tabs'

export const ComponentPreviewPanel = () => {
    const { selectedComponents } = useCatalogSelection()
    return (
        <section className='flex-1 border'>
            {selectedComponents.map(component => {
                return (
                    <TabsContent value={component.id} key={component.id}>
                        {component.name}
                    </TabsContent>
                )
            })}
        </section>
    )
}
