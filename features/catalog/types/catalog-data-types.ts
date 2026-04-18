import { CatalogSubsystemTypes, CatalogCategoryTypes } from "./catalog-selection-state-types";

// --- Base Enterprise Types (Matching Go Specs) ---

export interface ValueWithUnit {
  attribute_value: number;
  attribute_unit: string;
}

export interface DimensionsObject {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface OperatingTemperature {
  minimum_operating_temp: number;
  maximum_operating_temp: number;
  operating_temp_unit: string;
}

export interface InterfaceEntry {
  interface_type: string;
  interface_value: string[];
}

export interface VendorAttribute {
  attribute_name: string;
  attribute_value: string;
  attribute_unit?: string;
}

export interface CommonAttributes {
  id: string;
  count: number;
  redundancy: number;
  part_number?: string;
  model: string;
  vendor: string;
  title: string;
  description: string;
  mass: ValueWithUnit;
  dimensions: DimensionsObject;
  operating_temperature: OperatingTemperature;
  interfaces?: InterfaceEntry[];
  cost?: number;
  lead_time?: number;
  data_sheet_url?: string;
  lifetime?: ValueWithUnit;
  depends_on_components?: string[];
}

// --- Component Specific Attributes ---

export interface BusSpecificAttributes {
  operating_system: string;
  mission_life: ValueWithUnit;
  mission_capabilities: string[];
  structure_type: string;
  orbit_compatibility: string[];
  launch_compatibility: string[];
  dimensions: DimensionsObject;
  mass: {
    attribute_min: number;
    attribute_max: number;
    attribute_unit: string;
  };
  payload_mass_supported: {
    attribute_min: number;
    attribute_max: number;
    attribute_unit: string;
  };
  bus_voltage: {
    attribute_min: number;
    attribute_max: number;
    attribute_unit: string;
  };
  bus_power_output: {
    attribute_min: number;
    attribute_max: number;
    attribute_unit: string;
  };
  load_survival_capability: string;
  pointing_accuracy: ValueWithUnit;
  radiation_tolerance: {
    attribute_min: number;
    attribute_max: number;
    attribute_unit: string;
  };
  operating_temperature: OperatingTemperature;
  interfaces: InterfaceEntry[];
  comm_data_rate: Array<{
    band_name: string;
    uplink_rate: number;
    downlink_rate: number;
    rate_unit: string;
  }>;
  payload_supported: string[];
  propulsion_type: string;
}

// --- Root Enterprise Registry Record ---

export interface CatalogItem {
  // Metadata
  id: string;
  uniqueId?: string; // Server key
  _id?: string;      // Mongo key
  owner_org: string;
  created_date: string;
  updated_date: string;
  created_by: string;
  updated_by: string;

  // Classification
  assembly_type: "discrete" | "integrated" | "bus";
  antaris_component_type: string;
  name: string;
  vendor: string;
  version?: string;
  category: string; // The backend string (e.g. "Bus")
  sub_category?: string;
  sub_system?: string; // Optional for top-level bus

  // Data
  is_global: boolean;
  active?: boolean;
  is_visible: boolean;

  common_attributes: CommonAttributes;
  bus_specific_attributes?: BusSpecificAttributes;
  component_specific_attributes?: Record<string, any>;
  vendor_specific_attributes?: VendorAttribute[];

  // Relationships (Integrated components)
  child_component_ids?: Array<{ id: string; component_type: string }>;
  parent_component_id?: Array<{ id: string; component_type: string }>;
  subsystems?: Record<string, { description: string; components: any[] }>;

  // UI Derived Fields (Added during enrichment)
  componentIcon?: React.ComponentType;
  uiCategory?: CatalogCategoryTypes; // Normalized for navigation ("payload" | "bus")
  uiSubSystem?: CatalogSubsystemTypes | null;
}

// --- UI Utility Types ---

export interface CatalogCategoryGroup {
  category: string;
  count: number;
  items: CatalogItem[];
}

export interface PhysicalMetric {
  key: string;
  icon: "size" | "mass" | "power";
  value: string;
  max: string;
  progress: number;
}
