import InfoMessage from '@components/common/InfoMessage';
import ActionButton from '@components/common/btn/ActionButton';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function SignUpForm() {
  const [isDuplicateChecked] = useState(false);

  return (
    <Form>
      <InputGroup>
        <Label>아이디 *</Label>
        <RowGroup>
          <Input style={{ width: wp(56) }} placeholder={'아이디'} />
          <ActionButton
            title={isDuplicateChecked ? '확인 완료' : '중복확인'}
            width={wp(30)}
            height={hp(8)}
            color={isDuplicateChecked ? '#263238' : '#E0E0E0'}
            round={true}
          />
        </RowGroup>
        <InfoMessage message="사용 가능한 아이디입니다." confirmed />
      </InputGroup>
      <PasswordInputGroup>
        <Label>비밀번호 *</Label>
        <Input placeholder={'비밀번호'} secureTextEntry />
        <Input placeholder={'비밀번호 확인'} secureTextEntry />
        <InfoMessage message="비밀번호가 일치합니다." confirmed />
      </PasswordInputGroup>
      <InputGroup>
        <Label>이메일 *</Label>
        <Input placeholder={'이메일 주소'} />
        <InfoMessage message="중복된 이메일입니다." error />
      </InputGroup>
      <InputGroup>
        <Label>닉네임 *</Label>
        <Input placeholder={'닉네임'} />
      </InputGroup>
    </Form>
  );
}

const Form = styled.View`
  align-items: center;
  margin-top: ${hp(2)}px;
`;

const InputGroup = styled.View`
  width: ${wp(90)}px;
  height: ${hp(16)}px;

  justify-content: space-around;
  margin-bottom: ${RFValue(4)}px;
`;

const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const PasswordInputGroup = styled.View`
  width: ${wp(90)}px;
  height: ${hp(25)}px;
  justify-content: space-around;
  margin-bottom: ${RFValue(12)}px;
`;

const Label = styled.Text`
  color: #bdbdbd;
  font-weight: 600;
`;

const Input = styled.TextInput`
  width: 100%;
  height: ${hp(8)}px;
  border-radius: 15px;
  padding-left: ${RFValue(8)}px;
  background-color: #f5f5f5;
`;

export default SignUpForm;
