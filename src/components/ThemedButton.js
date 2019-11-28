import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import CText from './CText';

const ThemedButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.container, ...props.style }}>
        <CText style={styles.text}>{props.title}</CText>
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
