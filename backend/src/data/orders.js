// In-memory orders dataset structured for future MongoDB Order model
export const ALLOWED_ORDER_STATUSES = [
  'ORDER_PLACED',
  'CONFIRMED',
  'PACKED',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED'
];

export const orders = [
  {
    id: 'SS1024',
    userId: 'user_001',
    items: [
      {
        id: 'prod-001',
        name: 'AcousticPure Wireless ANC Headphones',
        category: 'Electronics',
        price: 249,
        quantity: 1,
        image: '/src/assets/images/product_wireless_headphones_1790860169383.jpg'
      },
      {
        id: 'prod-014',
        name: 'Apex Heritage Slim Bifold Cardholder',
        category: 'Accessories',
        price: 49,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'
      }
    ],
    totalAmount: 298,
    deliveryAddress: {
      fullName: 'Alex Morgan',
      phone: '+91 98765 43210',
      house: 'Penthouse 1204, Skyline Towers',
      street: '100ft Road',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      landmark: 'Opposite Metro Pillar 42'
    },
    paymentMethod: 'CARD',
    status: 'SHIPPED',
    createdAt: '2026-09-28T10:14:00.000Z',
    updatedAt: '2026-09-30T08:20:00.000Z'
  },
  {
    id: 'SS0982',
    userId: 'user_001',
    items: [
      {
        id: 'prod-002',
        name: 'AeroChronos Sapphire Minimalist Watch',
        category: 'Accessories',
        price: 185,
        quantity: 1,
        image: '/src/assets/images/product_minimalist_watch_1790860181229.jpg'
      }
    ],
    totalAmount: 185,
    deliveryAddress: {
      fullName: 'Alex Morgan',
      phone: '+91 98765 43210',
      house: 'Penthouse 1204, Skyline Towers',
      street: '100ft Road',
      area: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      landmark: 'Opposite Metro Pillar 42'
    },
    paymentMethod: 'UPI',
    status: 'DELIVERED',
    createdAt: '2026-09-12T16:12:00.000Z',
    updatedAt: '2026-09-16T13:20:00.000Z'
  }
];
