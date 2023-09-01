import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import format from 'pretty-format';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';

function HomeFooter() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const iconSize = useMemo(() => RFValue(24), []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      navigation.reset({ routes: [{ name: 'auth-routes' }] });
      queryClient.clear();
      Toast.show('로그아웃', { duration: Toast.durations.SHORT });
    } catch (e) {
      console.log(format(e));
    }
  };
  return (
    <Container>
      <IconGroup onPress={() => navigation.navigate('room-create')}>
        <SimpleLineIcons name="plus" size={iconSize} color={'#979797'} />
      </IconGroup>
      <IconGroup onPress={() => navigation.navigate('join')}>
        <Ionicons name="md-search-sharp" size={iconSize} color={'#979797'} />
      </IconGroup>
      <IconGroup onPress={() => logout()}>
        <AntDesign name="logout" size={iconSize} color={'#979797'} />
      </IconGroup>
    </Container>
  );
}

const Container = styled.View`
  height: ${hp(6)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-top: auto;
`;

const IconGroup = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export default HomeFooter;
