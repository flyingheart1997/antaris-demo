'use client'

import * as React from 'react'
import { TabsList, TabsTrigger, TabTriggerCloseButton, TabTriggerText } from '@/components/ui/tabs'
import { useCatalogSelection } from '@/features/catalog/hooks/use-catalog-selection'
import { useTabsScroll } from '@/hooks/use-tabs-scroll'
import { CrossIcon } from '@/icons'

export const ComponentPreviewHeader = () => {
    const { selectedComponents, unSelectComponent, selectComponent } = useCatalogSelection()
    const scrollRef = useTabsScroll()

    return (
        <nav
            ref={scrollRef as React.RefObject<HTMLElement>}
            className="h-40 w-full min-w-0 overflow-x-auto overflow-y-hidden hide-scrollbar"
        >
            <TabsList className="h-full flex items-center">
                {selectedComponents.map((component) => {
                    const Icon = component.componentIcon;
                    return (
                        <TabsTrigger
                            key={component.id}
                            value={component.id}
                            onClick={() => selectComponent(component)}
                        >
                            <Icon />
                            <TabTriggerText title={component.name}>
                                {component.name}
                            </TabTriggerText>
                            <TabTriggerCloseButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    unSelectComponent(component)
                                }}
                            >
                                <CrossIcon />
                            </TabTriggerCloseButton>
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </nav>
    )
}
