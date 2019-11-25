import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const useCurrentLocation = () => {
  const [currentLocation, setLocation] = useState({});

  const onChange = ({ coords }) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error) => {
    Alert.alert(error);
  };

  useEffect(() => {
    let watcher = Geolocation.watchPosition(onChange, onError);
    return () => Geolocation.clearWatch(watcher);
  }, []);

  return { currentLocation };
};

export default useCurrentLocation;
