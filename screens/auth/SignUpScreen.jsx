import SignUpForm from '@components/auth/SignUpForm';
import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
function SignUpScreen() {
  const navigation = useNavigation();
  const [requirementsFulfilled] = useState(false);

  const headerOptions = useMemo(
    () => ({
      title: '회원가입',
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
      },
      headerTitleStyle: {
        color: '#979797',
        fontWeight: 600,
      },
    }),
    [],
  );

  useEffect(() => {
    navigation.setOptions(headerOptions);
  }, [headerOptions, navigation]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <SignUpForm />

        <ButtonContainer>
          <ActionButton
            title={'회원가입'}
            width={wp(90)}
            height={hp(8)}
            color={requirementsFulfilled ? '#3333FF' : '#979797'}
            round={true}
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
  margin-top: ${hp(4)}px;
`;

export default SignUpScreen;
