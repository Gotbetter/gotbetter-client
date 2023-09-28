import AddButtonIcon from '@components/common/icon/AddButtonIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

function PlanRecordAdd(props) {
  const navigation = useNavigation();
  const { detailPlan } = useRoute().params;

  return (
    <ButtonContainer onPress={() => navigation.navigate('confirm', { detailPlan, isUpdate: false })}>
      <AddButtonIcon />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity`
  height: 10%;
  justify-content: center;
  align-items: center;
`;
export default PlanRecordAdd;
