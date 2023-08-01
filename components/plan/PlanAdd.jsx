import AddButtonIcon from '@components/common/icon/AddButtonIcon';
import { createDetailPlan } from 'api/plan';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import { Shadow } from 'react-native-shadow-2';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { planAddModeState, planFetchParamsState } from 'recoil/plan/atoms';
import { studyRoomDetail } from 'recoil/room/atoms';
import styled from 'styled-components/native';

PlanAdd.propTypes = {
  plan: PropTypes.shape({ plan_id: PropTypes.number, three_days_passed: PropTypes.bool }),
  detailPlans: PropTypes.arrayOf(PropTypes.object),
  isMyPlan: PropTypes.bool,
};

function PlanAdd({ plan, isMyPlan }) {
  const { week } = useRecoilValue(planFetchParamsState);
  const studyRoom = useRecoilValue(studyRoomDetail);

  const [addFormMode, setAddFormMode] = useRecoilState(planAddModeState);
  const queryClient = useQueryClient();

  const [request, setRequest] = useState('');

  const { mutate } = useMutation(() => createDetailPlan(plan.plan_id, request), {
    onError: (err) => {
      console.log(err.response.status);
      console.log('[PlanAdd] failed create detailPlan');
    },
    onSuccess: (res) => {
      console.log('[PlanAdd] success create detailPlan');
      queryClient.invalidateQueries(['detailPlan', plan.plan_id]);
      queryClient.invalidateQueries(['myDetailPlan', plan.plan_id]);
    },
  });

  const onPressAddIcon = () => setAddFormMode(true);

  const onPressEnter = () => {
    if (request === '') {
      Toast.show('계획을 입력해주세요.', { duration: Toast.durations.SHORT });
      return;
    }
    mutate();
    setRequest('');
    setAddFormMode(false);
  };

  const onTouchOutside = () => {
    Keyboard.dismiss();
    setAddFormMode(false);
  };

  if (week < studyRoom.current_week || !isMyPlan || plan.three_days_passed) {
    return null;
  }

  return addFormMode ? (
    <PlanForm request={request} onPress={onPressEnter} onChange={setRequest} onTouchOutside={onTouchOutside} />
  ) : (
    <AddButtonIcon onPress={onPressAddIcon} />
  );
}

PlanForm.propTypes = {
  request: PropTypes.string,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
};

function PlanForm({ request, onPress, onChange }) {
  return (
    <MarginBottom>
      <Shadow distance={2} offset={[0, 2]} style={{ borderRadius: 10 }}>
        <DetailPlan>
          <CheckBox />
          <DescriptionInput
            value={request}
            onChangeText={onChange}
            onSubmitEditing={onPress}
            numberOfLines={1}
            placeholder="입력하기"
          ></DescriptionInput>
          <EllipsisButton>
            <AntDesign name={'ellipsis1'} color={'#C4C4C4'} size={RFValue(24)} />
          </EllipsisButton>
        </DetailPlan>
      </Shadow>
    </MarginBottom>
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

const DescriptionInput = styled.TextInput`
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

const EllipsisButton = styled.TouchableOpacity``;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;
export default PlanAdd;
