import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

AndroidSafeAreaView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function AndroidSafeAreaView({ children }) {
  return <SafeAreaView style={styles.AndroidSafeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default AndroidSafeAreaView;
