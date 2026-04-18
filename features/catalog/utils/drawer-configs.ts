import {
  PayloadIcon,
  EarthobservationIcon,
  CommsIcon,
  EdgeIcon,
  CustomIcon,
  BusIcon,
  ProcessorIcon,
  EpsIcon,
  AdcsIcon,
  GpsIcon,
  TempIcon,
  ThrusterIcon,
} from "@/icons";
import { CatalogCategoryTypes, CatalogSubsystemTypes, CategoryConfigType } from "../types/catalog-selection-state-types";

export const CATEGORY_CONFIGS: CategoryConfigType[] = [
  {
    label: "Payload",
    value: "payload",
    icon: PayloadIcon,
    items: [
      { label: "Earth Observation", value: "earth-observation", icon: EarthobservationIcon },
      { label: "Comms", value: "comms", icon: CommsIcon },
      { label: "Edge", value: "edge", icon: EdgeIcon },
      { label: "Custom", value: "custom", icon: CustomIcon },
    ]
  },
  {
    label: "Bus",
    value: "bus",
    icon: BusIcon,
    items: [
      { label: "Processor", value: "processor", icon: ProcessorIcon },
      { label: "Comms", value: "comms", icon: CommsIcon },
      { label: "EPS", value: "eps", icon: EpsIcon },
      { label: "ADCS", value: "adcs", icon: AdcsIcon },
      { label: "GPS", value: "gps", icon: GpsIcon },
      { label: "Temperature", value: "temperature", icon: TempIcon },
      { label: "Thruster", value: "thruster", icon: ThrusterIcon },
      { label: "Custom", value: "custom", icon: CustomIcon },
    ]
  }
];

export const getCategoryConfig = (categoryType: CatalogCategoryTypes) => {
  return CATEGORY_CONFIGS.find((d) => d.value === categoryType)
}

export const getSubsystemConfig = (categoryType: CatalogCategoryTypes, subsystemType: CatalogSubsystemTypes | null) => {
  const category = CATEGORY_CONFIGS.find((d) => d.value === categoryType)
  if (!category) return null
  else if (!subsystemType) return category
  else return category.items.find((i) => i.value === subsystemType)
}
