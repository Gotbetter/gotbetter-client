import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

function BackButton() {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.goBack()} activeOpacity={1}>
      <Image source={require('@assets/backarrow.png')} resizeMode="contain" />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: ${RFValue(16)}px;
  height: ${RFValue(16)}px;
`;

export default BackButton;
