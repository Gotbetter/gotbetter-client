import ActionButton from '@components/common/btn/ActionButton';
import { ErrorMessage, SuccessMessage } from '@components/common/message';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

SignUpForm.propTypes = {
  onChange: PropTypes.func,
  checkDuplicate: PropTypes.func,
  confirmPassword: PropTypes.func,
  checkEmailForm: PropTypes.func,
  state: PropTypes.shape({
    request: PropTypes.shape({
      auth_id: PropTypes.string,
      password: PropTypes.string,
      passwordConfirm: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
    success: PropTypes.shape({
      SUCCESS_CHECK_DUPLICATE: PropTypes.bool,
      SUCCESS_PASSWORD_CONFIRM: PropTypes.bool,
    }),
    error: PropTypes.shape({
      ERROR_CHECK_DUPLICATE: PropTypes.bool,
      ERROR_PASSWORD_CONFIRM: PropTypes.bool,
      ERROR_DUPLICATE_EMAIL: PropTypes.bool,
      ERROR_REQUIRE_UNFULFILLED: PropTypes.bool,
      ERROR_INCORRECT_EMAIL_FORM: PropTypes.bool,
    }),
    message: PropTypes.shape({
      ERROR_CHECK_DUPLICATE_MESSAGE: PropTypes.string,
      ERROR_SIGN_UP_MESSAGE: PropTypes.string,
      ERROR_EMAIL_MESSAGE: PropTypes.string,
    }),
  }),
};

function SignUpForm({ state, onChange, checkDuplicate, confirmPassword, checkEmailForm }) {
  const {
    ERROR_CHECK_DUPLICATE,
    ERROR_PASSWORD_CONFIRM,
    ERROR_DUPLICATE_EMAIL,
    ERROR_REQUIRE_UNFULFILLED,
    ERROR_INCORRECT_EMAIL_FORM,
  } = state.error;
  const { SUCCESS_CHECK_DUPLICATE, SUCCESS_PASSWORD_CONFIRM } = state.success;
  const { ERROR_CHECK_DUPLICATE_MESSAGE, ERROR_SIGN_UP_MESSAGE, ERROR_EMAIL_MESSAGE } = state.message;

  return (
    <Form>
      <InputGroup>
        <Label>아이디 *</Label>
        <RowGroup>
          <Input style={{ width: wp(56) }} placeholder={'아이디'} onChangeText={(text) => onChange('auth_id', text)} />
          <ActionButton
            onPress={checkDuplicate}
            title={SUCCESS_CHECK_DUPLICATE ? '확인 완료' : '중복확인'}
            width={wp(30)}
            height={hp(8)}
            color={SUCCESS_CHECK_DUPLICATE ? '#263238' : '#E0E0E0'}
            round={true}
            disabled={SUCCESS_CHECK_DUPLICATE}
          />
        </RowGroup>
        <ErrorMessage error={ERROR_CHECK_DUPLICATE} message={ERROR_CHECK_DUPLICATE_MESSAGE} />
        <SuccessMessage success={SUCCESS_CHECK_DUPLICATE} message={'사용 가능한 아이디입니다.'} />
      </InputGroup>
      <PasswordInputGroup>
        <Label>비밀번호 *</Label>
        <Input placeholder={'비밀번호'} onChangeText={(text) => onChange('password', text)} secureTextEntry />
        <Input
          placeholder={'비밀번호 확인'}
          onChangeText={(text) => onChange('passwordConfirm', text)}
          onBlur={confirmPassword}
          secureTextEntry
        />
        <ErrorMessage error={ERROR_PASSWORD_CONFIRM} message={'비밀번호가 일치하지 않습니다.'} />
        <SuccessMessage success={SUCCESS_PASSWORD_CONFIRM} message={'비밀번호가 일치합니다.'} />
      </PasswordInputGroup>
      <InputGroup>
        <Label>이메일 *</Label>
        <Input placeholder={'이메일 주소'} onChangeText={(text) => onChange('email', text)} onBlur={checkEmailForm} />
        <ErrorMessage error={ERROR_INCORRECT_EMAIL_FORM || ERROR_DUPLICATE_EMAIL} message={ERROR_EMAIL_MESSAGE} />
      </InputGroup>
      <InputGroup>
        <Label>닉네임 *</Label>
        <Input placeholder={'닉네임'} onChangeText={(text) => onChange('username', text)} />
      </InputGroup>
      <ErrorMessage error={ERROR_INCORRECT_EMAIL_FORM || ERROR_REQUIRE_UNFULFILLED} message={ERROR_SIGN_UP_MESSAGE} />
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
