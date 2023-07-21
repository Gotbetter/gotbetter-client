import AddButton from '@components/common/btn/AddButton';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

function PlanDetailScreen(props) {
  const navigation = useNavigation();
  const plans = useMemo(
    () => [
      {
        title: '영어 단어 300개 외우기',
        content: '단어책 20페이지까지 외우기',
      },
      {
        title: '토익 LC 3회차 풀기',
        content: 'LC 3회차까지 풀고 오답노트 하기',
      },
      {
        title: '토익 LC 3회차 풀기',
        content: 'LC 3회차까지 풀고 오답노트 하기',
      },
    ],
    [],
  );

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: RFValue(12), flexGrow: 1, alignItems: 'center' }}>
        {plans.map((plan, index) => (
          <View key={index} style={{ marginBottom: RFValue(12) }}>
            <Shadow style={{ borderRadius: 10 }} distance={2} offset={[0, 2]}>
              <Plan>
                <Date>06/18</Date>
                <Photo source={require('@assets/study-img.png')} resizeMode="contain" />
                <InfoGroup>
                  <PlanLabel>{plan.title}</PlanLabel>
                  <PlanDescription>{plan.content}</PlanDescription>
                </InfoGroup>
              </Plan>
            </Shadow>
          </View>
        ))}
        <ButtonContainer onPress={() => navigation.navigate('confirm')}>
          <AddButton />
        </ButtonContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  background-color: #ffffff;
  height: 100%;
`;

const Plan = styled.View`
  width: ${wp(90)}px;
  min-height: ${hp(7)}px;

  background-color: #ffffff;
  border-radius: 10px;
  padding: ${RFValue(12)}px;

  flex-wrap: wrap;
  flex-direction: row;
  align-content: space-between;
`;

const Photo = styled.Image`
  width: 30%;
`;

const InfoGroup = styled.View`
  width: 70%;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;

  padding: ${RFValue(12)}px;
`;

const Date = styled.Text`
  width: 100%;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  text-align: right;
`;

const PlanLabel = styled.Text`
  width: 100%;
  font-size: ${RFValue(14)}px;
  font-weight: 600;
`;

const PlanDescription = styled.Text`
  width: 100%;
  height: 80%;
  font-weight: 600;
  font-size: ${RFValue(10)}px;
  padding-vertical: ${RFValue(8)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-top: ${RFValue(24)}px;
`;

export default PlanDetailScreen;
