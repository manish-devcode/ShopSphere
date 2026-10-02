// Realistic mock product dataset with distinct, high-resolution photography for each product
export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 16 },
  { id: 'electronics', name: 'Electronics', icon: 'Headphones', count: 4 },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 3 },
  { id: 'home', name: 'Home', icon: 'Home', count: 3 },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkle', count: 2 },
  { id: 'sports', name: 'Sports', icon: 'Activity', count: 2 },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', count: 2 },
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'AcousticPure Wireless ANC Headphones',
    category: 'electronics',
    categoryLabel: 'Electronics',
    tagline: 'Precision active noise cancellation with 40-hour playback',
    description: 'Engineered with custom 45mm neodymium drivers and high-definition dual beamforming microphones. Featuring hybrid digital active noise cancellation, intuitive touch controls, and ultra-soft memory foam earcups encased in breathable leather.',
    price: 249,
    originalPrice: 329,
    discount: 24,
    rating: 4.9,
    reviewCount: 428,
    image: '/assets/images/product_wireless_headphones_1790860169383.jpg',
    stock: 28,
    isFeatured: true,
    isNew: false,
    specifications: {
      'Battery Life': 'Up to 40 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Weight': '255g',
      'Driver Size': '45mm Neodymium',
      'Charging': 'USB-C Fast Charge (10 min = 5 hours)'
    }
  },
  {
    id: 'prod-002',
    name: 'AeroChronos Sapphire Minimalist Watch',
    category: 'accessories',
    categoryLabel: 'Accessories',
    tagline: 'Bauhaus-inspired chronograph with scratchproof sapphire crystal',
    description: 'A timeless timepiece crafted from 316L surgical-grade stainless steel with anti-reflective scratchproof sapphire crystal glass. Powered by a precision Japanese Miyota quartz movement and water-resistant up to 50 meters.',
    price: 185,
    originalPrice: 220,
    discount: 16,
    rating: 4.8,
    reviewCount: 312,
    image: '/assets/images/product_minimalist_watch_1790860181229.jpg',
    stock: 14,
    isFeatured: true,
    isNew: true,
    specifications: {
      'Case Diameter': '40mm',
      'Case Thickness': '8.2mm',
      'Glass': 'Scratch-resistant Sapphire Crystal',
      'Water Resistance': '5 ATM / 50 meters',
      'Strap Width': '20mm Quick-Release Stainless Mesh'
    }
  },
  {
    id: 'prod-003',
    name: 'Vanguard Weatherproof Commuter Backpack',
    category: 'fashion',
    categoryLabel: 'Fashion',
    tagline: 'Modular 24L waterproof pack engineered for modern travel',
    description: 'Constructed with 840D recycled ballistic nylon and sealed YKK Aquaguard zippers. Features a suspended padded compartment accommodating laptops up to 16 inches, hidden passport pocket, and magnetic Fidlock buckle closures.',
    price: 139,
    originalPrice: 175,
    discount: 20,
    rating: 4.9,
    reviewCount: 189,
    image: '/assets/images/product_leather_backpack_1790860192374.jpg',
    stock: 35,
    isFeatured: true,
    isNew: false,
    specifications: {
      'Capacity': '24 Liters',
      'Laptop Sleeve': 'Fits up to 16-inch MacBook Pro',
      'Material': '840D Recycled Ballistic Cordura',
      'Weight': '1.05 kg',
      'Dimensions': '48cm x 31cm x 16cm'
    }
  },
  {
    id: 'prod-004',
    name: 'Harmonic Aura Smart Ambient Speaker',
    category: 'electronics',
    categoryLabel: 'Electronics',
    tagline: '360° omnidirectional acoustic sound with warm circular ambient glow',
    description: 'Fusing Scandinavian acoustic architecture with smart room calibration. Delivers rich bass and crystal-clear acoustic fidelity, paired with a custom ambient LED glow ring that syncs with relaxing twilight color temperatures.',
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.7,
    reviewCount: 204,
    image: '/assets/images/promo_lifestyle_smart_speaker_1790860204196.jpg',
    stock: 19,
    isFeatured: true,
    isNew: true,
    specifications: {
      'Output Power': '65W Peak Audio Output',
      'Frequency Response': '45Hz - 22,000Hz',
      'Connectivity': 'Wi-Fi 6, AirPlay 2, Spotify Connect & Bluetooth 5.2',
      'Battery': 'Optional 12-hour portable battery dock',
      'Material': 'Acoustic Wool Blend & Anodized Aluminum'
    }
  },
  {
    id: 'prod-005',
    name: 'ApexPro KeyLite Mechanical Keyboard',
    category: 'electronics',
    categoryLabel: 'Electronics',
    tagline: 'Low-profile wireless mechanical switches with gasket-mounted dampening',
    description: 'Precision CNC-machined aluminum chassis with factory-lubed custom linear switches. Dual-layer silicone sound dampening, hot-swappable sockets, and PBT double-shot keycaps for satisfying, quiet tactile acoustics.',
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    stock: 22,
    isFeatured: false,
    isNew: true,
    specifications: {
      'Layout': '75% Compact (84 Keys)',
      'Switch Type': 'Pre-lubed Red Linear Switches',
      'Connection': 'Tri-mode (Bluetooth 5.1 / 2.4GHz / Type-C)',
      'Battery': '4000mAh (Up to 240 hours RGB off)',
      'Chassis': 'CNC Anodized 6063 Aluminum'
    }
  },
  {
    id: 'prod-006',
    name: 'Botanical Dew Bio-Active Serum',
    category: 'beauty',
    categoryLabel: 'Beauty',
    tagline: 'Triple-molecular hyaluronic complex with fermented green tea extract',
    description: 'An ultra-pure hydrating serum formulated with 8 botanical actives. Penetrates deep epidermal layers to lock in moisture, calm redness, and enhance natural skin barrier resilience without synthetic fragrances or silicones.',
    price: 58,
    originalPrice: 72,
    discount: 19,
    rating: 4.9,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    stock: 60,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Volume': '50ml / 1.7 fl oz',
      'Key Ingredients': 'Hyaluronic Acid 2%, Niacinamide 5%, Centella Asiatica',
      'Skin Type': 'All skin types, including sensitive',
      'Certification': 'Ecocert Certified Organic & Cruelty-Free',
      'Packaging': 'UV-protective frosted glass bottle'
    }
  },
  {
    id: 'prod-007',
    name: 'Nocturne Restorative Night Elixir',
    category: 'beauty',
    categoryLabel: 'Beauty',
    tagline: 'Overnight cell-renewal oil infused with cold-pressed rosehip & squalane',
    description: 'Luxurious overnight facial oil that works in synergy with the circadian rhythm. Fast-absorbing, non-greasy lipid formula that visibly restores suppleness, evens tone, and imparts a luminous morning radiance.',
    price: 68,
    originalPrice: 85,
    discount: 20,
    rating: 4.7,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80',
    stock: 40,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Volume': '30ml / 1.0 fl oz',
      'Active Lipids': '100% Plant-Derived Squalane, Cold-Pressed Rosehip Seed',
      'Scent Profile': 'Subtle French Lavender & Roman Chamomile',
      'Origin': 'Formulated and bottled in Provence, France',
      'Application': '3-4 drops gently pressed into cleansed skin'
    }
  },
  {
    id: 'prod-008',
    name: 'MerinoLoft Heavyweight Overshirt',
    category: 'fashion',
    categoryLabel: 'Fashion',
    tagline: '100% fine Italian merino wool with reinforced horn buttons',
    description: 'The definitive transitional overlayer. Woven from 340gsm double-faced extrafine merino wool offering natural thermal regulation, odor resistance, and an effortlessly relaxed architectural silhouette.',
    price: 165,
    originalPrice: 210,
    discount: 21,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    stock: 18,
    isFeatured: false,
    isNew: true,
    specifications: {
      'Material': '100% Extrafine Merino Wool (340 GSM)',
      'Buttons': 'Genuine Corozo nut horn buttons',
      'Pockets': 'Dual chest patch pockets with pen slot',
      'Fit': 'Contemporary relaxed overshirt fit',
      'Care': 'Dry clean or gentle hand wash cold'
    }
  },
  {
    id: 'prod-009',
    name: 'Artisan Ceramic Pour-Over Dripper Set',
    category: 'home',
    categoryLabel: 'Home',
    tagline: 'Hand-thrown stoneware cone dripper with borosilicate server',
    description: 'Designed in collaboration with world champion baristas. Features precision interior extraction spiral ribs and high thermal-retention ceramic clay to ensure consistent 93°C brew temperatures for bright, clean pourovers.',
    price: 62,
    originalPrice: 75,
    discount: 17,
    rating: 4.9,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    stock: 25,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Server Capacity': '600ml (2-4 cups)',
      'Materials': 'High-fire Matte Stoneware & Borosilicate Glass',
      'Compatibility': 'Standard V60 02 filter papers',
      'Thermal Stability': 'Heat-resistant up to 200°C',
      'Included': 'Ceramic dripper, glass decanter, measuring spoon'
    }
  },
  {
    id: 'prod-010',
    name: 'Lumina Minimalist Architectural Desk Lamp',
    category: 'home',
    categoryLabel: 'Home',
    tagline: 'High-CRI 97 eye-care illumination with stepless rotary dimming',
    description: 'Sleek counterbalanced aerospace aluminum arm with a 360-degree precision gimbal head. Emits natural non-flicker light with a Color Rendering Index of 97, reproducing sunlight quality for focused creative workspaces.',
    price: 125,
    originalPrice: 155,
    discount: 19,
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    stock: 15,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Light Source': 'Dual-color LED (2700K - 5500K)',
      'CRI Rating': 'Ra ≥ 97 High Fidelity',
      'Power Consumption': '12W Max',
      'Controls': 'Touch slider + CNC brass rotary dial',
      'Base': 'Weighted cast-iron foundation with silicone footing'
    }
  },
  {
    id: 'prod-011',
    name: 'Zenith Natural Stone Ultrasonic Diffuser',
    category: 'home',
    categoryLabel: 'Home',
    tagline: 'Carved natural ceramic stone shell with whisper-quiet atomization',
    description: 'Transforms essential oils into ultra-fine micro-mist using 2.4MHz ultrasonic frequencies without heating. Housed in a hand-crafted tactile ceramic shell with subtle base ambient halo illumination.',
    price: 79,
    originalPrice: 95,
    discount: 16,
    rating: 4.7,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    stock: 30,
    isFeatured: false,
    isNew: true,
    specifications: {
      'Reservoir Capacity': '180ml',
      'Run Time': 'Up to 9 hours intermittent / 5 hours continuous',
      'Coverage Area': 'Up to 450 sq ft',
      'Noise Level': '< 20 dB (Whisper Silent)',
      'Safety': 'BPA-Free with auto shut-off sensor'
    }
  },
  {
    id: 'prod-012',
    name: 'Forma High-Density Alignment Yoga Mat',
    category: 'sports',
    categoryLabel: 'Sports',
    tagline: 'Non-slip natural tree rubber with laser-etched alignment guides',
    description: 'Constructed from sustainably sourced biodegradable organic tree rubber topped with an ultra-absorbent polyurethane moisture-wicking surface. Provides superior joint cushioning and unyielding dry or wet grip.',
    price: 88,
    originalPrice: 110,
    discount: 20,
    rating: 4.9,
    reviewCount: 265,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
    stock: 45,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Thickness': '4.5mm High-Density Cushioning',
      'Dimensions': '185cm x 68cm (Extra Wide & Long)',
      'Weight': '2.6 kg',
      'Material': '100% Biodegradable Natural Tree Rubber + PU',
      'Included': 'Cotton carrying strap'
    }
  },
  {
    id: 'prod-013',
    name: 'TitanWave Double-Walled Sports Bottle',
    category: 'sports',
    categoryLabel: 'Sports',
    tagline: 'Grade 1 pure titanium vacuum insulation keeps cold for 36 hours',
    description: 'Ultralight, taste-neutral Grade 1 titanium flask with triple-wall vacuum insulation. 45% lighter than stainless steel yet significantly more durable, completely resistant to corrosion, acidic sports beverages, and impacts.',
    price: 65,
    originalPrice: 80,
    discount: 18,
    rating: 4.8,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    stock: 32,
    isFeatured: false,
    isNew: true,
    specifications: {
      'Capacity': '750ml / 25 oz',
      'Material': 'Grade 1 CP Titanium',
      'Insulation': '36 hours cold / 18 hours piping hot',
      'Weight': '195g (Empty)',
      'Cap': 'Leakproof twist lock with silicone loop carry'
    }
  },
  {
    id: 'prod-014',
    name: 'Apex Heritage Slim Bifold Cardholder',
    category: 'accessories',
    categoryLabel: 'Accessories',
    tagline: 'Vegetable-tanned full-grain Tuscan leather with RFID shielding',
    description: 'Hand-burnished edges stitched with bonded nylon thread. Designed to hold up to 10 cards and folded banknotes with zero bulk. Develops a rich, personalized patina over years of daily handling.',
    price: 49,
    originalPrice: 65,
    discount: 24,
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    stock: 50,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Leather Type': 'Tuscan Full-Grain Vegetable-Tanned Cowhide',
      'Card Capacity': '6-10 cards + folded currency',
      'Dimensions': '10.2cm x 7.3cm x 0.6cm',
      'Security': 'Built-in 13.56 MHz RFID blocking layer',
      'Warranty': '10-Year Craftsmanship Guarantee'
    }
  },
  {
    id: 'prod-015',
    name: 'Solace Tailored Technical Commuter Jacket',
    category: 'fashion',
    categoryLabel: 'Fashion',
    tagline: 'Breathable 3-layer weatherproof shell with hidden packable hood',
    description: 'Combines sharp sartorial suiting proportions with active outdoor performance. 10,000mm waterproof membrane with 4-way mechanical stretch, laser-cut ventilation eyelets, and invisible zippered security pockets.',
    price: 215,
    originalPrice: 270,
    discount: 20,
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    stock: 16,
    isFeatured: false,
    isNew: true,
    specifications: {
      'Waterproof Rating': '10,000mm hydrostatic head',
      'Breathability': '15,000 g/m²/24hr',
      'Fabric': 'Recycled Polyester 3L DWR stretch twill',
      'Closure': 'Two-way YKK VISLON AquaGuard zipper',
      'Features': 'Laser-cut pit zips, hidden storm cuffs'
    }
  },
  {
    id: 'prod-016',
    name: 'Precision Dial Ergonomic Wireless Mouse',
    category: 'electronics',
    categoryLabel: 'Electronics',
    tagline: 'Sculpted natural 57-degree hand angle with dual electromagnetic wheels',
    description: 'Promotes neutral forearm posture to alleviate muscle strain. Equipped with an ultra-precise 8000 DPI Darkfield sensor that tracks seamlessly on all surfaces including glass, with whisper-quiet tactile switches.',
    price: 99,
    originalPrice: 120,
    discount: 17,
    rating: 4.7,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    stock: 38,
    isFeatured: false,
    isNew: false,
    specifications: {
      'Sensor': '8,000 DPI optical sensor (works on clear glass)',
      'Ergonomics': '57° vertical handshake grip angle',
      'Battery': 'Rechargeable 500mAh Li-Po (70 days per full charge)',
      'Multi-Device': 'Pair up to 3 devices simultaneously',
      'Weight': '135g balanced center of gravity'
    }
  }
];

// Initial mock user profile
export const MOCK_USER = {
  id: 'usr-8821',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  memberSince: 'March 2024',
  loyaltyTier: 'ShopSphere Member',
  loyaltyPoints: 1250,
};

// Initial mock addresses
export const MOCK_ADDRESSES = [
  {
    id: 'addr-01',
    isDefault: true,
    fullName: 'Alex Morgan',
    phone: '+91 98765 43210',
    house: 'Penthouse 1204, Skyline Towers',
    street: '100ft Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    landmark: 'Opposite Metro Pillar 42'
  },
  {
    id: 'addr-02',
    isDefault: false,
    fullName: 'Alex Morgan (Studio)',
    phone: '+91 98765 43210',
    house: 'Unit 3B, Design Collective Studio',
    street: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    landmark: 'Near Sony World Junction'
  }
];

// Initial mock orders
export const MOCK_ORDERS = [
  {
    id: 'SS1024',
    date: 'Sep 28, 2026',
    status: 'Shipped',
    statusCode: 4,
    expectedDelivery: 'Oct 04, 2026',
    trackingNumber: 'SPH-883920194',
    carrier: 'BlueDart Express',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: 'prod-001',
        name: 'AcousticPure Wireless ANC Headphones',
        price: 249,
        quantity: 1,
        image: '/assets/images/product_wireless_headphones_1790860169383.jpg'
      },
      {
        id: 'prod-014',
        name: 'Apex Heritage Slim Bifold Cardholder',
        price: 49,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 298,
    shippingFee: 0,
    total: 298,
    shippingAddress: {
      fullName: 'Alex Morgan',
      house: 'Penthouse 1204, Skyline Towers',
      street: '100ft Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    }
  },
  {
    id: 'SS0982',
    date: 'Sep 12, 2026',
    status: 'Delivered',
    statusCode: 6,
    expectedDelivery: 'Sep 16, 2026',
    trackingNumber: 'SPH-772190442',
    carrier: 'DHL Express',
    paymentMethod: 'UPI',
    items: [
      {
        id: 'prod-002',
        name: 'AeroChronos Sapphire Minimalist Watch',
        price: 185,
        quantity: 1,
        image: '/assets/images/product_minimalist_watch_1790860181229.jpg'
      }
    ],
    subtotal: 185,
    shippingFee: 0,
    total: 185,
    shippingAddress: {
      fullName: 'Alex Morgan',
      house: 'Penthouse 1204, Skyline Towers',
      street: '100ft Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    }
  }
];

export const ORDER_STATUS_STEPS = [
  { step: 1, title: 'Order Placed' },
  { step: 2, title: 'Confirmed' },
  { step: 3, title: 'Packed' },
  { step: 4, title: 'Shipped' },
  { step: 5, title: 'Out for Delivery' },
  { step: 6, title: 'Delivered' }
];
