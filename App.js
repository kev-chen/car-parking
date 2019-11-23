import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapScreen from './screens/Map';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.screen}>
      <MapScreen />
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
  },
});
