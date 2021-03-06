import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useCurrentLocation from '../hooks/CurrentLocation';
import ParkingService from '../services/ParkingService';
import ParkingModel from '../models/ParkingModel';
import Colors from '../constants/colors';
import DISTANCE from '../constants/distance';
import ParkingReached from '../components/ParkingReached';

const deltas = { latitudeDelta: 0.001, longitudeDelta: 0.001 };

const distanceInMeters = (latLng1, latLng2) => {
  if (latLng1.latitude === latLng2.latitude && latLng1.longitude === latLng2.longitude) {
    return 0;
  }

  let radlat1 = (Math.PI * latLng1.latitude) / 180;
  let radlat2 = (Math.PI * latLng2.latitude) / 180;
  let radtheta = (Math.PI * (latLng1.longitude - latLng2.longitude)) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = ((Math.acos(dist) * 180) / Math.PI) * 60 * 1.1515 * 1609.344;
  return dist;
};

const MapUnderlay = (props) => {
  const [parkingLocation, setParkingLocation] = useState(ParkingService.findParking()[0]);
  const { currentLocation } = useCurrentLocation();
  const lastPosition = useRef({ latitude: 0, longitude: 0 });
  const [returnedToParking, setReturnedToParking] = useState(false);

  useEffect(() => {
    if (currentLocation.latitude && currentLocation.longitude) {
      // Redraw map if necessary
      const distanceMoved = distanceInMeters(currentLocation, lastPosition.current);
      if (distanceMoved >= DISTANCE.MAP_UPDATE_THRESHOLD) {
        this.map.animateToRegion({ ...currentLocation, ...deltas }, 500);
      }
      lastPosition.current = currentLocation;

      // Manage the state of the parking object
      if (parkingLocation) {
        const distanceToParking = distanceInMeters(currentLocation, parkingLocation);
        if (parkingLocation.isActive) {
          if (distanceToParking < DISTANCE.FILTER) {
            setReturnedToParking(true);
          }
        } else {
          if (distanceToParking >= DISTANCE.INACTIVE_THRESHOLD) {
            ParkingService.setActive(parkingLocation);
          }
        }
      }
    }
  }, [currentLocation, parkingLocation]);

  const deleteParking = () => {
    console.log('deleteParking Called');
    ParkingService.delete(parkingLocation);
    setParkingLocation(ParkingService.findParking()[0]);
  };

  const saveParking = () => {
    ParkingService.save(new ParkingModel(currentLocation.latitude, currentLocation.longitude));
    setParkingLocation(ParkingService.findParking()[0]);
  };

  const renderSaveButton = () => {
    if (!parkingLocation) {
      return (
        <ActionButton.Item buttonColor="white" title="Save Parking" onPress={saveParking}>
          <Icon name="ios-save" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      );
    }
  };

  const renderParkingButton = () => {
    if (parkingLocation) {
      return (
        <ActionButton.Item
          buttonColor="white"
          title="Parking Location"
          onPress={() => {
            this.map.fitToCoordinates([currentLocation, parkingLocation], {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            });
          }}>
          <Icon name="ios-car" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      );
    }
  };

  const renderDeleteButton = () => {
    if (parkingLocation) {
      return (
        <ActionButton.Item buttonColor="white" title="Delete Parking" onPress={deleteParking}>
          <Icon name="ios-trash" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      );
    }
  };

  const renderParkingMarker = () => {
    if (parkingLocation) {
      return (
        <MapView.Marker coordinate={parkingLocation}>
          <Image style={styles.marker} source={require('../../assets/marker.png')} />
        </MapView.Marker>
      );
    }
  };

  const renderCurrentLocationButton = () => {
    return (
      <ActionButton.Item
        buttonColor="white"
        title="Current Location"
        onPress={() => {
          this.map.animateToRegion({ ...currentLocation, ...deltas }, 500);
        }}>
        <Icon name="md-locate" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    );
  };

  return (
    <View style={styles.map}>
      <MapView
        ref={(ref) => (this.map = ref)}
        initialRegion={{ ...lastPosition.current, ...deltas }}
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}>
        {renderParkingMarker()}
      </MapView>

      <ActionButton
        buttonColor="white"
        renderIcon={(active) => <Icon name="ios-add" style={styles.actionButtonIcon} />}>
        {renderParkingButton()}
        {renderDeleteButton()}
        {renderSaveButton()}
        {renderCurrentLocationButton()}
      </ActionButton>

      <ParkingReached
        visible={returnedToParking}
        onPressHandler={setReturnedToParking}
        onDismiss={deleteParking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: Colors.salmon,
  },
  marker: {
    width: 60,
    height: 60,
    marginBottom: 40,
  },
});

export default MapUnderlay;
