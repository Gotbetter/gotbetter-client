import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.img} onPress={() => navigation.goBack()} activeOpacity={1}>
      <Image source={require('@assets/backarrow.png')} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: RFValue(16),
    height: RFValue(16),
  },
});

export default BackButton;
