import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function GoogleLoginButton() {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Image source={require('@assets/google-icon.png')} resizeMode="contain" />
      <Text style={styles.buttonText}>Google 로그인</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: wp(90),
    height: hp(8),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E4E4E4',
  },

  buttonText: {
    color: '#697176',
    fontSize: RFValue(12),
    fontWeight: 500,
    marginLeft: RFValue(12),
  },
});

export default GoogleLoginButton;
