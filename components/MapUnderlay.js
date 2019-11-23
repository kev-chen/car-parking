import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useCurrentLocation from '../hooks/CurrentLocation';

const MapUnderlay = (props) => {
  const location = useCurrentLocation();
  const parkingLocation = { latitude: 40.759, longitude: -73.512 };

  const getLocations = () => {
    return [
      { latitude: location.latitude, longitude: location.longitude },
      { latitude: parkingLocation.latitude, longitude: parkingLocation.longitude },
    ];
  };

  useEffect(() => {
    if (location) {
      this.map.animateToRegion(location, 1000);
    }
  }, [location]);

  return (
    <View style={styles.map}>
      <MapView
        ref={(ref) => (this.map = ref)}
        initialRegion={{ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }}
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}>
        <MapView.Marker coordinate={parkingLocation} title={'title'} description={'description'} />
      </MapView>
      <ActionButton
        buttonColor="white"
        renderIcon={(active) => <Icon name="ios-add" style={styles.actionButtonIcon} />}>
        <ActionButton.Item
          buttonColor="white"
          title="Current Location"
          onPress={() => {
            this.map.animateToRegion(location, 500);
          }}>
          <Icon name="md-navigate" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="white"
          title="Parking Location"
          onPress={() => {
            this.map.fitToCoordinates(getLocations(), {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            });
          }}>
          <Icon name="md-car" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'blue',
  },
});

export default MapUnderlay;
