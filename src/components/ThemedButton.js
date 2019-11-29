import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import ThemedText from './ThemedText';

const ThemedButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={props.onPress}>
      <View style={{ ...styles.container, ...props.style }}>
        <ThemedText style={styles.text}>{props.title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.salmon,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    margin: 15,
  },
});

export default ThemedButton;
