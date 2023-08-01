import PlanContents from '@components/plan/PlanContents';
import WeekList from '@components/plan/WeekList';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';

function PlanScreen() {
  const { username } = useRoute().params;
  const navigation = useNavigation();

  /** 계획 화면 헤더 설정 */
  useEffect(() => {
    navigation.setOptions({ title: `${username}의 계획` });
  }, [navigation, username]);

  return (
    <Container>
      <WeekList />
      <PlanContents />
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
  background-color: #f5f5f5;
`;

export default PlanScreen;
