import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { useRecoilValue } from 'recoil';
import { detailPlanState } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

import PlanDeadline from './PlanDeadline';

function ThisWeekDetailPlans() {
  const detailPlans = useRecoilValue(detailPlanState);

  return (
    <Container>
      <Label>이번주 나의 계획</Label>
      <PlanDeadline />

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
      <CheckBox>{complete && <Feather name={'check'} color={'#000000'} size={RFValue(20)} />}</CheckBox>
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
  min-height: 100%;

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
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: 5px;
  background-color: #e7e7e7;
`;

export default ThisWeekDetailPlans;
