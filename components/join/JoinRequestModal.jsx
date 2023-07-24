import ModalButton from '@components/common/btn/ModalButton';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { joinRequestMessage, joinRequestModalState, joinRequestState } from 'recoil/join/atoms';
import styled from 'styled-components/native';

function JoinRequestModal() {
  const { navigate } = useNavigation();
  const [visible, setVisible] = useRecoilState(joinRequestModalState);
  const isError = useRecoilValue(joinRequestState);
  const errorMessage = useRecoilValue(joinRequestMessage);

  const close = () => {
    setVisible(false);
    navigate('home');
  };

  if (isError) {
    return (
      <SmallInfoModal visible={visible} onRequestClose={close}>
        <Container>
          <Label>초대요청 실패</Label>
          <Description>{errorMessage}</Description>
          <ModalButton title={'닫기'} onPress={close} />
        </Container>
      </SmallInfoModal>
    );
  }

  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
      <Container>
        <CheckImg source={require('@assets/confirm.png')} resizeMode="contain" />
        <Label>초대요청 완료</Label>
        <Description>요청이 완료되었습니다.{'\n'}초대 승인까지 잠시 기다려주세요!</Description>
        <ModalButton title={'닫기'} onPress={close} />
      </Container>
    </SmallInfoModal>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;

const CheckImg = styled.Image`
  width: 100%;
`;

const Label = styled.Text`
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

export default JoinRequestModal;
