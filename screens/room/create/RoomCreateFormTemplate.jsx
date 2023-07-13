import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

RoomCreateFormTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  buttonActivate: PropTypes.bool,
  nextScreen: PropTypes.string,
};

function RoomCreateFormTemplate({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: hp(3),
    padding: RFValue(12),
    fontSize: RFValue(18),
    fontWeight: 600,
  },
});

export default RoomCreateFormTemplate;
