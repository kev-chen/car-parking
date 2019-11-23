import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useCurrentLocation from '../hooks/CurrentLocation';

const MapUnderlay = (props) => {
  const location = useCurrentLocation();

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
        followUserLocation={true}
      />
      <ActionButton
        buttonColor="white"
        offsetY={150}
        renderIcon={(active) => <Icon name="ios-add" style={styles.actionButtonIcon} />}>
        <ActionButton.Item
          buttonColor="white"
          title="Current Location"
          onPress={() => {
            this.map.animateToRegion(location, 500);
          }}>
          <Icon name="md-navigate" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'blue',
  },
});

export default MapUnderlay;
