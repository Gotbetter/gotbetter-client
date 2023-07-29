import Profile from '@components/common/Profile';
import StudyRoomInfoModal from '@components/room/modal/StudyRoomInfoModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchStudyRoomRank } from 'api/room';
import format from 'pretty-format';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { studyRoomDetail, studyRoomInfoModalState } from 'recoil/room/atoms';
import styled from 'styled-components/native';

function StudyRoomRankScreen(props) {
  const { roomId } = useRoute().params;
  const navigation = useNavigation();
  const today = useMemo(() => new Date(), []);

  const studyRoom = useRecoilValue(studyRoomDetail);
  const openModal = useSetRecoilState(studyRoomInfoModalState);

  /** 새로고침 flag */
  const [refresh, setRefresh] = useState(false);

  /** 랭킹 헤더 초기화 */
  useEffect(() => {
    navigation.setOptions({
      title: studyRoom.title,
      headerRight: () => <Feather name={'info'} size={30} onPress={() => openModal(true)} />,
    });
  }, [roomId, studyRoom.title, navigation, openModal]);

  /** 새로고칭할 경우 랭킹 정보 다시 불러오기 */
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refetch, refresh, setRefresh]);

  /** 새로고칭 */
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, [setRefresh]);

  /**
   * 현재 스터디룸에 소속된 참가자들의 랭킹 조회
   * @param roomId : 참가자들이 소속한 스터디룸의 아이디
   */
  const { isLoading, isError, data, refetch } = useQuery([`studyRoomRank`, roomId], () => fetchStudyRoomRank(roomId), {
    retry: 1,
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response));
    },
    onSuccess: (data) => {
      console.log('[StudyRoomRankScreen]: fetching study room rank');
    },
    select: (res) => res.data,
  });

  if (isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러발생</Text>
      </View>
    );
  }

  return (
    <Container>
      <LabelContainer>
        <Label>랭킹</Label>
      </LabelContainer>
      <DateContainer>
        <DateInfo>{`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 기준`}</DateInfo>
      </DateContainer>

      <ContentContainer>
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
          {data.map((item, index) => (
            <Item key={item.rank_id}>
              <Rank>{item.rank}</Rank>
              <Profile style={{ width: 50, height: 50, borderRadius: 50 }} image={item.profile} />

              <Name>{item.username}</Name>
              <Refund>{item.refund.toLocaleString('ko-KR')}원</Refund>
            </Item>
          ))}
        </ScrollView>
      </ContentContainer>
      <StudyRoomInfoModal />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: ${RFValue(18)}px;

  flex-wrap: wrap;
  flex-direction: row;
`;

const LabelContainer = styled.View`
  width: 20%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.View`
  width: 80%;
  height: 10%;
  justify-content: center;
  align-items: flex-start;
  padding-left: ${RFValue(4)}px;
`;

const Label = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: 600;
`;

const DateInfo = styled.Text`
  font-size: ${RFValue(14)}px;
  color: #848484;
`;

const ContentContainer = styled.View`
  width: 100%;
  height: 80%;
  margin-top: ${RFValue(12)}px;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;

  padding: ${RFValue(15)}px;
`;

const Rank = styled.Text`
  color: #848484;
  font-size: ${RFValue(18)}px;
  font-weight: 700;
`;

const Name = styled.Text`
  width: 50%;
  font-size: ${RFValue(13)}px;
  font-weight: 700;
`;

const Refund = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

export default StudyRoomRankScreen;
