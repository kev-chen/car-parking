import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import ThemedText from './ThemedText';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import useCurrentLocation from '../hooks/CurrentLocation';
import useGeocode from '../hooks/Geocode';

const Header = (props) => {
  const { currentLocation } = useCurrentLocation();
  const geocode = useGeocode(currentLocation);

  return (
    <Card style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Location geocode={geocode} />
      </SafeAreaView>
    </Card>
  );
};

const Location = (props) => {
  return (
    <View style={styles.itemsContainer}>
      <Icon name="ios-navigate" size={25} color={Colors.salmon} />
      <View style={styles.textContainer}>
        <ThemedText style={styles.label}>Detected Location</ThemedText>
        <ThemedText style={styles.locationText}>{props.geocode}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '15%',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    marginHorizontal: 25,
    marginTop: 10,
  },
  itemsContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.mediumGrey,
  },
  locationText: {
    fontSize: 18,
  },
});

export default Header;
