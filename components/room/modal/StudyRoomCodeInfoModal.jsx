import ModalButton from '@components/common/btn/ModalButton';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

StudyRoomCodeInfoModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomCodeInfoModal({ visible, close }) {
  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
      <Container>
        <Label>초대하기</Label>
        <CodeNumber>코드번호: zy9xrx</CodeNumber>
        <DescriptionContainer>
          <Description>코드 번호를 초대하고 싶은</Description>
          <Description> 친구에게 전달해주세요.</Description>
        </DescriptionContainer>
        <ButtonContainer>
          <ModalButton title={'닫기'} onPress={close} />
          <ModalButton title={'복사하기'} highlight />
        </ButtonContainer>
      </Container>
    </SmallInfoModal>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;

  justify-content: space-around;
  align-items: center;
`;

const Label = styled.Text`
  color: #33f;
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const CodeNumber = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(22)}px;
`;

const DescriptionContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Description = styled.Text`
  color: #979797;
  font-weight: 600;
  font-size: ${RFValue(14)}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
`;

export default StudyRoomCodeInfoModal;
