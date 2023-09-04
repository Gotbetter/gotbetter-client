import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import { useModal } from '@hooks/common';
import { createDetailPlan } from 'api/plan';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components/native';

PlanAddModal.propTypes = {
  plan: PropTypes.shape({
    plan_id: PropTypes.number.isRequired,
  }),
  week: PropTypes.number.isRequired,
};

// TODO 주차 넘어가면 추가 버튼 안나오게 하기

function PlanAddModal({ plan, week }) {
  const { modal, hideModal } = useModal('planAddModal');

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
      setRequest('');
      hideModal();
    },
  });

  const onPressHide = () => {
    setRequest('');
    hideModal();
  };

  return (
    <ListModal visible={modal.visible} onRequestClose={onPressHide}>
      <Container>
        <Title>{week}주차 계획 세우기</Title>
        <Input value={request} onChangeText={setRequest} placeholder={'계획을 입력해주세요...'} multiline={true} />
        <ModalButton title={'닫기'} width={wp(20)} height={hp(4)} color={'#979797'} onPress={onPressHide} />
        <ModalButton
          onPress={mutate}
          title={'추가'}
          width={wp(20)}
          height={hp(4)}
          color={'#979797'}
          highlight={request.length !== 0}
          disabled={request.length === 0}
        />
      </Container>
    </ListModal>
  );
}

const Container = styled.View`
  width: ${wp(60)}px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(12)}px;
`;

const Input = styled.TextInput`
  width: 100%;

  padding: ${RFValue(4)}px;
  margin-top: ${hp(1)}px;
  margin-bottom: ${hp(3)}px;

  border: 1px solid #979797;
  border-radius: ${RFValue(4)}px;

  font-size: ${RFValue(10)}px;
`;

export default PlanAddModal;
