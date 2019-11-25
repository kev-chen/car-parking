import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import CText from './CText';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import useCurrentLocation from '../hooks/CurrentLocation';
import useGeocode from '../hooks/Geocode';

const Header = (props) => {
  const { currentLocation } = useCurrentLocation();
  const geocode = useGeocode(currentLocation);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.header}>
        <Location geocode={geocode} />
        <MenuIcon />
      </Card>
    </SafeAreaView>
  );
};

const Location = (props) => {
  return (
    <View style={styles.leftContainer}>
      <Icon name="ios-navigate" size={25} color={Colors.salmon} />
      <View style={styles.textContainer}>
        <CText style={styles.label}>Detected Location</CText>
        <CText style={styles.locationText}>{props.geocode}</CText>
      </View>
    </View>
  );
};

const MenuIcon = (props) => {
  return (
    <View style={styles.rightContainer}>
      <Icon name="ios-menu" size={32} color={Colors.mediumGrey} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 25,
    shadowOffset: { width: 0, height: 15 },
    shadowRadius: 9,
    shadowOpacity: 0.1,
  },
  leftContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
