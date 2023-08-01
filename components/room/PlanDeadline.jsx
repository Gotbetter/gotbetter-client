import format from 'pretty-format';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilValue } from 'recoil';
import { studyRoomDetail } from 'recoil/room/atoms';
import styled from 'styled-components/native';

function PlanDeadline() {
  const studyRoom = useRecoilValue(studyRoomDetail);
  console.log(format(studyRoom));
  /** 스터디룸 시작 판단 */
  const isStudyRoomStarted = useMemo(() => {
    const today = new Date();
    const studyRoomStartDate = new Date(studyRoom.start_date);

    return today.getTime() - today.getTimezoneOffset() * 60000 >= studyRoomStartDate.getTime();
  }, [studyRoom]);

  const isStudyRoomEnd = useMemo(() => {
    const today = new Date();
    const studyRoomEndDate = new Date(studyRoom.start_date);
    studyRoomEndDate.setDate(studyRoomEndDate.getDate() + 7 * studyRoom.week);
    console.log(`오늘 : ${today} 마감: ${studyRoomEndDate}`);
    return today.getTime() - today.getTimezoneOffset() * 60000 >= studyRoomEndDate.getTime();
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
    console.log(today.getTime() - today.getTimezoneOffset() * 60000 >= thisWeekPlanCloseDate.getTime());

    if (today.getTime() - today.getTimezoneOffset() * 60000 >= thisWeekPlanCloseDate.getTime()) {
      // 이번 계획 시작일 + 7
      const endDate = new Date(thisWeekPlanStartDate);
      endDate.setDate(thisWeekPlanStartDate.getDate() + 7);
      console.log(endDate);
      const leftWeekDate = endDate.getTime() - today.getTime() - today.getTimezoneOffset() * 60000;

      return [true, null, Math.floor(leftWeekDate / 86400000) - 1];
    } else {
      // const leftPlanningDate
      return [
        false,
        Math.floor((thisWeekPlanCloseDate.getTime() - today.getTime() - today.getTimezoneOffset() * 60000) / 86400000) -
          1,
        null,
      ];
    }
  }, [studyRoom]);

  /** 스터디룸 시작 안했으면 정보 출력 x */
  if (!isStudyRoomStarted) {
    return null;
  }

  if (isStudyRoomEnd) {
    return <DeadLine>스터디룸 마감됨</DeadLine>;
  }

  if (isClosedPlanning) {
    return <DeadLine>D-{weekLeftDay === 0 ? 'Day' : weekLeftDay}</DeadLine>;
  }

  return <DeadLine>&#183; 계획수정 마감 D-{planningLeftDay === 0 ? 'Day' : planningLeftDay}</DeadLine>;
}

const DeadLine = styled.Text`
  color: #979797;
  font-weight: 600;
  margin-left: ${RFValue(4)}px;
`;
export default PlanDeadline;
