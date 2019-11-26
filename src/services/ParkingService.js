import Realm from 'realm';
import Parking from '../schemas/Parking';

const repository = new Realm({ schema: [Parking] });

const ParkingService = {
  findParking: () => {
    return repository
      .objects('Parking')
      .sorted('createdAt', true)
      .slice(0, 1);
  },

  save: (parking) => {
    if (ParkingService.findParking().length > 0) {
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

  setActive: (parking) => {
    repository.write(() => {
      parking.isActive = true;
    });
  },
};

export default ParkingService;
