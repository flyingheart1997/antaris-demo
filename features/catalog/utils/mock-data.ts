import type { CatalogItem } from "../types/catalog";

export const mockCatalogItems: CatalogItem[] = [
  {
    id: "1",
    name: "XDLINX 2M Imager",
    category: "Multispectral",
    specs: {
      size: "8 U",
      mass: "10 Kg",
      power: "6 W",
      swath: "14 Km",
    },
    tags: ["USB"],
  },
  {
    id: "2",
    name: "SAR-X Band Radar",
    category: "Radar",
    specs: {
      size: "U24",
      mass: "42.0 kg",
      power: "150W peak",
      swath: "50 km",
    },
    tags: ["X-Band", "SAR"],
  },
  {
    id: "3",
    name: "HyperSpec-9",
    category: "Science",
    specs: {
      size: "U6",
      mass: "7.2 kg",
      power: "15W avg",
      swath: "10 km",
    },
    tags: ["Hyperspectral"],
  },
];
