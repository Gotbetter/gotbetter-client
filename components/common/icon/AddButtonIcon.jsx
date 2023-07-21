import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function AddButtonIcon(props) {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width={42} height={42} rx={10} fill="#D9D9D9" />
      <Path d="M13 20H29V22H13V20Z" fill="white" />
      <Path d="M20 13H22V29H20V13Z" fill="white" />
    </Svg>
  );
}

export default AddButtonIcon;
