import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

function HomeFooter(props) {
  const navigation = useNavigation();

  const iconSize = useMemo(() => RFValue(24), []);
  return (
    <Container>
      <IconGroup>
        <Foundation name="home" size={iconSize} />
        <Label style={{ color: '#000000' }}>홈</Label>
      </IconGroup>
      <IconGroup onPress={() => navigation.navigate('join')}>
        <Ionicons name="md-search-sharp" size={iconSize} color={'#979797'} />
        <Label>방코드 검색</Label>
      </IconGroup>
      <IconGroup onPress={() => navigation.navigate('category')}>
        <SimpleLineIcons name="plus" size={iconSize} color={'#979797'} />
        <Label>방 만들기</Label>
      </IconGroup>
      <IconGroup>
        <FontAwesome5 name="user" size={iconSize} color={'#3333FF'} />
        <Label style={{ color: '#3333FF' }}>마이 페이지</Label>
      </IconGroup>
    </Container>
  );
}

const Container = styled.View`
  height: ${hp(10)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-top: auto;
`;

const IconGroup = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  color: #979797;

  font-weight: 700;
  font-size: ${RFValue(10)}px;

  margin-top: ${RFValue(4)}px;
`;

export default HomeFooter;
