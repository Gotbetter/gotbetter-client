import ActionButton from '@components/common/btn/ActionButton';
import { useModal } from '@hooks/common';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilValue } from 'recoil';
import { myStudyRoomAuthoritySelector } from 'recoil/room/selectors';
import styled from 'styled-components';

function InviteButton() {
  const isLeader = useRecoilValue(myStudyRoomAuthoritySelector);
  const { openModal } = useModal('studyRoomCodeInfo');

  /** 방장일 경우에만 렌더링 */
  if (!isLeader) return null;

  return (
    <ButtonConatiner>
      <ActionButton
        title={'초대하기'}
        width={wp(90)}
        height={hp(8)}
        color={'#3333FF'}
        round={true}
        onPress={openModal}
      />
    </ButtonConatiner>
  );
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
