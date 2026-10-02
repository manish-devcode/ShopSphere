// In-memory address book dataset structured for MongoDB Address model
export const addresses = [
  {
    id: 'addr_001',
    userId: 'user_001',
    fullName: 'Alex Morgan',
    phone: '+91 98765 43210',
    house: 'Penthouse 1204, Skyline Towers',
    street: '100ft Road',
    area: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    landmark: 'Opposite Metro Pillar 42',
    isDefault: true
  },
  {
    id: 'addr_002',
    userId: 'user_001',
    fullName: 'Alex Morgan (Studio)',
    phone: '+91 98765 43210',
    house: 'Unit 3B, Design Collective Studio',
    street: '80ft Main Road',
    area: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    landmark: 'Near Sony World Junction',
    isDefault: false
  }
];
