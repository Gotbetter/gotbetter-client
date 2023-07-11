import InfoMessage from '@components/common/InfoMessage';
import ActionButton from '@components/common/btn/ActionButton';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function SignUpForm() {
  const [isDuplicateChecked] = useState(false);

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.title}>아이디 *</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, { width: wp(56) }]} placeholder={'아이디'} />
          <ActionButton
            title={isDuplicateChecked ? '확인 완료' : '중복확인'}
            width={wp(30)}
            height={hp(8)}
            color={isDuplicateChecked ? '#263238' : '#E0E0E0'}
            round={true}
          />
        </View>
        <InfoMessage message="사용 가능한 아이디입니다." confirmed />
      </View>
      <View style={styles.passwordInputGroup}>
        <Text style={styles.title}>비밀번호 *</Text>
        <TextInput style={styles.input} placeholder={'비밀번호'} secureTextEntry />
        <TextInput style={styles.input} placeholder={'비밀번호 확인'} secureTextEntry />
        <InfoMessage message="비밀번호가 일치합니다." confirmed />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.title}>이메일 *</Text>
        <TextInput style={styles.input} placeholder={'이메일 주소'} />
        <InfoMessage message="중복된 이메일입니다." error />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.title}>닉네임 *</Text>
        <TextInput style={styles.input} placeholder={'닉네임'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  inputGroup: {
    width: wp(90),
    height: hp(16),
    justifyContent: 'space-around',
    marginBottom: RFValue(4),
  },
  passwordInputGroup: {
    width: wp(90),
    height: hp(25),
    justifyContent: 'space-around',
    marginBottom: RFValue(12),
  },
  title: {
    color: '#BDBDBD',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    height: hp(8),
    borderRadius: 15,
    paddingLeft: RFValue(8),
    backgroundColor: '#F5F5F5',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default SignUpForm;
