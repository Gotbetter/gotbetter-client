import InfoView from '@components/common/InfoView';
import PlanRecordActionButtonSelector from '@components/plan/PlanRecordActionButtonSelector';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchDetailPlanRecords } from 'api/plan';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

function PlanRecordScreen() {
  const { detailPlan, isMyPlan } = useRoute().params;
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [selectedImage, selectImage] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: detailPlan.content,
    });
  }, [detailPlan.content, navigation]);

  const onPressPreview = (url) => {
    setVisible(true);
    selectImage(url);
  };

  /**
   * 세부 계획읜 인증 리스트를 fetch 하는 query
   * @param detail_plan_id: 현재 선택한 세부 계획의 아이디
   */
  const {
    data: records,
    isLoading,
    isError,
  } = useQuery(['planRecords', detailPlan.detail_plan_id], () => fetchDetailPlanRecords(detailPlan.detail_plan_id), {
    staleTime: 500000,
    onError: (err) => {
      console.log(err);
      console.log('[PlanRecordScreen] error fetch DetailPlanRecords');
    },
    onSuccess: (data) => {
      console.log('[PlanRecordScreen] success fetch DetailPlanRecords');
    },
    select: (res) => res.data,
  });

  if (isError) {
    return <InfoView message={'에러 발생!'} />;
  }
  if (isLoading) {
    return <InfoView message={'로딩중...'} />;
  }

  if (!isMyPlan && records.length === 0) {
    return <InfoView message={'아직 인증글을 올리지 않았습니다...'} />;
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ padding: RFValue(12), flexGrow: 1, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {records.map((plan, index) => (
          <View key={index} style={{ marginBottom: RFValue(12) }}>
            <Shadow style={{ borderRadius: 10 }} distance={2} offset={[0, 2]}>
              <Plan>
                <Date>{plan.last_update_date}</Date>
                <PhotoContainer onPress={() => onPressPreview(plan.record_photo)}>
                  <Photo source={{ uri: `data:image/png;base64,${plan.record_photo}` }} resizeMode="contain" />
                </PhotoContainer>
                <InfoGroup>
                  <PlanLabel>{plan.record_title}</PlanLabel>
                  <PlanDescription>{plan.record_body}</PlanDescription>
                </InfoGroup>
              </Plan>
            </Shadow>
          </View>
        ))}
        <PlanRecordActionButtonSelector />
      </ScrollView>

      <ImageView
        images={[{ uri: `data:image/png;base64,${selectedImage}` }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
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

const PhotoContainer = styled.TouchableOpacity`
  width: ${wp(32)}px;
  height: ${wp(24)}px;
`;

const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

const InfoGroup = styled.View`
  width: 60%;
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

export default PlanRecordScreen;
