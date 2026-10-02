// Mock orders structured for future MongoDB Order Schema compatibility
export const TRACKING_STAGES = [
  { id: 'placed', label: 'Order Placed', description: 'Your order was verified and placed into the system.' },
  { id: 'confirmed', label: 'Order Confirmed', description: 'Payment authorized and items reserved at the fulfillment center.' },
  { id: 'packed', label: 'Packed', description: 'Inspected for quality and packed with sustainable protective materials.' },
  { id: 'shipped', label: 'Shipped', description: 'Carrier has picked up package and is en route via Express Air.' },
  { id: 'out_for_delivery', label: 'Out for Delivery', description: 'Courier agent is out delivering to your address today.' },
  { id: 'delivered', label: 'Delivered', description: 'Package safely delivered and signed for.' }
];

export const INITIAL_ORDERS = [
  {
    id: 'SS-1024',
    date: '2026-09-28',
    status: 'Shipped',
    statusCode: 4, // 1 to 6 mapped to TRACKING_STAGES
    estimatedDelivery: 'Oct 04, 2026',
    trackingNumber: 'SPH-883920194-IN',
    carrier: 'BlueDart Express Air Priority',
    paymentMethod: 'Credit Card (ending in •••• 4242)',
    items: [
      {
        id: 'prod-001',
        name: 'AcousticPure Wireless ANC Headphones',
        categoryLabel: 'Electronics',
        price: 249,
        quantity: 1,
        image: '/assets/images/product_wireless_headphones_1790860169383.jpg'
      },
      {
        id: 'prod-014',
        name: 'Apex Heritage Slim Bifold Cardholder',
        categoryLabel: 'Accessories',
        price: 49,
        quantity: 1,
        image: '/assets/images/product_leather_backpack_1790860192374.jpg'
      }
    ],
    deliveryAddress: {
      fullName: 'Alex Morgan',
      phone: '+91 98765 43210',
      house: 'Penthouse 1204, Skyline Towers',
      street: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    subtotal: 298,
    shippingFee: 0,
    tax: 23.84,
    discount: 15,
    total: 306.84,
    timeline: [
      { stage: 'Order Placed', time: 'Sep 28, 2026 - 10:14 AM', completed: true },
      { stage: 'Order Confirmed', time: 'Sep 28, 2026 - 10:30 AM', completed: true },
      { stage: 'Packed', time: 'Sep 29, 2026 - 02:45 PM', completed: true },
      { stage: 'Shipped', time: 'Sep 30, 2026 - 08:20 AM', completed: true, isCurrent: true },
      { stage: 'Out for Delivery', time: 'Estimated Oct 04, 2026', completed: false },
      { stage: 'Delivered', time: 'Estimated Oct 04, 2026', completed: false }
    ]
  },
  {
    id: 'SS-0982',
    date: '2026-09-12',
    status: 'Delivered',
    statusCode: 6,
    estimatedDelivery: 'Sep 16, 2026',
    trackingNumber: 'SPH-772190442-IN',
    carrier: 'DHL Express',
    paymentMethod: 'UPI (alex@okhdfcbank)',
    items: [
      {
        id: 'prod-002',
        name: 'AeroChronos Sapphire Minimalist Watch',
        categoryLabel: 'Accessories',
        price: 185,
        quantity: 1,
        image: '/assets/images/product_minimalist_watch_1790860181229.jpg'
      }
    ],
    deliveryAddress: {
      fullName: 'Alex Morgan',
      phone: '+91 98765 43210',
      house: 'Penthouse 1204, Skyline Towers',
      street: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    subtotal: 185,
    shippingFee: 0,
    tax: 14.80,
    discount: 0,
    total: 199.80,
    timeline: [
      { stage: 'Order Placed', time: 'Sep 12, 2026 - 04:12 PM', completed: true },
      { stage: 'Order Confirmed', time: 'Sep 12, 2026 - 04:25 PM', completed: true },
      { stage: 'Packed', time: 'Sep 13, 2026 - 11:00 AM', completed: true },
      { stage: 'Shipped', time: 'Sep 14, 2026 - 09:30 AM', completed: true },
      { stage: 'Out for Delivery', time: 'Sep 16, 2026 - 08:45 AM', completed: true },
      { stage: 'Delivered', time: 'Sep 16, 2026 - 01:20 PM', completed: true, isCurrent: true }
    ]
  }
];
