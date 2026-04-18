import { CatalogItem } from "./catalog-data-types";

export type CatalogCategoryTypes = 'payload' | 'bus';
export type CatalogSubsystemTypes = 'earth-observation' | 'comms' | 'edge' | 'processor' | 'eps' | 'adcs' | 'gps' | 'temperature' | 'thruster' | 'custom';

export interface SubsystemItemConfig {
    label: string;
    value: CatalogSubsystemTypes;
    icon: React.ComponentType;
}

export interface CategoryConfigType {
    label: string;
    value: CatalogCategoryTypes;
    icon: React.ComponentType;
    items: SubsystemItemConfig[];
}

export interface CatalogSelectionStateType {
    selectedComponents: string[]; // Stores IDs only
    open: boolean;                 // Sidebar state
}
