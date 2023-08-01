import PlanAdd from '@components/plan/PlanAdd';
import PlanOpposite from '@components/plan/PlanOpposite';
import { useRoute } from '@react-navigation/native';
import { fetchDetailPlan, fetchPlan } from 'api/plan';
import { format } from 'pretty-format';
import React, { useMemo } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useQuery } from 'react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { user } from 'recoil/auth/atoms';
import { planAddModeState, planFetchParamsState, planModifyModeState } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

import InfoView from '../../components/common/InfoView';
import PlanList from '../../components/plan/PlanList';

function PlanContents() {
  const { username } = useRoute().params;
  const myInfo = useRecoilValue(user);
  const isMyPlan = useMemo(() => username === myInfo.username, [myInfo.username, username]);

  const { participantId, week } = useRecoilValue(planFetchParamsState);

  const resetPlanInputMode = useResetRecoilState(planAddModeState);
  const resetPlanModifyMode = useResetRecoilState(planModifyModeState);

  /** 계획 추가 input 이외의 화면을 누르면 addButton으로 전환 */
  const onTouchOutside = () => {
    Keyboard.dismiss();
    resetPlanInputMode();
    resetPlanModifyMode();
  };

  /**
   * plan을 fetch 하는 query
   * @param participantId: 계획을 세운 참가자의 참여 아이디
   * @param week: 불러오는 계획의 주차
   */
  const {
    isLoading: planLoading,
    isError: planError,
    data: plan,
  } = useQuery(['plan', participantId, week], () => fetchPlan(participantId, week), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format(`[PlanFetcher] error fetching plan participant_id=${participantId} week=${week}`));
    },
    onSuccess: (data) => {
      console.log(format(`[PlanFetcher] fetching plan participant_id=${participantId} week=${week}`));
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
  } = useQuery(['detailPlan', planId], () => fetchDetailPlan(planId), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format('[PlanFetcher] error fetching detailPlan'));
    },
    onSuccess: (data) => {
      console.log(format(`[PlanFetcher] fetching detailPlan planId=${planId}`));
    },
    select: (res) => res.data,
    enabled: !!planId,
  });

  if (planLoading || detailPlanLoading) {
    return <InfoView message={'로딩중...'} />;
  }

  if (planError) {
    return <InfoView message={'계획 불러오기 에러!'} />;
  }

  if (detailPlanError) {
    return <InfoView message={'세부계획 불러오기 에러!'} />;
  }

  return (
    <TouchableWithoutFeedback onPress={onTouchOutside}>
      <ContentContainer>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <PlanList plan={plan} detailPlans={detailPlans} isMyPlan={isMyPlan} />
          <PlanAdd plan={plan} isMyPlan={isMyPlan} />
        </KeyboardAwareScrollView>
        <PlanOpposite plan={plan} detailPlans={detailPlans} isMyPlan={isMyPlan} />
      </ContentContainer>
    </TouchableWithoutFeedback>
  );
}

const ContentContainer = styled.View`
  width: 100%;
  height: 90%;

  align-items: center;

  padding-vertical: ${RFValue(16)}px;
  padding-horizontal: ${RFValue(12)}px;
`;
export default PlanContents;
