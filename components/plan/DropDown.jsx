import { deleteDetailPlan } from 'api/plan';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

DropDown.propTypes = {
  plan: PropTypes.shape({ plan_id: PropTypes.number }),
  detailPlanId: PropTypes.number,
  onPressModify: PropTypes.func,
  isMyPlan: PropTypes.bool,
};

function DropDown({ plan, detailPlanId, onPressModify, isMyPlan }) {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);

  const { mutate } = useMutation(() => deleteDetailPlan(plan.plan_id, detailPlanId), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['detailPlan', plan.plan_id]);
      queryClient.invalidateQueries(['myDetailPlan', plan.plan_id]);
    },
  });

  const onPressDelete = () => {
    mutate();
    setVisible(false);
  };

  if (!isMyPlan) return null;

  return (
    <EllipsisButton onPress={() => setVisible(!visible)}>
      <AntDesign name={'ellipsis1'} color={'#C4C4C4'} size={RFValue(24)} />
      {visible && (
        <DropDownView>
          <DropDownEdit
            onPress={() => {
              onPressModify(detailPlanId);
              setVisible(false);
            }}
          >
            <DropDownText>글 수정</DropDownText>
          </DropDownEdit>
          <DropDownDelete onPress={onPressDelete}>
            <DropDownText>글 삭제</DropDownText>
          </DropDownDelete>
        </DropDownView>
      )}
    </EllipsisButton>
  );
}

const DropDownView = styled.View`
  position: absolute;
  margin-top: 20px;
  right: 30px;
  top: -30px;
  width: 100px;
  height: 90px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #ffffff;
`;

const DropDownEdit = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom-width: 0.3px;
  border-color: #000000;
`;
const DropDownDelete = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-width: 0.3px;
  border-color: #000000;
`;

const DropDownText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #000000;
`;
const EllipsisButton = styled.TouchableOpacity``;

export default DropDown;
