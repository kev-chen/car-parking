import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useCurrentLocation from '../hooks/CurrentLocation';
import ParkingService from '../services/ParkingService';
import ParkingModel from '../models/ParkingModel';
import Colors from '../constants/colors';

const deltas = { latitudeDelta: 0.001, longitudeDelta: 0.001 };

const MapUnderlay = (props) => {
  const [parkingLocation, setParkingLocation] = useState(ParkingService.findActive()[0]);
  const { currentLocation } = useCurrentLocation();

  useEffect(() => {
    if (currentLocation) {
      this.map.animateToRegion({ ...currentLocation, ...deltas }, 500);
    }
  }, [currentLocation]);

  const renderSaveButton = () => {
    if (!parkingLocation) {
      return (
        <ActionButton.Item
          buttonColor="white"
          title="Save Parking"
          onPress={() => {
            ParkingService.save(
              new ParkingModel(currentLocation.latitude, currentLocation.longitude),
            );
            setParkingLocation(ParkingService.findActive()[0]);
          }}>
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
        <ActionButton.Item
          buttonColor="white"
          title="Delete Parking"
          onPress={() => {
            ParkingService.delete(parkingLocation);
            setParkingLocation(ParkingService.findActive()[0]);
          }}>
          <Icon name="ios-trash" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      );
    }
  };

  const renderParkingMarker = () => {
    if (parkingLocation) {
      return (
        <MapView.Marker coordinate={parkingLocation} title={'title'} description={'description'} />
      );
    }
  };

  const renderCurrentLocationButton = () => {
    return (
      <ActionButton.Item
        buttonColor="white"
        title="Current Location"
        onPress={() => {
          this.map.animateToRegion(currentLocation, 500);
        }}>
        <Icon name="md-navigate" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    );
  };

  return (
    <View style={styles.map}>
      <MapView
        ref={(ref) => (this.map = ref)}
        initialRegion={{ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }}
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
});

export default MapUnderlay;
