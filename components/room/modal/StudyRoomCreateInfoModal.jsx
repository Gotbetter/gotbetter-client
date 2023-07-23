import ModalButton from '@components/common/btn/ModalButton';
import OppositeIcon from '@components/common/icon/OppositeIcon';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

StudyRoomCreateInfoModal.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomCreateInfoModal({ success, error, close }) {
  if (success) {
    return (
      <SmallInfoModal visible={true} onRequestClose={close}>
        <Container>
          <CheckImage source={require('@assets/confirm.png')} resizeMode="contain" />
          <Title>방 만들기 완료</Title>
          <Description>방 만들기가 완료되었습니다.</Description>
          <ModalButton title={'닫기'} onPress={close} />
          <ModalButton title={'바로가기'} highlight />
        </Container>
      </SmallInfoModal>
    );
  }

  if (error) {
    return (
      <SmallInfoModal visible={true} onRequestClose={close}>
        <Container>
          <OppositeIcon width={RFValue(50)} height={RFValue(50)} color={'#3333FF'} />
          <Title>방 만들기 실패</Title>
          <Description>서버에 문제가 있습니다.</Description>
          <Description>추후에 다시 시도해 주세요.</Description>
          <ModalButton title={'닫기'} onPress={close} />
        </Container>
      </SmallInfoModal>
    );
  }
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;

  align-content: space-around;
  justify-content: space-around;
`;

const CheckImage = styled.Image`
  width: 100%;
`;

const Title = styled.Text`
  width: 100%;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
  text-align: center;
`;

const Description = styled.Text`
  width: 100%;
  color: #979797;
  text-align: center;
`;

export default StudyRoomCreateInfoModal;
