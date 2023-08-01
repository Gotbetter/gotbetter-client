import InfoView from '@components/common/InfoView';
import OppositeButton from '@components/plan/OppositeButton';
import OppositeModal from '@components/plan/OppositeModal';
import { dislikePlan, fetchPlanDislike, undoDislikePlan } from 'api/plan';
import { format } from 'pretty-format';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { planOppositeModalState } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

PlanOpposite.propTypes = {
  plan: PropTypes.shape({ plan_id: PropTypes.number, three_days_passed: PropTypes.bool }),
  detailPlans: PropTypes.arrayOf(PropTypes.object),
  isMyPlan: PropTypes.bool,
};
function PlanOpposite({ plan, detailPlans, isMyPlan }) {
  const queryClient = useQueryClient();

  const [modal, setModal] = useRecoilState(planOppositeModalState);

  const { isLoading, isError, data } = useQuery(['planDislike', plan.plan_id], () => fetchPlanDislike(plan.plan_id), {
    staleTime: Infinity,
    onError: (err) => {
      console.log(err.response.status);
      console.log('[PlanOpposite] failed fetch plan dislike');
    },
    onSuccess: (data) => {
      console.log('[PlanOpposite] success fetch plan dislike');
    },
    select: (res) => res.data,
  });

  const { mutate: dislike } = useMutation(() => dislikePlan(plan.plan_id), {
    onError: (err) => {
      console.log(err.response.status);
      console.log(format(err.response));
      console.log(`[PlanOpposite] failed dislike plan ${plan.plan_id}`);
    },
    onSuccess: (res) => {
      console.log(`[PlanOpposite] success dislike plan ${plan.plan_id}`);
      queryClient.invalidateQueries(['planDislike', plan.plan_id]);
    },
  });

  const { mutate: undoDislike } = useMutation(() => undoDislikePlan(plan.plan_id), {
    onError: (err) => {
      console.log(err.response.status);
      console.log(`[PlanOpposite] failed undoDislike plan ${plan.plan_id}`);
    },
    onSuccess: (res) => {
      console.log(`[PlanOpposite] success undoDislike plan ${plan.plan_id}`);
      queryClient.invalidateQueries(['planDislike', plan.plan_id]);
    },
  });

  const onPressOppositeButton = () => {
    setModal(true);
  };

  const onPressCloseModal = () => setModal(false);

  const onPressOppositeModalButton = () => {
    dislike();
    setModal(false);
  };

  if (plan.three_days_passed || isMyPlan || detailPlans.length === 0) {
    return null;
  }

  if (isLoading) {
    return <InfoView message={'로딩중...'} />;
  }

  if (isError) {
    return <InfoView message={'에러발생!'} />;
  }

  return (
    <ButtonContainer>
      <OppositeButton
        opposite={data.checked}
        onPress={data.checked ? () => undoDislike() : () => onPressOppositeButton()}
      />
      <OppositeModal visible={modal} close={onPressCloseModal} onPress={onPressOppositeModalButton} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default PlanOpposite;
