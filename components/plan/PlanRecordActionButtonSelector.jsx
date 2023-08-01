import { useRoute } from '@react-navigation/native';
import React from 'react';

import PlanRecordAdd from './PlanRecordAdd';
import PlanRecordOpposite from './PlanRecordOpposite';

function PlanRecordActionButtonSelector() {
  const { isMyPlan, isEnd } = useRoute().params;
  const { detailPlan } = useRoute().params;

  if (isEnd) return null;

  if (isMyPlan && !detailPlan.complete) {
    return <PlanRecordAdd />;
  }

  if (!isMyPlan && detailPlan.complete) {
    return <PlanRecordOpposite />;
  }
}

export default PlanRecordActionButtonSelector;
