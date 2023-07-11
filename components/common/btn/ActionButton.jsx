import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

ActionButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  round: PropTypes.bool,
};

function ActionButton({ title, width, height, round, color, onPress }) {
  return (
    <TouchableOpacity style={dynamicStyles(width, height, color, round).buttonContainer} onPress={onPress}>
      <Text style={fixStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const fixStyles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
  },
});

const dynamicStyles = (width, height, color, round) =>
  StyleSheet.create({
    buttonContainer: {
      borderWidth: 1,
      borderRadius: round ? 15 : 0,
      width,
      height,
      backgroundColor: color,

      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ActionButton;
