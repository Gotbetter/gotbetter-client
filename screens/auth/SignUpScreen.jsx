import SignUpForm from '@components/auth/SignUpForm';
import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { checkAuthIdDuplicate, signupRequest } from 'api/auth';
import format from 'pretty-format';
import React, { useEffect, useReducer } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

const initialState = {
  requirementsFulfilled: false,
  request: {
    auth_id: '',
    password: '',
    passwordConfirm: '',
    username: '',
    email: '',
  },
  error: {
    ERROR_CHECK_DUPLICATE: false,
    ERROR_PASSWORD_CONFIRM: false,
    ERROR_DUPLICATE_EMAIL: false,
    ERROR_INCORRECT_EMAIL_FORM: false,
    ERROR_REQUIRE_UNFULFILLED: false,
  },
  success: {
    SUCCESS_CHECK_DUPLICATE: false,
    SUCCESS_PASSWORD_CONFIRM: false,
    SUCCESS_EMAIL_FORM: false,
  },
  message: {
    ERROR_CHECK_DUPLICATE_MESSAGE: '',
    ERROR_EMAIL_MESSAGE: '',
    ERROR_SIGN_UP_MESSAGE: '',
  },
};

function reducer(state, action) {
  console.log(format(action));
  console.log(`prev state: ${format(state)}`);

  let next = null;

  switch (action.type) {
    case 'CHECK_REQUIRE_FULFILLED': {
      /**
       * 회원가입 버튼 활성화 조건
       * case 1. 모든 input에 값을 입력
       * case 2. 아이디 중복확인
       * case 3. 비밀번호 재확인
       * case 4. 이메일 양식 제대로 입력
       */
      const { request } = state;

      // case 1. 검증
      let allInputFulfilled = true;
      for (const key in request) {
        if (request[key] === '') {
          allInputFulfilled = false;
          break;
        }
      }

      const isFulfilled =
        state.success.SUCCESS_CHECK_DUPLICATE && // case 2. 검증
        state.success.SUCCESS_PASSWORD_CONFIRM && // case 3. 검증
        state.success.SUCCESS_EMAIL_FORM && // case 4. 검증
        allInputFulfilled;

      next = {
        ...state,
        requirementsFulfilled: isFulfilled,
      };
      return next;
    }
    case 'CHECK_EMAIL_FORM': {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 양식
      const { request } = state;

      const isError = !emailPattern.test(request.email);
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_INCORRECT_EMAIL_FORM: isError,
        },
        success: {
          ...state.success,
          SUCCESS_EMAIL_FORM: !isError,
        },
        message: {
          ...state.message,
          ERROR_EMAIL_MESSAGE: isError && '올바르지 않은 이메일 양식입니다.',
        },
      };
      console.log(`next state: ${format(next)}`);

      return next;
    }
    case 'ON_CHANGE': {
      // 검증이 필요한 input에 값을 입력할 경우 error, success 상태 초기화

      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_CHECK_DUPLICATE: action.name === 'auth_id' ? false : state.error.ERROR_CHECK_DUPLICATE,
          ERROR_PASSWORD_CONFIRM:
            action.name === 'password' || action.name === 'passwordConfirm'
              ? false
              : state.error.ERROR_PASSWORD_CONFIRM,
          ERROR_DUPLICATE_EMAIL: action.name === 'email' ? false : state.error.ERROR_DUPLICATE_EMAIL,
          ERROR_INCORRECT_EMAIL_FORM: action.name === 'email' ? false : state.error.ERROR_INCORRECT_EMAIL_FORM,
        },
        success: {
          ...state.success,
          SUCCESS_CHECK_DUPLICATE: action.name === 'auth_id' ? false : state.success.SUCCESS_CHECK_DUPLICATE,
          SUCCESS_PASSWORD_CONFIRM:
            action.name === 'password' || action.name === 'passwordConfirm'
              ? false
              : state.success.SUCCESS_PASSWORD_CONFIRM,
          SUCCESS_EMAIL_FORM: action.name === 'email' ? false : state.success.SUCCESS_EMAIL_FORM,
        },
        request: {
          ...state.request,
          [action.name]: action.value,
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    /**
     * 아이디 중복확인 성공 / 실패
     * 중복확인은 서버 요청을 통해 이루어지므로 비동기적으로 처리 되어야합니다.
     * 따라서 액션 내에서 처리할 수 없으므로 성공한 경우와 실패한 경우 2가지 케이스를 나누었습니다.
     */
    case 'SUCCESS_CHECK_DUPLICATE': {
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_CHECK_DUPLICATE: false,
        },
        success: {
          ...state.success,
          SUCCESS_CHECK_DUPLICATE: true,
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    case 'ERROR_CHECK_DUPLICATE': {
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_CHECK_DUPLICATE: true,
        },
        success: {
          ...state.success,
          SUCCESS_CHECK_DUPLICATE: false,
        },
        message: {
          ...state.message,
          ERROR_CHECK_DUPLICATE_MESSAGE: '중복된 아이디 입니다..',
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    case 'ERROR_DUPLICATE_EMAIL': {
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_DUPLICATE_EMAIL: true,
        },
        message: {
          ...state.message,
          ERROR_EMAIL_MESSAGE: '중복된 이메일 입니다.',
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    case 'ERROR_REQUIRE_UNFULFILLED': {
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_REQUIRE_UNFULFILLED: true,
        },
        message: {
          ...state.message,
          ERROR_SIGN_UP_MESSAGE: '모든 정보를 입력해 주세요.',
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    case 'ERROR_AUTH_ID_EMPTY': {
      /** 400 체크 **/
      if (state.request.auth_id === '') {
        next = {
          ...state,
          error: {
            ...state.error,
            ERROR_CHECK_DUPLICATE: true,
          },
          success: {
            ...state.success,
            SUCCESS_CHECK_DUPLICATE: false,
          },
          message: {
            ...state.message,
            ERROR_CHECK_DUPLICATE_MESSAGE: '아이디를 입력해 주세요.',
          },
        };
        console.log(`next state: ${format(next)}`);
        return next;
      }
      console.log(`알 수 없는 오류`);
      return { ...state };
    }

    case 'CONFIRM_PASSWORD': {
      // 비밀번호 재확인
      const { password, passwordConfirm } = state.request;
      next = {
        ...state,
        error: {
          ...state.error,
          ERROR_PASSWORD_CONFIRM: password !== passwordConfirm,
        },
        success: {
          ...state.success,
          SUCCESS_PASSWORD_CONFIRM: password === passwordConfirm,
        },
      };
      console.log(`next state: ${format(next)}`);
      return next;
    }
    default:
      break;
  }
}

function SignUpScreen() {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'CHECK_REQUIRE_FULFILLED' });
  }, [state.request, state.success]);

  const { mutate: checkDuplicate } = useMutation(() => checkAuthIdDuplicate(state.request.auth_id), {
    onError: (error) => {
      const { status } = error.response;
      if (status === 400) dispatch({ type: 'ERROR_AUTH_ID_EMPTY' });

      if (status === 409) dispatch({ type: 'ERROR_CHECK_DUPLICATE' });
    },
    onSuccess: (res) => {
      dispatch({ type: 'SUCCESS_CHECK_DUPLICATE' });
    },
  });

  const { mutate: signup } = useMutation(() => signupRequest(state.request), {
    onError: (error) => {
      const { status } = error.response;
      if (status === 400) dispatch({ type: 'ERROR_REQUIRE_UNFULFILLED' });

      // 이메일이 중복되었을 경우 서버는 409 반환
      if (status === 409) dispatch({ type: 'ERROR_DUPLICATE_EMAIL' });
    },
    onSuccess: (res) => {
      Toast.show('회원가입 성공', { duration: Toast.durations.SHORT });
      navigation.navigate('login');
    },
  });

  const onChange = (name, value) => {
    dispatch({ type: 'ON_CHANGE', name, value });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <SignUpForm
          state={state}
          onChange={onChange}
          checkDuplicate={checkDuplicate}
          confirmPassword={() => dispatch({ type: 'CONFIRM_PASSWORD' })}
          checkEmailForm={() => dispatch({ type: 'CHECK_EMAIL_FORM' })}
        />

        <ButtonContainer>
          <ActionButton
            onPress={signup}
            title={'회원가입'}
            width={wp(90)}
            height={hp(8)}
            color={state.requirementsFulfilled ? '#3333FF' : '#979797'}
            round={true}
            disabled={!state.requirementsFulfilled}
          />
        </ButtonContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

const ButtonContainer = styled.View`
  margin-top: ${RFValue(12)}px;
`;

export default SignUpScreen;
