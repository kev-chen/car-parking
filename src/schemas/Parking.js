const Parking = {
  name: 'Parking',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    latitude: 'double',
    longitude: 'double',
    createdAt: 'date',
    isActive: 'bool',
  },
};

export default Parking;
