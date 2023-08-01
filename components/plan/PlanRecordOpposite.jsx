import { useNavigation, useRoute } from '@react-navigation/native';
import { dislikePlanRecord, undoDislikePlanRecord } from 'api/plan';
import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

import OppositeButton from './OppositeButton';
import OppositeModal from './OppositeModal';

function PlanRecordOpposite(props) {
  const { detailPlan, planId } = useRoute().params;
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const { mutate: dislike } = useMutation(() => dislikePlanRecord(detailPlan.detail_plan_id), {
    onError: (err) => {
      const { status } = err.response;

      if (status === 403) {
        Toast.show('미완료 처리된 계획입니다.', { duration: Toast.durations.SHORT });
      }

      if (status === 409) {
        Toast.show('이미 평가한 인증입니다.', { duration: Toast.durations.SHORT });
      }
      console.log('[PlanRecordOpposite] failed plan record dislike');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordOpposite] success plan record dislike');
      queryClient.invalidateQueries(['planRecords', detailPlan.detail_plan_id]);
      queryClient.invalidateQueries(['detailPlan', planId]);
      navigation.setParams({ detailPlan: { ...detailPlan, detail_plan_dislike_checked: true } });
    },
  });

  const { mutate: undoDislike } = useMutation(() => undoDislikePlanRecord(detailPlan.detail_plan_id), {
    onError: (err) => {
      console.log(err.response.status);
      console.log('[PlanRecordOpposite] failed plan record undo dislike');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordOpposite] success plan record undo dislike');
      navigation.setParams({ detailPlan: { ...detailPlan, detail_plan_dislike_checked: false } });
      queryClient.invalidateQueries(['planRecords', detailPlan.detail_plan_id]);
      queryClient.invalidateQueries(['detailPlan', planId]);
    },
  });

  const onPressOppositeModalButton = () => {
    dislike();
    setVisible(false);
  };

  return (
    <ButtonContainer>
      <OppositeButton
        opposite={detailPlan.detail_plan_dislike_checked}
        onPress={detailPlan.detail_plan_dislike_checked ? () => undoDislike() : () => setVisible(true)}
      />
      <OppositeModal visible={visible} close={() => setVisible(false)} onPress={onPressOppositeModalButton} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity`
  height: 10%;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

export default PlanRecordOpposite;
