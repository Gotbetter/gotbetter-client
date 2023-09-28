import AddPhoto from '@components/common/AddPhoto';
import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createDetailPlanRecord, deleteDetailPlanRecord, updateDetailPlanRecord } from 'api/plan';
import format from 'pretty-format';
import React, { useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { detailPlanRecordRequest } from 'recoil/plan/atoms';
import styled from 'styled-components/native';
function PlanRecordFormScreen() {
  const queryClient = useQueryClient();
  const { detailPlan, recordId } = useRoute().params;

  const [request, setRequest] = useRecoilState(detailPlanRecordRequest);
  const resetRequest = useResetRecoilState(detailPlanRecordRequest);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: recordId && (() => <FontAwesome name={'trash-o'} size={RFValue(20)} onPress={deleteRecord} />),
    });

    return () => resetRequest();
  }, [navigation, recordId, resetRequest, deleteRecord]);

  const { mutate: create } = useMutation((data) => createDetailPlanRecord(detailPlan.detail_plan_id, data), {
    onError: (err) => {
      console.log('에러 발생');
      console.log(format(err.response));
      console.log('[PlanRecordFormScreen] failed createDetailPlanrecord');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordFormScreen] success createDetailPlanrecord');
      navigation.goBack();
      queryClient.invalidateQueries(['planRecords', detailPlan.detail_plan_id]);
    },
  });
  const { mutate: update } = useMutation((data) => updateDetailPlanRecord(detailPlan.detail_plan_id, recordId, data), {
    onError: (err) => {
      console.log('에러 발생');
      console.log(format(err));
      console.log('[PlanRecordFormScreen] failed updateDetailPlanrecord');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordFormScreen] success updateDetailPlanrecord');
      navigation.goBack();
      queryClient.invalidateQueries(['planRecords', detailPlan.detail_plan_id]);
    },
  });
  const { mutate: deleteRecord } = useMutation((data) => deleteDetailPlanRecord(detailPlan.detail_plan_id, recordId), {
    onError: (err) => {
      console.log('에러 발생');
      console.log(format(err));
      console.log('[PlanRecordFormScreen] failed deleteDetailPlanrecord');
    },
    onSuccess: (res) => {
      console.log('[PlanRecordFormScreen] success deleteDetailPlanrecord');
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
    for (const key in request) {
      if (request[key] === null || request[key] === '') {
        Toast.show('모든 항목을 입력해 주세요.', { duration: Toast.durations.SHORT });
        return;
      }
    }

    const formData = new FormData();

    const filename = request.recordPhoto.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('record_title', request.recordTitle);
    formData.append('record_body', request.recordBody);
    formData.append('record_photo', { name: filename, type, uri: request.recordPhoto.uri });

    if (recordId) update(formData);
    else create(formData);
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
            placeholder="인증 내역을 요약할 수 있는 글을 적어주세요."
          />
        </InputGroup>
        <InputGroup>
          <Label>내용</Label>
          <TextLimit fulfiled={request.recordBody.length === 60}>{request.recordBody.length} / 60</TextLimit>
          <ContentInput
            value={request.recordBody}
            maxLength={60}
            multiline={true}
            onChangeText={(text) => onChange('recordBody', text)}
            placeholder="구체적으로 인증 내용을 작성해주세요."
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  width: ${wp(90)}px;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: ${RFValue(20)}px;
`;

const TextLimit = styled.Text`
  margin-left: ${wp(2)}px;

  color: ${({ fulfiled }) => (fulfiled ? 'red' : '#979797')};
  font-size: ${RFValue(16)}px;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  height: ${hp(7)}px;

  padding: ${RFValue(12)}px;
  margin-top: ${hp(4)}px;

  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

const ContentInput = styled.TextInput`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: ${hp(4)}px;

  padding: ${RFValue(12)}px;
`;

export default PlanRecordFormScreen;
