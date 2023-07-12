import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Wait = () => {
  return (
    <View style={styles.container}>
      <Text style={textStyle('#979797').text}>&#183; 7/3부터 진행</Text>
    </View>
  );
};

const Progress = () => {
  return (
    <View style={styles.container}>
      <Text style={textStyle('#3333FF').text}>&#183; 진행중</Text>
    </View>
  );
};

const End = () => {
  return (
    <View style={styles.container}>
      <Text style={textStyle('#FF3395').text}>&#183; 종료</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: RFValue(4),
    flexGrow: 1,
  },
});

const textStyle = (color) =>
  StyleSheet.create({
    text: {
      color,
      fontWeight: 700,
      fontSize: RFValue(10),
    },
  });

export { End, Progress, Wait };
