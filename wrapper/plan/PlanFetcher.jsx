import { fetchDetailPlan, fetchPlan } from 'api/plan';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { detailPlanState, planFetchParamsState, planState } from 'recoil/plan/atoms';
import { studyRoomRefreshState } from 'recoil/room/atoms';

PlanFetcher.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

function PlanFetcher({ children }) {
  const { participantId, week } = useRecoilValue(planFetchParamsState);
  const refresh = useRecoilValue(studyRoomRefreshState);
  const setPlan = useSetRecoilState(planState);
  const setDetailPlan = useSetRecoilState(detailPlanState);

  /** 새로고침한 경우 plan, detailPlan refetch */
  useEffect(() => {
    if (refresh) {
      refetchPlan();
      refetchDetailPlan();
    }
  }, [refresh, refetchPlan, refetchDetailPlan]);

  /** plan, detailPlan 캐싱 */
  useEffect(() => {
    if (plan !== undefined && detailPlan !== undefined) {
      console.log('caching plan and detailPlan');
      setPlan({ ...plan });
      setDetailPlan([...detailPlan]);
    }
  }, [plan, detailPlan, setPlan, setDetailPlan]);

  /**
   * plan을 fetch 하는 query
   * @param participantId: 계획을 세운 참가자의 참여 아이디
   * @param week: 불러오는 계획의 주차
   */
  const {
    isError: planError,
    data: plan,
    refetch: refetchPlan,
  } = useQuery(['plan', participantId, week], () => fetchPlan(participantId, week), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format(`[PlanFetcher] error fetching plan participant_id=${participantId} week=${week}`));
    },
    onSuccess: (data) => {
      console.log(format(`[PlanFetcher] fetching plan participant_id=${participantId} week=${week}`));
      setPlan({ ...data });
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
    isLoading,
    data: detailPlan,
    refetch: refetchDetailPlan,
  } = useQuery(['detailPlan', planId], () => fetchDetailPlan(planId), {
    staleTime: 500000,
    onError: (err) => {
      console.log(format(err.response.status));
      console.log(format('[PlanFetcher] error fetching detailPlan'));
    },
    onSuccess: (data) => {
      console.log(format(`[PlanFetcher] fetching detailPlan planId=${planId}`));
      setDetailPlan([...data]);
    },
    select: (res) => res.data,
    enabled: !!planId,
  });

  if (planError) {
    return (
      <View>
        <Text>계획 fetch 에러</Text>
      </View>
    );
  }

  if (detailPlanError) {
    return (
      <View>
        <Text>세부 계획 fetch 에러</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default PlanFetcher;
