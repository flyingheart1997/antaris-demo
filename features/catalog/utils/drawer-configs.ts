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
  ThrusterIcon
} from "@/icons";
import { CatalogDrawerTypes, CatalogComponentTypes, DrawerConfigType } from "../types/catalog-selection-state-types";

export const DRAWER_CONFIGS: DrawerConfigType[] = [
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

export const getDrawerConfig = (drawerType: CatalogDrawerTypes) => {
  return DRAWER_CONFIGS.find((d) => d.value === drawerType)
}

export const getDrawerItemConfig = (drawerType: CatalogDrawerTypes, componentType: CatalogComponentTypes | null) => {
  const drawer = DRAWER_CONFIGS.find((d) => d.value === drawerType)
  if (!drawer) return null
  else if (!componentType) return drawer
  else return drawer.items.find((i) => i.value === componentType)
}

