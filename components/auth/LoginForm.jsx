import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

LoginForm.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

function LoginForm({ children, onChange }) {
  return (
    <Form>
      <Input placeholder="아이디" onChangeText={(text) => onChange('auth_id', text)} />
      <Input placeholder="비밀번호" onChangeText={(text) => onChange('password', text)} secureTextEntry />
      {children}
    </Form>
  );
}

const Form = styled.View`
  justify-content: space-around;
  align-items: center;
  height: ${hp(20)}px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-radius: 10px;
  border-color: #eeeeee;

  width: ${wp(90)}px;
  height: ${hp(8)}px;
  padding-left: ${RFValue(10)}px;
`;

export default LoginForm;
