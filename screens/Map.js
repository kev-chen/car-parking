import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapUnderlay from '../components/MapUnderlay';

const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <MapUnderlay region={props.region} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  parkings: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    flex: 0.17,
  },
});

export default MapScreen;
