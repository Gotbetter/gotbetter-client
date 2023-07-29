import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

Profile.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
};

function Profile({ image, style }) {
  return (
    <Image
      source={{ uri: `data:image/png;base64,${image}` }}
      style={style}
      resizeMode="contain"
      alt={'이미지 읽기 실패'}
    />
  );
}

export default Profile;
