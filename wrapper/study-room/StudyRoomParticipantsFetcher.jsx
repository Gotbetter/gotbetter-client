import { useRoute } from '@react-navigation/native';
import { fetchStudyRoomParticipants } from 'api/room';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { participantList } from 'recoil/participant/atoms';
import { studyRoomRefreshState } from 'recoil/room/atoms';

StudyRoomParticipantsFetcher.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function StudyRoomParticipantsFetcher({ children }) {
  const refresh = useRecoilValue(studyRoomRefreshState);
  const setParticipants = useSetRecoilState(participantList);

  const { roomId } = useRoute().params;
  const accepted = useMemo(() => true, []);

  /** 캐싱된 데이터가 있다면 해당 데이터로 recoil set */
  useEffect(() => {
    if (data !== undefined) {
      setParticipants([...data]);
    }
  }, [data, setParticipants]);

  /** 리프레시 */
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  /**
   * 스터디룸 참가자 불러오기
   * @param roomId: 참여자들이 소속된 스터디룸의 아이디
   * @param accepted: 스터디룸에 소속되었는지 여부
   */
  const { isLoading, isError, data, refetch } = useQuery(
    [`studyRoomParticipants`, roomId, accepted],
    () => fetchStudyRoomParticipants(roomId, accepted),
    {
      retry: 1,
      staleTime: 500000,
      onSuccess: (data) => {
        console.log('[StudyRoomParticipantsFetcher]: fetching study room participants');
        setParticipants([...data]);
      },
      onError: (err) => {
        console.log('참가자 에러');
        console.log(format(err));
      },
      select: (res) => res.data,
    },
  );

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

export default StudyRoomParticipantsFetcher;
