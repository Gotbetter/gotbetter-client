import AddButton from '@components/common/btn/AddButton';
import OppositeButton from '@components/plan/OppositeButton';
import OppositeModal from '@components/plan/OppositeModal';
import WeekList from '@components/plan/WeekList';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import PlanList from '../../components/plan/PlanList';

function PlanScreen(props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'abc10402의 계획' });
  }, [navigation]);

  return (
    <Container>
      <WeekList />

      <ContentContainer>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <PlanList />

          <AddButton />
        </ScrollView>
      </ContentContainer>
      <ButtonContainer>
        <OppositeButton />
      </ButtonContainer>

      <OppositeModal />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const ContentContainer = styled.View`
  width: 100%;
  height: 64%;

  align-items: center;

  padding-vertical: ${RFValue(24)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  height: 24%;

  justify-content: center;
  align-items: center;
`;

export default PlanScreen;
