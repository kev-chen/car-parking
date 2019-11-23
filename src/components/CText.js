import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CText = (props) => {
  return <Text style={{ ...styles.textStyle, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Gill Sans',
  },
});

export default CText;
