import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import { useModal, useStringClipboard } from '@hooks/common';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-root-toast';
import { Shadow } from 'react-native-shadow-2';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

StudyRoomInfoModal.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string,
    room_code: PropTypes.string,
    account: PropTypes.string,
    start_date: PropTypes.string,
    max_user_num: PropTypes.number,
    current_user_num: PropTypes.number,
    entry_fee: PropTypes.number,
    rule: PropTypes.string,
  }),
};

function StudyRoomInfoModal({ details }) {
  const { title, rule, room_code, account, start_date, max_user_num, current_user_num, entry_fee } = details;

  const {
    modal: { visible },
    hideModal,
  } = useModal('studyRoomInfo');

  const {
    copyToClipboard: copyRoomCode,
    isCopied: isRoomCodeCopied,
    isError: roomCodeError,
    reset: resetRoomCode,
  } = useStringClipboard('roomCode');
  const {
    copyToClipboard: copyAccount,
    isCopied: isAccountCopied,
    isError: accountError,
    reset: resetAccount,
  } = useStringClipboard('account');

  useEffect(() => {
    if (roomCodeError || accountError) Toast.show('클립보드 복사 실패', { duration: Toast.durations.SHORT });
  }, [accountError, roomCodeError]);

  const hide = () => {
    hideModal();
    resetRoomCode();
    resetAccount();
  };

  return (
    <ListModal visible={visible} onRequestClose={hide}>
      <Container>
        <Label>방 정보</Label>
        <Shadow style={{ borderRadius: 10 }} distance={1} offset={[0, 2]}>
          <InfoContainer>
            <InfoGroup>
              <InfoLabel>방 이름</InfoLabel>
              <Description>{title}</Description>
            </InfoGroup>
            <InfoGroup>
              <InfoLabel>방 규칙</InfoLabel>
              <Description>{rule}</Description>
            </InfoGroup>
            <RowDirectionWrapper>
              <InfoGroup>
                <InfoLabel>방 코드</InfoLabel>
                <Description>{room_code}</Description>
              </InfoGroup>
              <CopyIcon
                name={'copy'}
                size={20}
                color={isRoomCodeCopied ? '#3333ff' : '#979797'}
                onPress={() => copyRoomCode(room_code)}
              />
            </RowDirectionWrapper>
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
            <RowDirectionWrapper>
              <InfoGroup>
                <InfoLabel>계좌 번호</InfoLabel>
                <Description>{account}</Description>
              </InfoGroup>
              <CopyIcon
                name={'copy'}
                size={20}
                color={isAccountCopied ? '#3333ff' : '#979797'}
                onPress={() => copyAccount(account)}
              />
            </RowDirectionWrapper>
          </InfoContainer>
        </Shadow>
        <ButtonContainer>
          <ModalButton title={'닫기'} onPress={hide} />
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

const RowDirectionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CopyIcon = styled(Feather)`
  margin-right: ${RFValue(12)}px;
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
