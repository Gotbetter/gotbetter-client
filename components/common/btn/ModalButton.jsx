import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
ModalButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  highlight: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

function ModalButton({ title, onPress, width = wp(25), height = hp(5), highlight = false }) {
  return (
    <TouchableOpacity style={styles(highlight, width, height).buttonContainer} onPress={onPress}>
      <Text style={styles(highlight).text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = (highlight, width, height) =>
  StyleSheet.create({
    buttonContainer: {
      width,
      height,
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
