'use strict';

import uuid from 'uuid';

class ParkingModel {
  constructor(latitude, longitude) {
    this.id = uuid();
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = new Date();
    this.isActive = false;
  }
}

export default ParkingModel;
