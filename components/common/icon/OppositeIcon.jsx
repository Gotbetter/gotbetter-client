import PropTypes from 'prop-types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

OppositeIcon.propTypes = {
  color: PropTypes.string,
};

function OppositeIcon({ color }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.047 2.954A9.966 9.966 0 102.954 17.047 9.967 9.967 0 1017.047 2.954zm-10.25 4.91a1.068 1.068 0 110 2.136 1.068 1.068 0 010-2.135zM5.744 14.53c.534-1.793 2.233-3.106 4.254-3.106 2.02 0 3.72 1.313 4.258 3.106a.356.356 0 01-.348.453H6.092a.355.355 0 01-.348-.453zm7.46-4.53a1.068 1.068 0 110-2.136 1.068 1.068 0 010 2.136z"
        fill={color}
      />
    </Svg>
  );
}

export default OppositeIcon;
