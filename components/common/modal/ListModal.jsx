import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

ListModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

function ListModal({ children, visible, onRequestClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onRequestClose}>
      <CenterView>
        <Container>{children}</Container>
      </CenterView>
    </Modal>
  );
}

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #9797979c;
`;

const Container = styled.View`
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: ${RFValue(18)}px;
`;

export default ListModal;
