import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function SubMenu() {
  const navigation = useNavigation();

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
    <Container>
      {subMenuItems.map((item, index) => (
        <Menu key={item.id} side={index === 1} onPress={() => navigation.navigate(item.path)}>
          <Label>{item.title}</Label>
        </Menu>
      ))}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: ${wp(80)}px;
`;

const Menu = styled.TouchableOpacity`
  width: 30%;
  align-items: center;

  border-left-width: ${({ side }) => (side ? 1 : 0)}px;
  border-right-width: ${({ side }) => (side ? 1 : 0)}px;

  border-right-color: #d9d9d9;
  border-left-color: #d9d9d9;
`;

const Label = styled.Text`
  font-size: ${RFValue(10)}px;
  color: #979797;
`;

export default SubMenu;
