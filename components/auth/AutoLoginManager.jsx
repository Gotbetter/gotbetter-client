import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

AutoLoginManager.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
function AutoLoginManager({ children }) {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('access_token');
      console.log('check has already logined');
      console.log(`token: ${token}`);
      if (token === null) {
        navigation.reset({ routes: [{ name: 'login' }] });
      } else {
        navigation.reset({ routes: [{ name: 'home' }] });
      }
    };
    checkLogin();
  }, [navigation]);
  return <>{children}</>;
}

export default AutoLoginManager;
