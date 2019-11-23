import Realm from 'realm';

const repository = new Realm({
  schema: [
    {
      name: 'Parking',
      primaryKey: 'id',
      properties: {
        id: { type: 'string', indexed: true },
        latitude: 'double',
        longitude: 'double',
        createdAt: 'date',
        isActive: 'bool',
      },
    },
  ],
});

const ParkingService = {
  findActive: () => {
    return repository.objects('Parking').filtered('isActive == true SORT(createdAt DESC) LIMIT(1)');
  },

  save: (parking) => {
    if (ParkingService.findActive().length > 0) {
      return;
    }

    repository.write(() => {
      repository.create('Parking', parking, true);
    });
  },

  delete: (parking) => {
    repository.write(() => {
      repository.delete(parking);
    });
  },
};

export default ParkingService;
