import InfoView from '@components/common/InfoView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { completeDetailPlanRequest, completeUndoDetailPlanRequest, updateDetailPlan } from 'api/plan';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import { Shadow } from 'react-native-shadow-2';
import Feather from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { planModifyModeState } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

import DropDown from './DropDown';

PlanList.propTypes = {
  fetchWeek: PropTypes.number.isRequired,
  plan: PropTypes.shape({ plan_id: PropTypes.number, three_days_passed: PropTypes.bool }),
  detailPlans: PropTypes.arrayOf(PropTypes.object),
  isMyPlan: PropTypes.bool,
};

function PlanList({ fetchWeek, plan, detailPlans, isMyPlan }) {
  const {
    studyRoomDetails: { current_week },
  } = useRoute().params;

  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const [isModify, setIsModify] = useRecoilState(planModifyModeState);

  const [modifyRequest, setModifyRequest] = useState('');
  const [modifyPlanId, setModifyPlanId] = useState();

  const onPressModify = (detailPlanId) => {
    setIsModify(true);
    setModifyPlanId(detailPlanId);
  };

  /** 세부계획 수정하기 */
  const { mutate: update } = useMutation(() => updateDetailPlan(plan.plan_id, modifyPlanId, modifyRequest), {
    onSuccess: (res) => {
      console.log(`success update detailPlan complete detailPlanId=${modifyPlanId}`);
      queryClient.invalidateQueries(['detailPlan', plan.plan_id]);
      queryClient.invalidateQueries(['myDetailPlan', plan.plan_id]);
    },
  });

  /** 세부계획 완료처리 */
  const { mutate: completeDetailPlan } = useMutation(
    (detailPlanId) => completeDetailPlanRequest(plan.plan_id, detailPlanId),
    {
      onError: (err, variables) => {
        console.log(err.response.status);
        console.log(`err request detailPlan complete detailPlanId=${variables}`);
      },
      onSuccess: (res, variables) => {
        console.log(`success request detailPlan complete detailPlanId=${variables}`);
        queryClient.invalidateQueries(['detailPlan', plan.plan_id]);
        queryClient.invalidateQueries(['myDetailPlan', plan.plan_id]);
      },
    },
  );

  /** 세부계획 완료 취소하기 */
  const { mutate: completeUndoDetailPlan } = useMutation(
    (detailPlanId) => completeUndoDetailPlanRequest(plan.plan_id, detailPlanId),
    {
      onError: (err, variables) => {
        console.log(err.response.status);
        console.log(`err request detailPlan complete detailPlanId=${variables}`);
      },
      onSuccess: (res, variables) => {
        console.log(`success request detailPlan complete undo detailPlanId=${variables}`);
        queryClient.invalidateQueries(['detailPlan', plan.plan_id]);
        queryClient.invalidateQueries(['myDetailPlan', plan.plan_id]);
      },
    },
  );

  const onPressSubmit = () => {
    if (modifyRequest === '') {
      Toast.show('계획을 입력해주세요.', { duration: Toast.durations.SHORT });
      return;
    }
    update();
    setModifyRequest('');
    setModifyPlanId(null);
  };

  if (detailPlans.length === 0) {
    if (plan.three_days_passed) return <InfoView message={'계획 세우기가 마감되었습니다...'} />;
    if (!isMyPlan) return <InfoView message={'아직 계획을 세우지 않았습니다...'} />;
  }

  return (
    <>
      {detailPlans.map((detailPlan, index) => (
        <MarginBottom key={detailPlan.detail_plan_id}>
          <Shadow distance={2} offset={[0, 2]} style={{ borderRadius: 10 }}>
            <DetailPlan
              onPress={() =>
                navigation.navigate('detail', {
                  detailPlan,
                  planId: plan.plan_id,
                  isMyPlan,
                  isEnd: fetchWeek < current_week,
                })
              }
            >
              <CheckBox
                disabled={!isMyPlan || fetchWeek < current_week}
                onPress={() =>
                  detailPlan.complete
                    ? completeUndoDetailPlan(detailPlan.detail_plan_id)
                    : completeDetailPlan(detailPlan.detail_plan_id)
                }
              >
                {detailPlan.complete && <Feather name={'check'} color={'#000000'} size={RFValue(20)} />}
              </CheckBox>
              {isModify && modifyPlanId === detailPlan.detail_plan_id ? (
                <ModifyInput
                  value={modifyRequest}
                  numberOfLines={1}
                  onSubmitEditing={onPressSubmit}
                  onChangeText={setModifyRequest}
                  placeholder="수정하기"
                />
              ) : (
                <Description numberOfLines={1}>{detailPlan.content}</Description>
              )}
              {fetchWeek >= current_week && !plan.three_days_passed ? (
                <DropDown
                  plan={plan}
                  detailPlanId={detailPlan.detail_plan_id}
                  onPressModify={onPressModify}
                  isMyPlan={isMyPlan}
                />
              ) : null}
            </DetailPlan>
          </Shadow>
        </MarginBottom>
      ))}
    </>
  );
}

const DetailPlan = styled.TouchableOpacity`
  width: ${wp(90)}px;
  height: ${hp(12)}px;
  padding: ${RFValue(24)}px;

  border-radius: 10px;
  background-color: #ffffff;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(12)}px;
  width: ${wp(30)}px;
  flex-grow: 1;
`;

const CheckBox = styled.TouchableOpacity`
  border-radius: 5px;
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  background-color: #e7e7e7;
`;

const ModifyInput = styled.TextInput`
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(12)}px;
  width: ${wp(30)}px;
  flex-grow: 1;
`;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export default PlanList;
