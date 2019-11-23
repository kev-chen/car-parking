import { useEffect, useState } from 'react';

const apiKey = 'AIzaSyCh6iY2ewoNB5YaQ7mTGtOEf0RS2Usxy5A';
const baseURL = 'https://maps.googleapis.com/maps/api/geocode/';

const useGeocode = (location) => {
  const [result, setResult] = useState('. . .');

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      return;
    }

    fetch(`${baseURL}json?address=${location.latitude},${location.longitude}&key=${apiKey}`)
      .then((response) => response.json())
      .then((responseJson) => {
        const addressComponents = responseJson.results[0].address_components;
        const city = addressComponents.filter((item) => item.types.includes('locality'))[0]
          .long_name;

        const state = addressComponents.filter((item) =>
          item.types.includes('administrative_area_level_1'),
        )[0].short_name;

        setResult(`${city}, ${state}`);
      });
  }, [location]);

  return result;
};

export default useGeocode;
