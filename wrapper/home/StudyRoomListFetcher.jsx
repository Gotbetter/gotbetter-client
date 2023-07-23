import { fetchStudyRoomList } from 'api/room';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { studyRoomListRefreshingState, studyRoomListState } from 'recoil/room/atoms';

StudyRoomListFetcher.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function StudyRoomListFetcher({ children }) {
  const setStudyRoomListState = useSetRecoilState(studyRoomListState);
  const refreshing = useRecoilValue(studyRoomListRefreshingState);

  useEffect(() => {
    if (refreshing) refetch();
  }, [refetch, refreshing]);

  const { isLoading, isError, refetch } = useQuery('studyRoomList', fetchStudyRoomList, {
    retry: 1,
    staleTime: 300000,
    onSuccess: (data) => {
      console.log('fetch study room list');
      setStudyRoomListState([...data]);
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

export default StudyRoomListFetcher;
