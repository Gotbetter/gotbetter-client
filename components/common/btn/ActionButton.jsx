import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

ActionButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  round: PropTypes.bool,
};

function ActionButton(props) {
  return (
    <Container {...props}>
      <Label>{props.title}</Label>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  ${({ width, height, color, round }) => `
    width: ${width}px;
    height: ${height}px;
    background-color: ${color};
    border-radius: ${round ? 15 : 0}px;
  `};

  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  color: #ffffff;
`;

export default ActionButton;
