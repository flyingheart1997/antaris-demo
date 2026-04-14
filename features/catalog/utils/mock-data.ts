import type { CatalogItem } from "../types/catalog";

export const mockCatalogItems: CatalogItem[] = [
  {
    id: "1",
    name: "XDLINX 2M Imager",
    category: "Imager",
    specs: {
      size: "8 U",
      mass: "10 Kg",
      power: "6 W",
      gsd: "2 M",
      swath: "14 Km",
    },
    tags: ["USB", "LVDS"],
  },
  {
    id: "2",
    name: "SAR-X Band Radar",
    category: "SAR",
    specs: {
      size: "U24",
      mass: "42.0 kg",
      power: "150W peak",
      gsd: "1.5 M",
      swath: "50 km",
    },
    tags: ["X-Band", "SAR"],
  },
  {
    id: "3",
    name: "HyperSpec-9",
    category: "Imager",
    specs: {
      size: "U6",
      mass: "7.2 kg",
      power: "15W avg",
      gsd: "4 M",
      swath: "10 km",
    },
    tags: ["Hyperspectral"],
  },
  {
    id: "4",
    name: "AIS Receiver Pro",
    category: "AIS",
    specs: {
      size: "1 U",
      mass: "0.5 Kg",
      power: "2 W",
      gsd: "12 M",
      swath: "N/A",
    },
    tags: ["AIS", "VHF"],
  },
  {
    id: "5",
    name: "DragonEye Optic",
    category: "Imager",
    specs: {
      size: "U12",
      mass: "12.5 kg",
      power: "25 W",
      gsd: "0.8 M",
      swath: "20 km",
    },
    tags: ["Optical", "High-Res"],
  },
  {
    id: "6",
    name: "L-Band SAR payload",
    category: "SAR",
    specs: {
      size: "U36",
      mass: "36.0 kg",
      power: "200W perk",
      gsd: "1 M",
      swath: "60 km",
    },
    tags: ["L-Band", "SAR"],
  },
];
