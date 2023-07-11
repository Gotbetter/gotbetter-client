import SignUpForm from '@components/auth/SignUpForm';
import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
      <View style={styles.container}>
        <SignUpForm />

        <View style={{ marginTop: hp(4) }}>
          <ActionButton
            title={'회원가입'}
            width={wp(90)}
            height={hp(8)}
            color={requirementsFulfilled ? '#3333FF' : '#979797'}
            round={true}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});

export default SignUpScreen;
