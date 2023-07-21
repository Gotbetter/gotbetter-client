import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

function PlanList(props) {
  const navigation = useNavigation();
  const detailPlans = useMemo(
    () => [
      {
        detail_plan_id: 1,
        content: '[매일 인증] 토익 스터디',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 1,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        detail_plan_id: 2,
        content: '[매일 인증] 코딩 스터디',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 2,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        detail_plan_id: 3,
        content: '러닝하기',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 3,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
    ],
    [],
  );

  return (
    <>
      {detailPlans.map((detailPlan) => (
        <MarginBottom key={detailPlan.detail_plan_id}>
          <Shadow distance={2} offset={[0, 2]} style={{ borderRadius: 10 }}>
            <DetailPlan onPress={() => navigation.navigate('detail')}>
              <CheckBox>
                <Feather name={'check'} color={'#000000'} size={RFValue(20)} />
              </CheckBox>
              <Description numberOfLines={1}>{detailPlan.content}</Description>
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
  flex-grow: 1;
`;

const CheckBox = styled.View`
  border-radius: 5px;
  background-color: #e7e7e7;
`;

const MarginBottom = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export default PlanList;
