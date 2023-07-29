import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchStudyRoomDetail } from 'api/room';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { planFetchParamsState } from 'recoil/plan/atoms';
import { myParticipantIdSelector } from 'recoil/plan/selector';
import { studyRoomDetail, studyRoomInfoModalState } from 'recoil/room/atoms';

StudyRoomDetailFetcher.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
function StudyRoomDetailFetcher({ children }) {
  const { roomId } = useRoute().params;
  const navigation = useNavigation();

  const [studyRoom, setStudyRoomDetail] = useRecoilState(studyRoomDetail);
  const myParticipantId = useRecoilValue(myParticipantIdSelector);

  const openModal = useSetRecoilState(studyRoomInfoModalState);
  const setPlanFetchParams = useSetRecoilState(planFetchParamsState);

  /** 스터디룸 헤더 세팅 */
  useEffect(() => {
    navigation.setOptions({
      title: studyRoom && studyRoom.title,
      headerRight: () => <Feather name={'info'} size={30} onPress={() => openModal(true)} />,
    });
  }, [navigation, openModal, studyRoom]);

  /** 캐싱된 데이터가 있다면 해당 데이터로 recoil set */
  useEffect(() => {
    if (data !== undefined) {
      console.log('[StudyRoomDetailFetcher]: caching study room detail');
      setStudyRoomDetail({ ...data });
      setPlanFetchParams((prev) => ({ ...prev, participantId: myParticipantId, week: data.current_week }));
    }
  }, [data, myParticipantId, setStudyRoomDetail, setPlanFetchParams]);

  /**
   * 스터디룸 정보 불러오기
   * @param roomId: 현재 들어온 스터디룸의 아이디
   */
  const { isLoading, isError, data } = useQuery([`studyRoomDetail`, roomId], () => fetchStudyRoomDetail(roomId), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log('[StudyRoomDetailFetcher]: fetching study room detail');
      setStudyRoomDetail({ ...data });
      console.log(`set planFetchParams participantId:${myParticipantId} week:${data.current_week}`);
      setPlanFetchParams((prev) => ({ ...prev, participantId: myParticipantId, week: data.current_week }));
    },
    onError: () => {
      console.log('디테일 에러');
    },
    select: (res) => res.data,
  });

  if (isLoading)
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );

  if (isError)
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );

  return <>{children}</>;
}

export default StudyRoomDetailFetcher;
