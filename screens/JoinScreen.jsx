import ActionButton from '@components/common/btn/ActionButton';
import JoinRequestModal from '@components/join/JoinRequestModal';
import { joinRequest } from 'api/join';
import format from 'pretty-format';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { joinRequestState, joinRequestModalState, joinRequestMessage } from 'recoil/join/atoms';
import styled from 'styled-components/native';

function JoinScreen() {
  const [request, setRequest] = useState('');

  const [requireFulfilled, setRequireFulfilled] = useState(false);

  const setVisible = useSetRecoilState(joinRequestModalState);
  const setError = useSetRecoilState(joinRequestState);
  const setErrorMessage = useSetRecoilState(joinRequestMessage);

  useEffect(() => {
    setRequireFulfilled(request !== '');
  }, [request]);

  const { mutate: join } = useMutation(() => joinRequest(request), {
    onError: (err) => {
      const {
        response: {
          data: { errors },
        },
      } = err;
      const { status } = err.response;

      const { errorMessage } = errors[0];
      if (status === 404) {
        setErrorMessage('유효하지 않은 방코드 입니다.');
      } else if (status === 409) {
        if (errorMessage === 'Already exists data.') {
          setErrorMessage('이미 참가요청을 보낸 스터디룸 입니다.');
        }
        if (errorMessage === 'Already in the room.') {
          setErrorMessage('이미 참여한 스터디룸 입니다.');
        }
        if (errorMessage === 'Already full.') {
          setErrorMessage('스터디룸의 정원이 가득 찼습니다.');
        }
      }
      setError(true);
      setVisible(true);
    },
    onSuccess: (res) => {
      console.log(format(res.data));
      setError(false);
      setVisible(true);
    },
  });

  return (
    <Form>
      <Label>참여코드를 입력해주세요</Label>
      <Input placeholder="참여코드를 입력해주세요." onChangeText={setRequest} />
      <ButtonContainer>
        <ActionButton
          onPress={join}
          title={'참여하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
          disabled={!requireFulfilled}
        />
      </ButtonContainer>

      <JoinRequestModal />
    </Form>
  );
}

const Form = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 600;

  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
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

export default JoinScreen;
