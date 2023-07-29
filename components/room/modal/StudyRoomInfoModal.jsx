import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studyRoomDetail, studyRoomInfoModalState } from 'recoil/room/atoms';
import styled from 'styled-components/native';

function StudyRoomInfoModal() {
  const { title, room_code, account, start_date, max_user_num, current_user_num, entry_fee } =
    useRecoilValue(studyRoomDetail);

  const [visible, setVisible] = useRecoilState(studyRoomInfoModalState);

  const close = () => setVisible(false);

  return (
    <ListModal visible={visible} onRequestClose={close}>
      <Container>
        <Label>방 정보</Label>
        <Shadow style={{ borderRadius: 10 }} distance={1} offset={[0, 2]}>
          <InfoContainer>
            <InfoGroup>
              <InfoLabel>방 이름</InfoLabel>
              <Description>{title}</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>방 코드</InfoLabel>
              <Description>{room_code}</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>현재 인원</InfoLabel>
              <Description>{current_user_num}명</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>최대 인원</InfoLabel>
              <Description>{max_user_num}명</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>입장료</InfoLabel>
              <Description>{entry_fee.toLocaleString('ko-KR')}원</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>시작 날짜</InfoLabel>
              <Description>{start_date}</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>계좌 번호</InfoLabel>
              <Description>{account}</Description>
            </InfoGroup>
          </InfoContainer>
        </Shadow>
        <ButtonContainer>
          <ModalButton title={'닫기'} onPress={close} />
        </ButtonContainer>
      </Container>
    </ListModal>
  );
}

const Container = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(20)}px;
`;

const InfoContainer = styled.View`
  width: ${RFValue(260)}px;
  border-width: 1px;
  border-color: #f3f3f3;
  border-radius: 10px;
  background-color: #ffffff;
`;

const InfoGroup = styled.View`
  justify-content: space-around;
  height: ${RFValue(56)}px;
  padding: ${RFValue(8)}px;
  border-bottom-color: #f3f3f3;
  border-bottom-width: 1px;
`;

const InfoLabel = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(12)}px;
`;

const Description = styled.Text`
  color: #5b5b5b;
  font-weight: 600;
  font-size: ${RFValue(10)}px;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: ${RFValue(24)}px;
`;

export default StudyRoomInfoModal;
