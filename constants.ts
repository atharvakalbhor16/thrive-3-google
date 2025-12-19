
import { Product } from './types';

export const CATEGORIES = [
  "T-Shirts", "Shirts", "Joggers", "Trousers", 
  "Sweatshirts & Hoodies", "Sweaters", "Jackets", 
  "Jeans", "Cargo Pants", "Overshirts", "Accessories"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'oversized-heavy-tee-slate',
    name: 'Oversized Heavy Cotton Tee',
    price: 45,
    discountPrice: 35,
    category: 'T-Shirts',
    images: [
      'https://picsum.photos/seed/street1/800/1000',
      'https://picsum.photos/seed/street2/800/1000',
      'https://picsum.photos/seed/street3/800/1000'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Slate Grey', 'Off White', 'Pitch Black'],
    stockStatus: 'In Stock',
    shortDescription: 'Heavyweight 300GSM cotton tee for the ultimate urban drape.',
    description: 'Our signature oversized tee is crafted from premium 300GSM combed cotton. Featuring drop shoulders and a boxy fit, it is designed to maintain its shape wash after wash. The Slate Grey colorway offers a muted, versatile base for any streetwear fit.',
    tags: ['oversized', 'heavyweight', 'essential'],
    isFeatured: true
  },
  {
    id: 'p2',
    slug: 'technical-cargo-pants-black',
    name: 'Tactical Utility Cargo Pants',
    price: 89,
    category: 'Cargo Pants',
    images: [
      'https://picsum.photos/seed/street4/800/1000',
      'https://picsum.photos/seed/street5/800/1000'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Black', 'Olive'],
    stockStatus: 'Low Stock',
    shortDescription: 'Multi-pocket tactical pants with water-resistant finish.',
    description: 'Engineered for the modern nomad. These cargo pants feature 8 utility pockets, reinforced knee panels, and a subtle tapered fit. Made from a durable ripstop blend with a DWR coating.',
    tags: ['tactical', 'utility', 'techwear'],
    isFeatured: true
  },
  {
    id: 'p3',
    slug: 'graphic-hoodie-cyber-rebel',
    name: 'Cyber Rebel Graphic Hoodie',
    price: 75,
    discountPrice: 60,
    category: 'Sweatshirts & Hoodies',
    images: [
      'https://picsum.photos/seed/street6/800/1000',
      'https://picsum.photos/seed/street7/800/1000'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Neon Green/Black'],
    stockStatus: 'In Stock',
    shortDescription: 'Bold graphic print on premium French Terry.',
    description: 'Stand out in the concrete jungle. This hoodie features high-density screen-printed graphics on the back and sleeves. Constructed from 400GSM French Terry for maximum comfort and warmth.',
    tags: ['graphic', 'hoodie', 'bold'],
    isFeatured: false
  },
  {
    id: 'p4',
    slug: 'distressed-slim-jeans',
    name: 'Destroyed Slim-Fit Jeans',
    price: 95,
    category: 'Jeans',
    images: [
      'https://picsum.photos/seed/street8/800/1000'
    ],
    sizes: ['28', '30', '32', '34'],
    colors: ['Acid Wash Blue'],
    stockStatus: 'In Stock',
    shortDescription: 'Hand-distressed denim with a perfect slim taper.',
    description: 'Our distressed denim is finished by hand for a unique worn-in look. Featuring custom hardware and a classic five-pocket construction.',
    tags: ['denim', 'slim', 'distressed'],
    isFeatured: true
  },
  {
    id: 'p5',
    slug: 'puffer-jacket-arctic',
    name: 'Arctic Puffer Jacket',
    price: 180,
    discountPrice: 150,
    category: 'Jackets',
    images: [
      'https://picsum.photos/seed/street9/800/1000',
      'https://picsum.photos/seed/street10/800/1000'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Matte Black', 'Silver'],
    stockStatus: 'In Stock',
    shortDescription: 'Ultra-warm down alternative puffer for extreme cold.',
    description: 'The ultimate winter essential. Lightweight yet incredibly warm, featuring a high collar, adjustable hem, and internal chest pocket.',
    tags: ['winter', 'outerwear', 'jacket'],
    isFeatured: true
  },
  {
    id: 'p6',
    slug: 'retro-varsity-jacket',
    name: 'Retro Archive Varsity Jacket',
    price: 120,
    category: 'Jackets',
    images: [
      'https://picsum.photos/seed/street11/800/1000'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy/Cream'],
    stockStatus: 'Low Stock',
    shortDescription: 'Wool blend body with vegan leather sleeves.',
    description: 'Nostalgia meets street culture. This varsity jacket features chenille patches and a quilted lining for a premium feel.',
    tags: ['varsity', 'jacket', 'classic'],
    isFeatured: false
  },
  {
    id: 'p7',
    slug: 'flannel-overshirt',
    name: 'Heavyweight Flannel Overshirt',
    price: 65,
    category: 'Overshirts',
    images: [
      'https://picsum.photos/seed/street12/800/1000'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red Plaid', 'Grey Plaid'],
    stockStatus: 'In Stock',
    shortDescription: 'Thick brushed flannel for layering.',
    description: 'The perfect transitional piece. Layer it over a hoodie or wear it on its own. Soft brushed finish with dual chest pockets.',
    tags: ['layering', 'flannel', 'casual'],
    isFeatured: false
  }
];
