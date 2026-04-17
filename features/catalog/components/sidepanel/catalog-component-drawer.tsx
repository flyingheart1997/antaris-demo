import { Drawer, DrawerTrigger, DrawerContainer, DrawerItem } from "@/components/ui/drawer"
import { useCatalogSelection } from "../../hooks/use-catalog-selection";
import { DRAWER_CONFIGS } from "../../utils/drawer-configs";


const CatalogComponentDrawer = () => {
    const { drawer, open, activeDrawer, setDrawer, setActiveDrawer } = useCatalogSelection()

    return (
        <section className="flex shrink-0 flex-col gap-20 px-6">
            {DRAWER_CONFIGS.map((config) => {
                const Icon = config.icon;
                const isCurrentDrawer = drawer === config.value;
                const isDrawerOpen = open && isCurrentDrawer;

                return (
                    <Drawer
                        key={config.value}
                        open={isDrawerOpen}
                        active={isCurrentDrawer}
                        onOpenChange={() => {
                            setDrawer(config.value)
                        }}
                    >
                        <DrawerTrigger
                            title={config.label}
                        >
                            <Icon />
                        </DrawerTrigger>
                        <DrawerContainer>
                            {config.items.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <DrawerItem
                                        key={item.value}
                                        active={activeDrawer === item.value && isCurrentDrawer}
                                        title={item.label}
                                        onClick={() => setActiveDrawer(item.value)}
                                    >
                                        <ItemIcon />
                                    </DrawerItem>
                                )
                            })}
                        </DrawerContainer>
                    </Drawer>
                )
            })}
        </section>
    )
}

export default CatalogComponentDrawer
