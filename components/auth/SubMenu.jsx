import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function SubMenu() {
  const subMenuItems = useMemo(
    () => [
      {
        id: 'sign-up',
        title: '회원가입',
        path: 'sign-up',
      },
      {
        id: 'find-id',
        title: '아이디 찾기',
        path: 'find-id',
      },
      {
        id: 'find-password',
        title: '비밀번호 찾기',
        path: 'find-password',
      },
    ],
    [],
  );

  return (
    <View style={styles.subMenuContainer}>
      {subMenuItems.map((item, index) => (
        <TouchableOpacity key={item.id} style={menuStyle(index === 1).menu}>
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  subMenuContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',

    width: wp(80),
  },
  menuText: {
    fontSize: RFValue(10),
    color: '#979797',
  },
});

const menuStyle = (borderSide) =>
  StyleSheet.create({
    menu: {
      width: '30%',
      alignItems: 'center',

      borderLeftWidth: borderSide ? 1 : 0,
      borderRightWidth: borderSide ? 1 : 0,

      borderRightColor: '#D9D9D9',
      borderLeftColor: '#D9D9D9',
    },
  });

export default SubMenu;
