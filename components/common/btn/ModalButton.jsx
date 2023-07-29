import PropTypes from 'prop-types';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

ModalButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  highlight: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

function ModalButton(props, { width = wp(25), height = hp(5) }) {
  return (
    <Container width={width} height={height} highlight={props.highlight} {...props}>
      <Label highlight={props.highlight}>{props.title}</Label>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  ${({ width, height, highlight }) => `
    width: ${width}px;
    height: ${height}px;
    border-width: ${highlight ? 0 : 1}px;
    border-color: ${highlight ? '#ffffff' : '#979797'};
    background-color: ${highlight ? '#3333ff' : '#ffffff'}; 
  `};

  font-weight: 600;
  border-radius: 40px;

  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-weight: 600;
  color: ${({ highlight }) => (highlight ? '#ffffff' : '#979797')};
`;

export default ModalButton;
