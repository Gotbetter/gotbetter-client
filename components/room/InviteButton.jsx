import ActionButton from '@components/common/btn/ActionButton';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { studyRoomInviteCodeModalState } from 'recoil/room/atoms';
import { getMyAuthority } from 'recoil/room/selectors';
import styled from 'styled-components';

function InviteButton() {
  const isLeader = useRecoilValue(getMyAuthority);
  const setVisible = useSetRecoilState(studyRoomInviteCodeModalState);

  if (isLeader) {
    return (
      <ButtonConatiner>
        <ActionButton
          title={'초대하기'}
          width={wp(90)}
          height={hp(8)}
          color={'#3333FF'}
          round={true}
          onPress={() => setVisible(true)}
        />
      </ButtonConatiner>
    );
  }
}

const ButtonConatiner = styled.View`
  width: 100%;
  height: ${hp(10)}px;
  align-self: center;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

export default InviteButton;
