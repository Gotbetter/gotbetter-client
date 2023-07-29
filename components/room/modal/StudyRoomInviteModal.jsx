import Profile from '@components/common/Profile';
import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import { useRoute } from '@react-navigation/native';
import { acceptJoinRequest, rejectJoinRequest } from 'api/join';
import { createPlan } from 'api/plan';
import format from 'pretty-format';
import React from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import { Shadow } from 'react-native-shadow-2';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { joinRequestList } from 'recoil/participant/atoms';
import { studyRoomInviteRequestModalState } from 'recoil/room/atoms';
import styled from 'styled-components/native';

function StudyRoomInviteModal() {
  const { roomId } = useRoute().params;
  const queryClient = useQueryClient();
  const joinRequests = useRecoilValue(joinRequestList);

  const [visible, setVisible] = useRecoilState(studyRoomInviteRequestModalState);
  const close = () => setVisible(false);

  const { mutate: accept } = useMutation((userId) => acceptJoinRequest(userId, roomId), {
    onError: (err) => {
      console.log(format(err.response));
      const { status } = err.response;

      if (status === 403) {
        Toast.show('권한이 없습니다.', { duration: Toast.durations.SHORT });
      }

      if (status === 404) {
        Toast.show('존재하지 않은 유저입니다.', { duration: Toast.durations.SHORT });
      }
      if (status === 409) {
        Toast.show('스터디룸 정원이 가득 찼습니다.', { duration: Toast.durations.SHORT });
      }
    },
    onSuccess: (res) => {
      console.log('success accept join request');
      queryClient.invalidateQueries({
        queryKey: [`studyRoomParticipants`, roomId, true],
      });
      queryClient.invalidateQueries({
        queryKey: [`studyRoomJoinRequests`, roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [`studyRoomRank`, roomId],
      });

      console.log(`request plan create request ${res.data.participant_id}`);
      createPlanRequest(res.data.participant_id);
    },
  });

  const { mutate: createPlanRequest } = useMutation((participantId) => createPlan(participantId), {
    onError: (err) => {
      console.log(err.response.status);
      console.log('failed request create plan');
    },
    onSuccess: (res) => {
      console.log('success request create plan');
    },
  });

  const { mutate: reject } = useMutation((userId) => rejectJoinRequest(userId, roomId), {
    onError: (err) => {
      console.log(format(err.response));
      const { status } = err.response;

      if (status === 403) {
        Toast.show('권한이 없습니다.', { duration: Toast.durations.SHORT });
      }

      if (status === 404) {
        Toast.show('존재하지 않은 유저입니다.', { duration: Toast.durations.SHORT });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`studyRoomJoinRequests/${roomId}`],
      });
    },
  });

  return (
    <ListModal visible={visible} onRequestClose={close}>
      <Container>
        <Label>초대하기</Label>
        <ContentContainer>
          <ScrollView>
            {joinRequests.map((participant) => (
              <MarginBottom key={participant.user_id}>
                <Shadow distance={1} offset={[0, 2]} style={{ borderRadius: 10 }}>
                  <WaitParticipant>
                    <Profile style={{ width: 50, height: 50, borderRadius: 50 }} image={participant.profile} />
                    <Name>{participant.username}</Name>
                    <ButtonGroup>
                      <ModalButton
                        title={'수락'}
                        width={wp(18)}
                        height={RFValue(24)}
                        highlight={true}
                        onPress={() => accept(participant.user_id)}
                      />
                      <ModalButton
                        title={'거절'}
                        width={wp(18)}
                        height={RFValue(24)}
                        onPress={() => reject(participant.user_id)}
                      />
                    </ButtonGroup>
                  </WaitParticipant>
                </Shadow>
              </MarginBottom>
            ))}
          </ScrollView>
        </ContentContainer>
        <ButtonContainer>
          <ModalButton title={'닫기'} onPress={close} />
        </ButtonContainer>
      </Container>
    </ListModal>
  );
}

const Container = styled.View`
  min-width: ${wp(76)}px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-bottom: ${RFValue(20)}px;
`;

const ContentContainer = styled.View`
  height: ${hp(50)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  width: 40%;
`;

const ButtonContainer = styled.View`
  margin-top: ${RFValue(24)}px;
`;

const WaitParticipant = styled.View`
  width: ${wp(76)}px;
  height: ${hp(12)}px;
  background-color: #ffffff;

  border-radius: 10px;
  padding: ${RFValue(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.View`
  height: 100%;
  justify-content: space-around;
`;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(12)}px;
`;
export default StudyRoomInviteModal;
