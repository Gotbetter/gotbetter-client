import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

SmallInfoModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

function SmallInfoModal({ children, visible, onRequestClose }) {
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
  width: ${wp(78)}px;
  height: ${hp(32)}px;
  border-radius: 10px;
  background-color: #ffffff;

  justify-content: center;
  align-items: center;

  padding: ${RFValue(12)}px;
  margin-bottom: ${hp(8)}px;
`;

export default SmallInfoModal;
