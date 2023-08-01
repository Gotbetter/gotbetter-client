import AddPhoto from '@components/common/AddPhoto';
import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createDetailPlanRecord } from 'api/plan';
import format from 'pretty-format';
import React, { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { detailPlanRecordRequest } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

function PlanRecordFormScreen() {
  const queryClient = useQueryClient();
  const { detailPlan } = useRoute().params;

  const [request, setRequest] = useRecoilState(detailPlanRecordRequest);
  const resetRequest = useResetRecoilState(detailPlanRecordRequest);
  const navigation = useNavigation();

  useEffect(() => {
    return () => resetRequest();
  }, [resetRequest]);

  const { mutate } = useMutation((data) => createDetailPlanRecord(detailPlan.detail_plan_id, data), {
    onError: (err) => {
      console.log('에러 발생');
      console.log(format(err.response));
      console.log('[PlanRecordFormScreen] failed createDetailPlanrecord');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordFormScreen] success createDetailPlanrecord');
      console.log(format(res.data));
      navigation.goBack();
      queryClient.invalidateQueries(['planRecords', detailPlan.detail_plan_id]);
    },
  });

  const onChange = (name, value) => {
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onPressComplete = () => {
    const formData = new FormData();

    const filename = request.recordPhoto.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('record_title', request.recordTitle);
    formData.append('record_body', request.recordBody);
    formData.append('record_photo', { name: filename, type, uri: request.recordPhoto.uri });
    mutate(formData);
  };

  return (
    <Form>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'space-around' }}
        showsVerticalScrollIndicator={false}
      >
        <AddPhoto />
        <InputGroup>
          <Label>제목</Label>
          <TitleInput
            value={request.recordTitle}
            onChangeText={(text) => onChange('recordTitle', text)}
            placeholder="계획 제목을 작성해주세요."
          />
        </InputGroup>
        <InputGroup>
          <Label>내용</Label>
          <ContentInput
            value={request.recordBody}
            maxLength={60}
            multiline={true}
            onChangeText={(text) => onChange('recordBody', text)}
            placeholder="구체적으로 계획 내용을 작성해주세요."
          />
        </InputGroup>
        <ActionButton
          title={'계획 완료'}
          width={wp(90)}
          height={hp(8)}
          color={'#33F'}
          round={true}
          onPress={onPressComplete}
        />
      </KeyboardAwareScrollView>
    </Form>
  );
}

const Form = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const InputGroup = styled.View`
  width: ${wp(90)}px;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: ${RFValue(20)}px;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  height: ${RFValue(56)}px;

  padding: ${RFValue(12)}px;
  margin-top: ${RFValue(12)}px;

  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

const ContentInput = styled.TextInput`
  width: ${wp(90)}px;
  height: ${RFValue(140)}px;

  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;

  margin-top: ${RFValue(12)}px;
  text-align-vertical: top;

  padding: ${RFValue(12)}px;
`;

export default PlanRecordFormScreen;
