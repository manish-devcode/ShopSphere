// Mock saved delivery addresses structured for MongoDB / REST API compatibility
export const INITIAL_ADDRESSES = [
  {
    id: 'addr-101',
    fullName: 'Alex Morgan',
    phone: '+91 98765 43210',
    house: 'Penthouse 1204, Skyline Towers',
    street: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    landmark: 'Opposite Metro Pillar 42',
    isDefault: true,
    tag: 'Home'
  },
  {
    id: 'addr-102',
    fullName: 'Alex Morgan (Studio)',
    phone: '+91 98765 43210',
    house: 'Unit 3B, Design Collective Studio',
    street: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    landmark: 'Near Sony World Junction',
    isDefault: false,
    tag: 'Work'
  }
];
