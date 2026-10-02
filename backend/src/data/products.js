// In-memory products dataset structured for future MongoDB Product Model
export const products = [
  {
    id: 'prod-001',
    name: 'AcousticPure Wireless ANC Headphones',
    category: 'Electronics',
    description: 'Engineered with custom 45mm neodymium drivers and high-definition dual beamforming microphones. Featuring hybrid digital active noise cancellation, intuitive touch gesture controls, and ultra-soft memory foam earcups encased in breathable leather.',
    price: 249,
    originalPrice: 329,
    discount: 24,
    rating: 4.9,
    reviewCount: 428,
    image: '/assets/images/product_wireless_headphones_1790860169383.jpg',
    stock: 28,
    specifications: {
      batteryLife: 'Up to 40 Hours (ANC On)',
      connectivity: 'Bluetooth 5.3 & 3.5mm Aux',
      weight: '255g',
      driverSize: '45mm Neodymium',
      charging: 'USB-C Fast Charge (10 min = 5 hours)'
    }
  },
  {
    id: 'prod-002',
    name: 'AeroChronos Sapphire Minimalist Watch',
    category: 'Accessories',
    description: 'A timeless timepiece crafted from 316L surgical-grade stainless steel with anti-reflective scratchproof sapphire crystal glass. Powered by a precision Japanese Miyota quartz movement and water-resistant up to 50 meters.',
    price: 185,
    originalPrice: 220,
    discount: 16,
    rating: 4.8,
    reviewCount: 312,
    image: '/assets/images/product_minimalist_watch_1790860181229.jpg',
    stock: 14,
    specifications: {
      caseDiameter: '40mm',
      caseThickness: '8.2mm',
      glass: 'Scratch-resistant Sapphire Crystal',
      waterResistance: '5 ATM / 50 meters',
      strapWidth: '20mm Quick-Release Stainless Mesh'
    }
  },
  {
    id: 'prod-003',
    name: 'Vanguard Weatherproof Commuter Backpack',
    category: 'Fashion',
    description: 'Constructed with 840D recycled ballistic nylon and sealed YKK Aquaguard zippers. Features a suspended padded compartment accommodating laptops up to 16 inches, hidden passport pocket, and magnetic Fidlock buckle closures.',
    price: 139,
    originalPrice: 175,
    discount: 20,
    rating: 4.9,
    reviewCount: 189,
    image: '/assets/images/product_leather_backpack_1790860192374.jpg',
    stock: 35,
    specifications: {
      capacity: '24 Liters',
      laptopSleeve: 'Fits up to 16-inch MacBook Pro',
      material: '840D Recycled Ballistic Cordura',
      weight: '1.05 kg',
      dimensions: '48cm x 31cm x 16cm'
    }
  },
  {
    id: 'prod-004',
    name: 'Harmonic Aura Smart Ambient Speaker',
    category: 'Electronics',
    description: 'Fusing Scandinavian acoustic architecture with smart room calibration. Delivers rich bass and crystal-clear acoustic fidelity, paired with a custom ambient LED glow ring that syncs with relaxing twilight color temperatures.',
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.7,
    reviewCount: 204,
    image: '/assets/images/promo_lifestyle_smart_speaker_1790860204196.jpg',
    stock: 19,
    specifications: {
      outputPower: '65W Peak Audio Output',
      frequencyResponse: '45Hz - 22,000Hz',
      connectivity: 'Wi-Fi 6, AirPlay 2, Spotify Connect & Bluetooth 5.2',
      battery: 'Optional 12-hour portable battery dock',
      material: 'Acoustic Wool Blend & Anodized Aluminum'
    }
  },
  {
    id: 'prod-005',
    name: 'ApexPro KeyLite Mechanical Keyboard',
    category: 'Electronics',
    description: 'Precision CNC-machined aluminum chassis with factory-lubed custom linear switches. Dual-layer silicone sound dampening, hot-swappable sockets, and PBT double-shot keycaps for satisfying, quiet tactile acoustics.',
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    stock: 22,
    specifications: {
      layout: '75% Compact (84 Keys)',
      switchType: 'Pre-lubed Red Linear Switches',
      connection: 'Tri-mode (Bluetooth 5.1 / 2.4GHz / Type-C)',
      battery: '4000mAh (Up to 240 hours RGB off)',
      chassis: 'CNC Anodized 6063 Aluminum'
    }
  },
  {
    id: 'prod-006',
    name: 'Botanical Dew Bio-Active Serum',
    category: 'Beauty',
    description: 'An ultra-pure hydrating serum formulated with 8 botanical actives. Penetrates deep epidermal layers to lock in moisture, calm redness, and enhance natural skin barrier resilience without synthetic fragrances or silicones.',
    price: 58,
    originalPrice: 72,
    discount: 19,
    rating: 4.9,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    stock: 60,
    specifications: {
      volume: '50ml / 1.7 fl oz',
      keyIngredients: 'Hyaluronic Acid 2%, Niacinamide 5%, Centella Asiatica',
      skinType: 'All skin types, including sensitive',
      certification: 'Ecocert Certified Organic & Cruelty-Free',
      packaging: 'UV-protective frosted glass bottle'
    }
  },
  {
    id: 'prod-007',
    name: 'Nocturne Restorative Night Elixir',
    category: 'Beauty',
    description: 'Luxurious overnight facial oil that works in synergy with the circadian rhythm. Fast-absorbing, non-greasy lipid formula that visibly restores suppleness, evens tone, and imparts a luminous morning radiance.',
    price: 68,
    originalPrice: 85,
    discount: 20,
    rating: 4.7,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80',
    stock: 40,
    specifications: {
      volume: '30ml / 1.0 fl oz',
      activeLipids: '100% Plant-Derived Squalane, Cold-Pressed Rosehip Seed',
      scentProfile: 'Subtle French Lavender & Roman Chamomile',
      origin: 'Formulated and bottled in Provence, France',
      application: '3-4 drops gently pressed into cleansed skin'
    }
  },
  {
    id: 'prod-008',
    name: 'MerinoLoft Heavyweight Overshirt',
    category: 'Fashion',
    description: 'The definitive transitional overlayer. Woven from 340gsm double-faced extrafine merino wool offering natural thermal regulation, odor resistance, and an effortlessly relaxed architectural silhouette.',
    price: 165,
    originalPrice: 210,
    discount: 21,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    stock: 18,
    specifications: {
      material: '100% Extrafine Merino Wool (340 GSM)',
      buttons: 'Genuine Corozo nut horn buttons',
      pockets: 'Dual chest patch pockets with pen slot',
      fit: 'Contemporary relaxed overshirt fit',
      care: 'Dry clean or gentle hand wash cold'
    }
  },
  {
    id: 'prod-009',
    name: 'Artisan Ceramic Pour-Over Dripper Set',
    category: 'Home',
    description: 'Designed in collaboration with world champion baristas. Features precision interior extraction spiral ribs and high thermal-retention ceramic clay to ensure consistent 93°C brew temperatures for bright, clean pourovers.',
    price: 62,
    originalPrice: 75,
    discount: 17,
    rating: 4.9,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    stock: 25,
    specifications: {
      serverCapacity: '600ml (2-4 cups)',
      materials: 'High-fire Matte Stoneware & Borosilicate Glass',
      compatibility: 'Standard V60 02 filter papers',
      thermalStability: 'Heat-resistant up to 200°C',
      included: 'Ceramic dripper, glass decanter, measuring spoon'
    }
  },
  {
    id: 'prod-010',
    name: 'Lumina Minimalist Architectural Desk Lamp',
    category: 'Home',
    description: 'Sleek counterbalanced aerospace aluminum arm with a 360-degree precision gimbal head. Emits natural non-flicker light with a Color Rendering Index of 97, reproducing sunlight quality for focused creative workspaces.',
    price: 125,
    originalPrice: 155,
    discount: 19,
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    stock: 15,
    specifications: {
      lightSource: 'Dual-color LED (2700K - 5500K)',
      criRating: 'Ra ≥ 97 High Fidelity',
      powerConsumption: '12W Max',
      controls: 'Touch slider + CNC brass rotary dial',
      base: 'Weighted cast-iron foundation with silicone footing'
    }
  },
  {
    id: 'prod-011',
    name: 'Zenith Natural Stone Ultrasonic Diffuser',
    category: 'Home',
    description: 'Transforms essential oils into ultra-fine micro-mist using 2.4MHz ultrasonic frequencies without heating. Housed in a hand-crafted tactile ceramic shell with subtle base ambient halo illumination.',
    price: 79,
    originalPrice: 95,
    discount: 16,
    rating: 4.7,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    stock: 30,
    specifications: {
      reservoirCapacity: '180ml',
      runTime: 'Up to 9 hours intermittent / 5 hours continuous',
      coverageArea: 'Up to 450 sq ft',
      noiseLevel: '< 20 dB (Whisper Silent)',
      safety: 'BPA-Free with auto shut-off sensor'
    }
  },
  {
    id: 'prod-012',
    name: 'Forma High-Density Alignment Yoga Mat',
    category: 'Sports',
    description: 'Constructed from sustainably sourced biodegradable organic tree rubber topped with an ultra-absorbent polyurethane moisture-wicking surface. Provides superior joint cushioning and unyielding dry or wet grip.',
    price: 88,
    originalPrice: 110,
    discount: 20,
    rating: 4.9,
    reviewCount: 265,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
    stock: 45,
    specifications: {
      thickness: '4.5mm High-Density Cushioning',
      dimensions: '185cm x 68cm (Extra Wide & Long)',
      weight: '2.6 kg',
      material: '100% Biodegradable Natural Tree Rubber + PU',
      included: 'Cotton carrying strap'
    }
  },
  {
    id: 'prod-013',
    name: 'TitanWave Double-Walled Sports Bottle',
    category: 'Sports',
    description: 'Ultralight, taste-neutral Grade 1 titanium flask with triple-wall vacuum insulation. 45% lighter than stainless steel yet significantly more durable, completely resistant to corrosion, acidic sports beverages, and impacts.',
    price: 65,
    originalPrice: 80,
    discount: 18,
    rating: 4.8,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    stock: 32,
    specifications: {
      capacity: '750ml / 25 oz',
      material: 'Grade 1 CP Titanium',
      insulation: '36 hours cold / 18 hours piping hot',
      weight: '195g (Empty)',
      cap: 'Leakproof twist lock with silicone loop carry'
    }
  },
  {
    id: 'prod-014',
    name: 'Apex Heritage Slim Bifold Cardholder',
    category: 'Accessories',
    description: 'Hand-burnished edges stitched with bonded nylon thread. Designed to hold up to 10 cards and folded banknotes with zero bulk. Develops a rich, personalized patina over years of daily handling.',
    price: 49,
    originalPrice: 65,
    discount: 24,
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    stock: 50,
    specifications: {
      leatherType: 'Tuscan Full-Grain Vegetable-Tanned Cowhide',
      cardCapacity: '6-10 cards + folded currency',
      dimensions: '10.2cm x 7.3cm x 0.6cm',
      security: 'Built-in 13.56 MHz RFID blocking layer',
      warranty: '10-Year Craftsmanship Guarantee'
    }
  },
  {
    id: 'prod-015',
    name: 'Solace Tailored Technical Commuter Jacket',
    category: 'Fashion',
    description: 'Combines sharp sartorial suiting proportions with active outdoor performance. 10,000mm waterproof membrane with 4-way mechanical stretch, laser-cut ventilation eyelets, and invisible zippered security pockets.',
    price: 215,
    originalPrice: 270,
    discount: 20,
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    stock: 16,
    specifications: {
      waterproofRating: '10,000mm hydrostatic head',
      breathability: '15,000 g/m²/24hr',
      fabric: 'Recycled Polyester 3L DWR stretch twill',
      closure: 'Two-way YKK VISLON AquaGuard zipper',
      features: 'Laser-cut pit zips, hidden storm cuffs'
    }
  },
  {
    id: 'prod-016',
    name: 'Precision Dial Ergonomic Wireless Mouse',
    category: 'Electronics',
    description: 'Promotes neutral forearm posture to alleviate muscle strain. Equipped with an ultra-precise 8000 DPI Darkfield sensor that tracks seamlessly on all surfaces including glass, with whisper-quiet tactile switches.',
    price: 99,
    originalPrice: 120,
    discount: 17,
    rating: 4.7,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    stock: 38,
    specifications: {
      sensor: '8,000 DPI optical sensor (works on clear glass)',
      ergonomics: '57° vertical handshake grip angle',
      battery: 'Rechargeable 500mAh Li-Po (70 days per full charge)',
      multiDevice: 'Pair up to 3 devices simultaneously',
      weight: '135g balanced center of gravity'
    }
  }
];
