import { PlanContents, WeekList } from '@components/plan';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

function PlanScreen() {
  const {
    planner: { username },
    studyRoomDetails: { current_week, week },
  } = useRoute().params;
  const navigation = useNavigation();

  const [planFetchWeek, setPlanFetchWeek] = useState(current_week);

  /** 계획 화면 헤더 설정 */
  useEffect(() => {
    navigation.setOptions({ title: `${username}의 계획` });
  }, [navigation, username]);

  return (
    <Container>
      <WeekList
        weekInfo={{ selectedWeek: planFetchWeek, totalWeek: week, currentWeek: current_week }}
        onPress={setPlanFetchWeek}
      />
      <PlanContents fetchWeek={planFetchWeek} />
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
  background-color: #f5f5f5;
`;

export default PlanScreen;
