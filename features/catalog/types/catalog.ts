export interface CatalogItem {
  id: string;
  name: string;
  subtitle?: string;
  category?: string;
  specs: {
    size?: string;
    mass?: string;
    power?: string;
    gsd?: string;
    swath?: string;
    [key: string]: string | undefined;
  };
  tags: string[];
}

export interface CatalogCategoryGroup {
  category: string;
  count: number;
  items: CatalogItem[];
}

export interface PhysicalMetric {
  key: string
  icon: "size" | "mass" | "power"
  value: string
  max: string
  progress: number
}

export interface PhysicalMetricSource {
  key: string
  icon: PhysicalMetric["icon"]
  value?: string
  max: string
  maxValue: number
  fallbackValue?: string
}
