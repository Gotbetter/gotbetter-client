import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';
import RoomCreateForm from './RoomCreateForm';

function RuleScreen(props) {
  const [selected, select] = useState(0);
  const [requireFulfilled] = useState(true);
  const navigation = useNavigation();

  const rules = useMemo(
    () => [
      {
        rule_code: 'R1',
        rule_description: '👑 1등 몰빵',
        rule_attribute1: '1등한테 200% 몰빵! 기본 규칙 선택하기',
        rule_attribute2: '👑 1등 200% 환급\n\n2등 ~ 5등 100% 환급\n\n😥 꼴등 0% 환급',
      },
      {
        rule_code: 'R2',
        rule_description: '👥 공평하게',
      },
      {
        rule_code: 'R3',
        rule_description: '규칙 만들기',
      },
    ],
    [],
  );

  return (
    <RoomCreateForm>
      <Label>방 규칙</Label>
      <RuleList>
        {rules.map((rule) => (
          <Rule key={rule.rule_code}>
            <RuleLabel>{rule.rule_description}</RuleLabel>
            <RadioButton
              value={rule.rule_code}
              status={selected === rule.rule_code ? 'checked' : 'unchecked'}
              onPress={() => select(rule.rule_code)}
            />
          </Rule>
        ))}
      </RuleList>
      <MarginTop>
        <Shadow style={{ borderRadius: 18 }} distance={1} offset={[0, 5]}>
          <RuleDescriptionContainer>
            <RuleTitle>{rules[0].rule_description}</RuleTitle>
            <RuleDescription>{rules[0].rule_attribute1}</RuleDescription>
            <RuleContents>{rules[0].rule_attribute2}</RuleContents>
          </RuleDescriptionContainer>
        </Shadow>
      </MarginTop>
      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('account')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const RuleLabel = styled.Text``;

const RuleList = styled.View`
  width: ${wp(95)}px;
  margin-top: ${RFValue(8)}px;

  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

const Rule = styled.View`
  flex-direction: row;
  align-items: center;

  padding-left: ${RFValue(2)}px;
  padding-right: ${RFValue(2)}px;

  border-width: 1px;
  border-radius: 25px;
  border-color: #e4e4e4;
`;

const RuleDescriptionContainer = styled.View`
  width: ${wp(90)}px;
  height: ${hp(30)}px;

  background-color: #ffffff;
  border-radius: 18px;

  justify-content: space-around;
  align-items: center;
  padding: ${RFValue(12)}px;
`;

const MarginTop = styled.View`
  align-self: center;
  margin-top: ${hp(10)}px;
`;

const RuleTitle = styled.Text`
  font-weight: 600;
`;

const RuleDescription = styled.Text`
  color: #959595;
`;

const RuleContents = styled.Text`
  width: 80%;
  height: 60%;
  font-weight: 600;
  background-color: #f6f6f6;
  text-align: center;
  text-align-vertical: center;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;

export default RuleScreen;
