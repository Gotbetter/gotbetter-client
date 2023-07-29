import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilValue } from 'recoil';
import { studyRoomDetail } from 'recoil/room/atoms';
import styled from 'styled-components/native';

function PlanDeadline() {
  const studyRoom = useRecoilValue(studyRoomDetail);
  /** 스터디룸 시작 판단 */
  const isStudyRoomStarted = useMemo(() => {
    const today = new Date();
    const studyRoomStartDate = new Date(studyRoom.start_date);

    return today.getTime() - today.getTimezoneOffset() * 60000 >= studyRoomStartDate.getTime();
  }, [studyRoom]);
  /**
   * isClosedPlanning : 계획 마감했는지
   * planningLeftDay: 계획 수정 마감까지 남은 시간
   * weekLeftDay: 이번 주 계획까지 남은 기간
   */
  const [isClosedPlanning, planningLeftDay, weekLeftDay] = useMemo(() => {
    const today = new Date();
    const studyRoomStartDate = new Date(studyRoom.start_date);

    // 이번 계획 시작일
    const thisWeekPlanStartDate = new Date(studyRoomStartDate);
    thisWeekPlanStartDate.setDate(studyRoomStartDate.getDate() + (studyRoom.current_week - 1) * 7);

    // 이번 계획 수정 마감일
    const thisWeekPlanCloseDate = new Date(thisWeekPlanStartDate);
    thisWeekPlanCloseDate.setDate(thisWeekPlanCloseDate.getDate() + 3);

    if (today.getTime() - today.getTimezoneOffset() * 60000 >= thisWeekPlanCloseDate.getTime()) {
      return [true, thisWeekPlanStartDate.getDate() + 6 - today.getDate(), null];
    } else {
      return [false, null, thisWeekPlanCloseDate.getDate() - today.getDate() - 1];
    }
  }, [studyRoom]);

  /** 스터디룸 시작 안했으면 정보 출력 x */
  if (!isStudyRoomStarted) {
    return null;
  }

  if (isClosedPlanning) {
    return <DeadLine>D-{planningLeftDay === 0 ? 'Day' : planningLeftDay}</DeadLine>;
  }

  return <DeadLine>&#183; 계획수정 마감 D-{weekLeftDay === 0 ? 'Day' : weekLeftDay}</DeadLine>;
}

const DeadLine = styled.Text`
  color: #979797;
  font-weight: 600;
  margin-left: ${RFValue(4)}px;
`;
export default PlanDeadline;
