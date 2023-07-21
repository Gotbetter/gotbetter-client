import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

function ThisWeekDetailPlans(props) {
  const detailPlans = useMemo(
    () => [
      {
        plan_id: 1,
        detail_plan_id: 1,
        content: '데이터베이스 중간고사',
        complete: true,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 2,
        detail_plan_id: 2,
        content: '컴웅통 중간고사',
        complete: false,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 3,
        detail_plan_id: 4,
        content: '컴응통 7과 풀고 제출',
        complete: true,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 4,
        detail_plan_id: 5,
        content: '아침에 계절 수강',
        complete: false,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
    ],
    [],
  );

  return (
    <Container>
      <Label>이번주 나의 계획</Label>
      <LeftDay>D-4</LeftDay>

      <DetailPlanContainer>
        {detailPlans.map((detailPlan) => (
          <DetailPlanItem key={detailPlan.detail_plan_id} detailPlan={detailPlan} />
        ))}
      </DetailPlanContainer>
    </Container>
  );
}

const DetailPlanItem = ({ detailPlan }) => {
  const { content, complete } = detailPlan;

  return (
    <DetailPlan>
      <CheckBox>
        <Feather name={'check'} color={'#000000'} size={RFValue(20)} />
      </CheckBox>
      <Description numberOfLines={1}>{content}</Description>
    </DetailPlan>
  );
};

DetailPlanItem.propTypes = {
  detailPlan: PropTypes.shape({
    plan_id: PropTypes.number,
    detail_plan_id: PropTypes.number,
    content: PropTypes.string,
    complete: PropTypes.bool,
    rejected: PropTypes.bool,
    detail_plan_dislike_count: PropTypes.number,
    detail_plan_dislike_checked: PropTypes.bool,
  }),
};

const Container = styled.View`
  width: 100%;

  padding: ${RFValue(10)}px;
  background-color: #ffffff;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
`;

const LeftDay = styled.Text`
  color: #979797;
  font-weight: 600;
  margin-left: ${RFValue(4)}px;
`;

const DetailPlanContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(12)}px;
`;
const DetailPlan = styled.View`
  padding-vertical: ${RFValue(12)}px;
  flex-direction: row;
`;

const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(12)}px;
`;

const CheckBox = styled.View`
  border-radius: 5px;
  background-color: #e7e7e7;
`;

export default ThisWeekDetailPlans;
