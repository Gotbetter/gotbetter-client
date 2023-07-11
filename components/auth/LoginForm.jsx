import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

LoginForm.propTypes = {
  children: PropTypes.node,
};

function LoginForm({ children }) {
  return (
    <View style={styles.formContainer}>
      <TextInput style={styles.input} placeholder="아이디" />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: hp(20),

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    width: wp(90),
    height: hp(8),

    paddingLeft: 12,
  },
});

export default LoginForm;
