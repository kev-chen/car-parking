import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,

    /* iOS ONLY */
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.25,
    /* -------- */

    /* ANDROID ONLY */
    elevation: 8,
    /* -------- */
  },
});

export default Card;
