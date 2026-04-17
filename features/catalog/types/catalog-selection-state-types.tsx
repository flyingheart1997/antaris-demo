import { CatalogItem } from "./catalog-data-types";

export type CatalogDrawerTypes = 'payload' | 'bus';
export type CatalogComponentTypes = 'earth-observation' | 'comms' | 'edge' | 'processor' | 'eps' | 'adcs' | 'gps' | 'temperature' | 'thruster' | 'custom';

export interface DrawerItemConfig {
    label: string;
    value: CatalogComponentTypes;
    icon: React.ComponentType;
}

export interface DrawerConfigType {
    label: string;
    value: CatalogDrawerTypes;
    icon: React.ComponentType;
    items: DrawerItemConfig[];
}

export interface CatalogSelectionStateType {
    drawer: CatalogDrawerTypes;
    open: boolean;
    activeDrawer: CatalogComponentTypes | null;
    selectedComponents: CatalogItem[];
    selectedComponentTab: string | null;
}
