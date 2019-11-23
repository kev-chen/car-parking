import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CText from './CText';
import Colors from '../constants/colors';

const IconInfo = (props) => {
  return (
    <View style={{ ...styles.iconInfoContainer, ...props.style }}>
      <Icon
        style={styles.icon}
        name={props.iconName}
        size={props.iconSize}
        color={Colors.mediumGrey}
      />
      <CText style={{ fontSize: props.fontSize }}>{props.text}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  iconInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginRight: 10 },
});

export default IconInfo;
