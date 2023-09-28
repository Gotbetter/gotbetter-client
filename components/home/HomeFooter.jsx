import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import format from 'pretty-format';
import React, { useCallback, useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';

function HomeFooter() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const iconSize = useMemo(() => RFValue(20), []);
  const iconColor = useMemo(() => '#979797', []);

  const footerItems = useMemo(
    () => [
      {
        label: '방 만들기',
        icon: <AntDesign name="pluscircleo" size={iconSize} color={iconColor} />,
        onPress: () => navigation.navigate('room-create'),
      },
      {
        label: '참가 요청',
        icon: <AntDesign name="enter" size={iconSize} color={iconColor} />,
        onPress: () => navigation.navigate('join'),
      },
      {
        label: '로그아웃',
        icon: <AntDesign name="logout" size={iconSize} color={iconColor} />,
        onPress: () => logout(),
      },
    ],
    [iconColor, iconSize, logout, navigation],
  );

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      navigation.reset({ routes: [{ name: 'auth-routes' }] });
      queryClient.clear();
      Toast.show('로그아웃', { duration: Toast.durations.SHORT });
    } catch (e) {
      console.log(format(e));
    }
  }, [navigation, queryClient]);

  return (
    <Container>
      {footerItems.map((item) => (
        <IconGroup key={item.label} onPress={item.onPress}>
          {item.icon}
          <IconLabel>{item.label}</IconLabel>
        </IconGroup>
      ))}
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

const IconLabel = styled.Text`
  margin-top: ${hp(0.625)}px;
  font-size: ${RFValue(8)}px;
`;

export default HomeFooter;
