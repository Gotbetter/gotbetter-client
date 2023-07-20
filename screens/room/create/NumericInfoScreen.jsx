import ActionButton from '@components/common/btn/ActionButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function NumericInfoScreen(props) {
  const [dateSelect, setDateSelect] = useState(false);
  const [date, setDate] = useState('');
  const [requireFulfilled] = useState(true);

  const navigation = useNavigation();
  const onChange = (e, date) => {
    const { type } = e;

    switch (type) {
      case 'set':
        setDate(
          `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + date.getDate()).slice(-2)}`,
        );
        setDateSelect(false);
        break;
      case 'dismissed':
        setDateSelect(false);
        break;
    }
  };

  const peopleLimeits = useMemo(() => [1, 2, 3, 4, 5, 6], []);

  /** 참가비 리스트 **/
  const entryFeeList = useMemo(() => {
    const ENTRY_FEE_NUM = 20;
    const items = [];
    for (let i = 1; i <= ENTRY_FEE_NUM; i++) {
      items.push({ label: (i * 5000).toLocaleString('ko-KR') + '원', value: i * 5000, key: i });
    }
    return items;
  }, []);
  /** 주차 리스트 **/
  const weekList = useMemo(() => {
    const MAX_WEEK_COUNT = 47;
    const items = [];
    for (let i = 1; i <= MAX_WEEK_COUNT; i++) {
      items.push({ label: i + '주', value: i, key: i });
    }
    return items;
  }, []);

  return (
    <RoomCreateForm title={'인원 선택'} nextScreen={'rule'}>
      <Label>인원 선택</Label>
      <SubLabel>인원 제한</SubLabel>
      <FullSizePicker dropdownIconColor={'#ffffff'}>
        {peopleLimeits.map((count) => (
          <Picker.Item key={count} label={`${count}명`} value={count} />
        ))}
      </FullSizePicker>

      <Label>일정 선택</Label>
      <PickerGroup>
        <PickerLabel>시작일</PickerLabel>
        <PickerLabel>진행주차</PickerLabel>
        <DatePicker onPress={() => setDateSelect(true)}>
          <Text>{date}</Text>
        </DatePicker>
        <HalfSizePicker dropdownIconColor={'#ffffff'}>
          {weekList.map((week) => (
            <Picker.Item key={week.key} label={week.label} value={week.value} />
          ))}
        </HalfSizePicker>
      </PickerGroup>
      <Label>금액 선택</Label>
      <FullSizePicker dropdownIconColor={'#ffffff'}>
        {entryFeeList.map((entryFee) => (
          <Picker.Item key={entryFee} label={entryFee.label} value={entryFee.value} />
        ))}
      </FullSizePicker>

      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('rule')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>

      {dateSelect && <RNDateTimePicker mode="date" value={new Date()} onChange={onChange} />}
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const SubLabel = styled.Text`
  width: ${wp(90)}px;
  color: #a3a3a3;
  align-self: center;
`;

const PickerGroup = styled.View`
  width: ${wp(90)}px;

  flex-wrap: wrap;
  flex-direction: row;
  align-self: center;
`;

const PickerLabel = styled.Text`
  width: 50%;
  color: #a3a3a3;
  font-weight: 600;
`;

const FullSizePicker = styled(Picker)`
  width: ${wp(90)}px;

  margin-left: -16px;

  align-self: center;

  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
`;

const HalfSizePicker = styled(Picker)`
  width: 50%;
  margin-left: -16px;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
`;

const DatePicker = styled.TouchableOpacity`
  width: 50%;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;

export default NumericInfoScreen;
