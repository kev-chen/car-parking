import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import CText from './CText';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import useCurrentLocation from '../hooks/CurrentLocation';
import useGeocode from '../hooks/Geocode';

const Header = (props) => {
  const location = useCurrentLocation();
  const geocode = useGeocode(location);

  return (
    <Card style={styles.header}>
      <Location geocode={geocode} />
      <MenuIcon />
    </Card>
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '15%',
    position: 'absolute',
    paddingTop: 60,
    paddingHorizontal: 25,
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
