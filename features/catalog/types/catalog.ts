export interface CatalogItem {
  id: string;
  name: string;
  subtitle?: string;
  category?: string;
  specs: {
    size?: string;
    mass?: string;
    power?: string;
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
