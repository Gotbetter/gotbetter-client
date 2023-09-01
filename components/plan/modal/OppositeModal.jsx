import ModalButton from '@components/common/btn/ModalButton';
import OppositeIcon from '@components/common/icon/OppositeIcon';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

OppositeModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  onPress: PropTypes.func,
};

function OppositeModal({ visible, close, onPress }) {
  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
      <Container>
        <OppositeIcon width={RFValue(50)} height={RFValue(50)} color={'#3333FF'} />
        <Label>반대를 누르시겠습니까?</Label>
        <DescriptionContainer>
          <Description>신중하게 선택해주세요!</Description>
        </DescriptionContainer>
        <ButtonContainer>
          <ModalButton title={'반대'} onPress={onPress} highlight />
          <ModalButton title={'닫기'} onPress={close} />
        </ButtonContainer>
      </Container>
    </SmallInfoModal>
  );
}

const Container = styled.View`
  flex: 1;

  justify-content: space-around;
  align-items: center;
`;

const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const DescriptionContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Description = styled.Text`
  color: #979797;
  font-weight: 600;
  font-size: ${RFValue(12)}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
`;

export default OppositeModal;
