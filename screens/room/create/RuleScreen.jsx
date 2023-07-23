import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { fetchStudyRoomRuleList } from 'api/room';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { studyRoomCreateRequest } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function RuleScreen(props) {
  const [selected, select] = useState(null);
  const [requireFulfilled, setRequireFulfilled] = useState(false);

  const [request, setRequest] = useRecoilState(studyRoomCreateRequest);
  const navigation = useNavigation();

  useEffect(() => {
    setRequireFulfilled(request.rule_code !== '');
  }, [request.rule_code]);

  const { isLoading, isError, data } = useQuery('studyRoomRules', fetchStudyRoomRuleList, {
    retry: 1,
    staleTime: 500000,
    select: (res) => res.data,
  });

  const selectRule = (index, rule_code) => {
    select(index);
    setRequest((prev) => ({ ...prev, rule_code }));
  };

  if (isLoading)
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );

  if (isError) {
    return (
      <View>
        <Text>서버 에러 발생</Text>
      </View>
    );
  }
  return (
    <RoomCreateForm>
      <Label>방 규칙</Label>
      <RuleList>
        {data.map((rule, index) => (
          <Rule key={rule.rule_code}>
            <RuleLabel>{rule.rule_description}</RuleLabel>
            <RadioButton
              value={index}
              status={selected === index ? 'checked' : 'unchecked'}
              onPress={() => selectRule(index, rule.rule_code)}
              disabled={index !== 0}
            />
          </Rule>
        ))}
        <Rule>
          <RuleLabel> 규칙 만들기</RuleLabel>
          <RadioButton disabled />
        </Rule>
      </RuleList>
      {selected != null ? (
        <MarginTop>
          <Shadow style={{ borderRadius: 18 }} distance={1} offset={[0, 5]}>
            <RuleDescriptionContainer>
              <RuleTitle>{data[selected].rule_description}</RuleTitle>
              <RuleDescription>{data[selected].rule_attribute1}</RuleDescription>
              <RuleContents>{data[selected].rule_attribute2}</RuleContents>
            </RuleDescriptionContainer>
          </Shadow>
        </MarginTop>
      ) : null}
      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('account')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
          disabled={!requireFulfilled}
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
