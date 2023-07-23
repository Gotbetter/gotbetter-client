import { useNavigation } from '@react-navigation/native';
import { fetchStudyRoomDetail } from 'api/room';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { studyRoomDetail, studyRoomInfoModalState } from 'recoil/room/atoms';

StudyRoomDetailFetcher.propTypes = {
  roomId: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
function StudyRoomDetailFetcher({ roomId, children }) {
  const [studyRoom, setStudyRoomDetail] = useRecoilState(studyRoomDetail);
  const openModal = useSetRecoilState(studyRoomInfoModalState);

  const navigation = useNavigation();

  /**
   * 헤더 타이틀 세팅
   */
  useEffect(() => {
    console.log('render header');
    navigation.setOptions({
      title: studyRoom && studyRoom.title,
      headerRight: () => <Feather name={'info'} size={30} onPress={() => openModal(true)} />,
    });
  }, [navigation, studyRoom]);

  /**
   * 캐싱된 데이터가 있다면 해당 데이터로 recoil set
   */
  useEffect(() => {
    console.log('render cache');
    if (data !== undefined) {
      setStudyRoomDetail({ ...data });
    }
  }, [data, setStudyRoomDetail]);

  /**
   * 스터디룸 정보 불러오기
   */
  const { isLoading, isError, data } = useQuery(`studyRoomDetail/${roomId}`, () => fetchStudyRoomDetail(roomId), {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log('fetch study room detail');
      setStudyRoomDetail({ ...data });
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
