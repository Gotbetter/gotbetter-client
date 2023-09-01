import { useRefresh } from '@hooks/common';
import { fetchDetailPlan, fetchPlan } from 'api/plan';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myStudyRoomParticipantIdSelector } from 'recoil/room/selectors';
import styled from 'styled-components/native';

import PlanDeadline from './PlanDeadline';
import { useNavigation } from '@react-navigation/core';

ThisWeekDetailPlans.propTypes = {
  details: PropTypes.shape({
    week: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    current_week: PropTypes.number.isRequired,
  }).isRequired,
};

function ThisWeekDetailPlans({ details }) {
  const { current_week: week } = details;
  const { refresh } = useRefresh('studyRoomScreen');

  const participantId = useRecoilValue(myStudyRoomParticipantIdSelector);

  /** 새로고침한 경우 plan, detailPlan refetch */
  useEffect(() => {
    if (refresh.refreshing) {
      refetchPlan();
      refetchDetailPlan();
    }
  }, [refresh, refetchPlan, refetchDetailPlan]);

  /**
   * plan을 fetch 하는 query
   * @param participantId: 계획을 세운 참가자의 참여 아이디
   * @param week: 불러오는 계획의 주차
   */
  const {
    isLoading: planLoading,
    isError: planError,
    data: plan,
    refetch: refetchPlan,
  } = useQuery(['myPlan', participantId, week], () => fetchPlan(participantId, week), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format(`[ThisWeekDetailPlans] error fetching plan participant_id=${participantId} week=${week}`));
    },
    onSuccess: (data) => {
      console.log(format(`[ThisWeekDetailPlans] fetching plan participant_id=${participantId} week=${week}`));
    },
    select: (res) => res.data,
  });

  const planId = plan?.plan_id;

  /**
   * detailPlan fetch query는 path variable로 planId를 포함해야 하므로 plan fetch query에 의존적이다.
   * 따라서 plan이 fetch된 이후에 호출 되어야함
   */
  const {
    isError: detailPlanError,
    isLoading: detailPlanLoading,
    data: detailPlans,
    refetch: refetchDetailPlan,
  } = useQuery(['myDetailPlan', planId], () => fetchDetailPlan(planId), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format('[ThisWeekDetailPlans] error fetching detailPlan'));
    },
    onSuccess: (data) => {
      console.log(format(`[ThisWeekDetailPlans] fetching detailPlan planId=${planId}`));
    },
    select: (res) => res.data,
    enabled: !!planId,
  });

  if (planError || detailPlanError) return null;

  if (planLoading || detailPlanLoading) return <ActivityIndicator size="large" color={'#3333FF'} />;

  return (
    <Container>
      <Label>이번주 나의 계획</Label>
      <PlanDeadline details={details} />

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

  const navigation = useNavigation();
  return (
    <DetailPlan
      onPress={() => navigation.navigate('plan-routes', { screen: 'detail', params: { detailPlan, isMyPlan: true } })}
    >
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
const DetailPlan = styled.TouchableOpacity`
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
