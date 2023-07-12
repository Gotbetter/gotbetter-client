import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

HomeHeader.propTypes = {
  menu: PropTypes.string,
  onPress: PropTypes.func,
};

function HomeHeader({ menu, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('@assets/logo.png')} resizeMode="contain" />
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menu, { borderBottomWidth: menu === '전체' ? 2 : 0, borderBottomColor: '#000000' }]}
          onPress={() => onPress('전체')}
        >
          <Text style={styles.menuText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menu, { borderBottomWidth: menu === '진행중' ? 2 : 0, borderBottomColor: '#000000' }]}
          onPress={() => onPress('진행중')}
        >
          <Text style={[styles.menuText, { color: '#3333FF' }]}>진행중</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: RFValue(200),
    height: RFValue(80),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    width: '50%',
    padding: RFValue(12),
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: RFValue(16),
  },
});

export default HomeHeader;
