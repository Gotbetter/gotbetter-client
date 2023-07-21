import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

RoomCreateForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function RoomCreateForm({ children }) {
  return <Form>{children}</Form>;
}

const Form = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export default RoomCreateForm;
