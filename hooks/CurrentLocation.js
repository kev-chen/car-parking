import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const useCurrentLocation = () => {
  const [result, setResult] = useState({});

  useEffect(() => {
    geolocationPromise().then((location) => setResult(location));
  }, []);

  return result;
};

const geolocationPromise = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        let location = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        resolve(location);
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  });
};

export default useCurrentLocation;
