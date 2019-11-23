'use strict';

import Realm from 'realm';

class ParkingSpot extends Realm.Object {}

ParkingSpot.schema = {
  name: 'ParkingSpot',
  properties: {
    latitude: 'double',
    longitude: 'double',
  },
};
