import { useMemo } from 'react'
import { useCatalogSelection } from '@/features/catalog/hooks/use-catalog-selection'
import { getCategoryConfig } from '@/features/catalog/utils/drawer-configs'
import { CustomIcon } from '@/icons'

export const EmptyPreviewSection = () => {
    const { category } = useCatalogSelection()
    const emptySectionConfig = getCategoryConfig(category)
    const text = category === 'payload' ? 'Select payload to view details' : 'Select component to view details'
    const Icon = useMemo(() => emptySectionConfig?.icon || CustomIcon, [emptySectionConfig])
    return (
        <section className='flex-1 h-full flex items-center justify-center'>
            <div className='flex flex-col items-center gap-12'>
                <Icon className='size-100 opacity-60 text-text-secondary' />
                <div className='flex items-center justify-center'>
                    <p className='text-md font-regular font-body text-text-secondary opacity-60'>{text}</p>
                 </div>
            </div>
        </section>
    )
}
