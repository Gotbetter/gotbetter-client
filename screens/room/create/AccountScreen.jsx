import ActionButton from '@components/common/btn/ActionButton';
import StudyRoomCreateInfoModal from '@components/room/modal/StudyRoomCreateInfoModal';
import { useNavigation } from '@react-navigation/native';
import { createPlan } from 'api/plan';
import { createStudyRoomRequest } from 'api/room';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { studyRoomCreateRequest } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function AccountScreen(props) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requireFulfilled, setRequireFulfilled] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState(-1);

  const [request, setRequest] = useRecoilState(studyRoomCreateRequest);
  const resetRequest = useResetRecoilState(studyRoomCreateRequest);

  useEffect(() => {
    setRequireFulfilled(request.account !== '');
  }, [request.account]);

  const onChange = (account) => {
    setRequest((prev) => ({ ...prev, account }));
  };

  const onClose = () => {
    setError(false);
    setSuccess(false);
    resetRequest();
    navigation.navigate('home');
  };

  const { mutate: createStudyRoom } = useMutation(() => createStudyRoomRequest(request), {
    onError: () => {
      setError(true);
    },
    onSuccess: (res) => {
      const { data } = res;
      queryClient.invalidateQueries(['studyRoomList']);
      setCreatedRoomId(data.room_id);
      createLeaderPlan(data.participant_id);
    },
  });

  const { mutate: createLeaderPlan } = useMutation((participant_id) => createPlan(participant_id), {
    onError: () => {
      setError(true);
    },
    onSuccess: (res) => {
      setSuccess(true);
    },
  });

  return (
    <RoomCreateForm title={'계좌 번호 입력하기'}>
      <Label>계좌 번호 입력하기</Label>
      <Input value={request.account} placeholder="계좌 번호를 입력해주세요.." onChangeText={onChange} />
      <Example>ex) 국민 000000-00-00000</Example>
      <ButtonContainer>
        <ActionButton
          onPress={() => createStudyRoom(request)}
          title={requireFulfilled ? '완료' : '계좌 번호 입력하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
          disabled={!requireFulfilled}
        />
      </ButtonContainer>

      <StudyRoomCreateInfoModal error={error} success={success} close={onClose} roomId={createdRoomId} />
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const Example = styled.Text`
  width: ${wp(90)}px;
  align-self: center;
  margin-top: ${RFValue(4)}px;
  padding-left: ${RFValue(4)}px;

  font-size: ${RFValue(10)}px;
  color: #979797;
`;

const Input = styled.TextInput`
  width: ${wp(90)}px;
  height: ${hp(7)}px;

  margin-top: ${hp(1)}px;
  padding-left: ${RFValue(12)}px;

  align-self: center;

  border-width: 1px;
  border-radius: 10px;
  border-color: #e0e0e0;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;

export default AccountScreen;
