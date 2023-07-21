import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

Schedules.propTypes = {
  startDate: PropTypes.string,
  totalWeek: PropTypes.number,
};

function Schedules({ startDate, totalWeek }) {
  return (
    <Container>
      <Label>진행 일정</Label>
      <Schedule>
        <ScheduleLabelView>
          <ScheduleLabel>시작{'\n'}날짜</ScheduleLabel>
        </ScheduleLabelView>
        <ScheduleDescriptionView>
          <ScheduleDescription>{startDate}</ScheduleDescription>
        </ScheduleDescriptionView>
      </Schedule>
      <Schedule>
        <ScheduleLabelView>
          <ScheduleLabel>전체{'\n'}주차</ScheduleLabel>
        </ScheduleLabelView>
        <ScheduleDescriptionView>
          <ScheduleDescription>{totalWeek}주</ScheduleDescription>
        </ScheduleDescriptionView>
      </Schedule>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: ${hp(16)}px;
  background-color: #ffffff;
  padding: ${RFValue(10)}px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
`;

const Label = styled.Text`
  width: 100%;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
`;

const ScheduleLabelView = styled.View`
  width: ${RFValue(48)}px;
  background-color: #c4c4c4;
  border-top-left-radius: ${RFValue(16)}px;
  border-bottom-left-radius: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
`;

const ScheduleLabel = styled.Text`
  color: #ffffff;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

const ScheduleDescriptionView = styled.View`
  width: ${RFValue(92)}px;
  justify-content: center;
  align-items: center;
`;

const ScheduleDescription = styled.Text`
  color: #697176;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

const Schedule = styled.View`
  flex-direction: row;
  height: ${RFValue(44)}px;
  background-color: #f3f3f3;
  border-radius: ${RFValue(18)}px;
`;

export default Schedules;
