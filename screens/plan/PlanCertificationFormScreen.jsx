import ActionButton from '@components/common/btn/ActionButton';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function PlanCertificationFormScreen(props) {
  return (
    <Form>
      <PhotoContainer>
        <Image source={require('@assets/photo.png')} resizeMode="contain" />
        <PhotoInfo>사진을 첨부해주세요.</PhotoInfo>
      </PhotoContainer>

      <InputGroup>
        <Label>제목</Label>
        <TitleInput placeholder="계획 제목을 작성해주세요." />
      </InputGroup>
      <InputGroup>
        <Label>내용</Label>
        <ContentInput maxLength={60} multiline={true} placeholder="구체적으로 계획 내용을 작성해주세요." />
      </InputGroup>
      <ActionButton title={'계획 완료'} width={wp(90)} height={hp(8)} color={'#33F'} round={true} />
    </Form>
  );
}

const Form = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const PhotoContainer = styled.View`
  width: ${wp(50)}px;
  height: ${wp(50)}px;

  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  margin-top: ${RFValue(36)}px;
`;

const PhotoInfo = styled.Text`
  color: #ffffff;
  margin-top: ${RFValue(12)}px;
`;

const InputGroup = styled.View`
  width: ${wp(90)}px;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: ${RFValue(20)}px;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  height: ${RFValue(56)}px;

  padding: ${RFValue(12)}px;
  margin-top: ${RFValue(12)}px;

  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

const ContentInput = styled.TextInput`
  width: ${wp(90)}px;
  height: ${RFValue(140)}px;

  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;

  margin-top: ${RFValue(12)}px;
  text-align-vertical: top;

  padding: ${RFValue(12)}px;
`;

export default PlanCertificationFormScreen;
