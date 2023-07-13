import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
ModalButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  highlight: PropTypes.bool,
};

function ModalButton({ title, onPress, highlight = false }) {
  return (
    <TouchableOpacity style={styles(highlight).buttonContainer} onPress={onPress}>
      <Text style={styles(highlight).text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = (highlight) =>
  StyleSheet.create({
    buttonContainer: {
      width: wp(25),
      height: hp(5),

      borderRadius: 40,
      borderWidth: highlight ? 0 : 1,
      borderColor: highlight ? null : '#979797',
      backgroundColor: highlight ? '#3333FF' : '#ffffff',

      fontWeight: 600,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: 600,
      color: highlight ? '#ffffff' : '#979797',
    },
  });

export default ModalButton;
