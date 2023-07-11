import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

InfoMessage.propTypes = {
  error: PropTypes.bool,
  confirmed: PropTypes.bool,
  message: PropTypes.string,
};

function InfoMessage({ error = false, confirmed = false, message = '' }) {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.textError}>{message}</Text>
      </View>
    );
  }

  if (confirmed) {
    return (
      <View style={styles.container}>
        <Text style={styles.textConfirmed}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingLeft: RFValue(4),
  },
  textError: {
    fontSize: RFValue(10),
    color: '#F44336',
  },
  textConfirmed: {
    fontSize: RFValue(10),
    color: '#64B5F6',
  },
});

export default InfoMessage;
