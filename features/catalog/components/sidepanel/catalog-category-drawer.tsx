import { Drawer, DrawerTrigger, DrawerContainer, DrawerItem } from "@/components/ui/drawer"
import { useCatalogSelection } from "../../hooks/use-catalog-selection";
import { CATEGORY_CONFIGS } from "../../utils/drawer-configs";

const CatalogCategoryDrawer = () => {
    const { category, drawer, subSystem, setCategory, setSubSystem } = useCatalogSelection()

    return (
        <section className="flex shrink-0 flex-col gap-20 px-6">
            {CATEGORY_CONFIGS.map((config) => {
                const Icon = config.icon;
                const isCurrentCategory = category === config.value;
                const isDrawerOpen = drawer && isCurrentCategory;

                return (
                    <Drawer
                        key={config.value}
                        open={isDrawerOpen}
                        active={isCurrentCategory}
                        onOpenChange={() => {
                            setCategory(config.value)
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
                                        active={subSystem === item.value && isCurrentCategory}
                                        title={item.label}
                                        onClick={() => setSubSystem(item.value)}
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

export default CatalogCategoryDrawer
