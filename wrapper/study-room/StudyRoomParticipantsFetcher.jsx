import { fetchStudyRoomParticipants } from 'api/room';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { studyRoomJoinRequests, studyRoomParticipants } from 'recoil/room/atoms';

StudyRoomParticipantsFetcher.propTypes = {
  roomId: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function StudyRoomParticipantsFetcher({ roomId, children }) {
  const setParticipants = useSetRecoilState(studyRoomParticipants);
  const setJoinRequests = useSetRecoilState(studyRoomJoinRequests);
  /**
   * 캐싱된 데이터가 있다면 해당 데이터로 recoil set
   */
  useEffect(() => {
    if (participants !== undefined) {
      setParticipants([...participants]);
    }
    if (joinRequests !== undefined) {
      setJoinRequests([...joinRequests]);
    }
  }, [joinRequests, participants, setJoinRequests, setParticipants]);

  /**
   * 스터디룸 참가자 정보 불러오기
   */
  const {
    isLoading: loadingParticipants,
    isError: errorParticipants,
    data: participants,
  } = useQuery(`studyRoomParticipants/${roomId}`, () => fetchStudyRoomParticipants(roomId, true), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      setParticipants([...data]);
    },
    onError: (err) => {
      console.log('참가자 에러');
      console.log(format(err));
    },
    select: (res) => res.data,
  });

  /**
   * 스터디룸 참가자 정보 불러오기
   */
  const {
    isLoading: loadingJoinRequests,
    isError: errorJoinRequests,
    data: joinRequests,
  } = useQuery(`studyRoomJoinRequests/${roomId}`, () => fetchStudyRoomParticipants(roomId, false), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      setJoinRequests([...data]);
    },
    onError: (err) => {
      console.log('참가 요청 에러');
      console.log(format(err));
    },
    select: (res) => res.data,
  });

  if (loadingJoinRequests || loadingParticipants)
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );

  if (errorJoinRequests || errorParticipants)
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );

  return <>{children}</>;
}

export default StudyRoomParticipantsFetcher;
