import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

function HomeFooter(props) {
  const navigation = useNavigation();

  const iconSize = useMemo(() => RFValue(24), []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconGroup}>
        <Foundation name="home" size={iconSize} />
        <Text style={[styles.title, { color: '#000000' }]}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup}>
        <Ionicons name="md-search-sharp" size={iconSize} color={'#979797'} />
        <Text style={styles.title}>방코드 검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup} onPress={() => navigation.navigate('category')}>
        <SimpleLineIcons name="plus" size={iconSize} color={'#979797'} />
        <Text style={styles.title}>방 만들기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup}>
        <FontAwesome5 name="user" size={iconSize} color={'#3333FF'} />
        <Text style={[styles.title, { color: '#3333FF' }]}>마이 페이지</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(10),
    marginTop: 'auto',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: RFValue(4),
    fontSize: RFValue(10),
    fontWeight: 700,
    color: '#979797',
  },
});

export default HomeFooter;
