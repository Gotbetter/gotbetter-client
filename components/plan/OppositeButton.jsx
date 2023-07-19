import OppositeIcon from '@components/common/icon/OppositeIcon';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function OppositeButton() {
  const opposite = false;
  const title = opposite ? '반대 누르기 완료' : '반대 누르기';
  return (
    <TouchableOpacity style={styles(opposite ? '#848484' : '#3333FF').container}>
      <OppositeIcon color={'#ffffff'} />
      <Text style={styles().title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = (backgroundColor) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,

      width: wp(56),
      height: RFValue(40),

      borderRadius: RFValue(18),
      backgroundColor,

      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: RFValue(20),
      height: RFValue(20),
    },
    title: {
      marginLeft: RFValue(12),
      color: '#ffffff',
      fontWeight: 700,
    },
  });

export default OppositeButton;
