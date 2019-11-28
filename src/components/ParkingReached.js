import React from 'react';
import { StyleSheet, SafeAreaView, View, Modal } from 'react-native';
import Card from './Card';
import CText from './CText';
import ThemedButton from './ThemedButton';

const ParkingReached = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      animated={true}
      animationType="slide"
      onDismiss={props.onDismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <SafeAreaView>
            <CText style={styles.text}>You've reached your parking spot</CText>
            <ThemedButton
              title="Okay"
              onPress={() => {
                props.onPressHandler(false);
              }}
            />
          </SafeAreaView>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  text: {
    fontSize: 20,
    marginVertical: 30,
  },
});

export default ParkingReached;
