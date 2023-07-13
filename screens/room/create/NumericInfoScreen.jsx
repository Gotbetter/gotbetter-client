import ActionButton from '@components/common/btn/ActionButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';

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
    let items = [];
    for (let i = 1; i <= ENTRY_FEE_NUM; i++) {
      items.push({ label: (i * 5000).toLocaleString('ko-KR') + '원', value: i * 5000, key: i });
    }
    return items;
  }, []);
  /** 주차 리스트 **/
  const weekList = useMemo(() => {
    const MAX_WEEK_COUNT = 48;
    let items = [];
    for (let i = 1; i <= MAX_WEEK_COUNT; i++) {
      items.push({ label: i + '주', value: i, key: i });
    }
    return items;
  }, []);

  return (
    <RoomCreateFormTemplate title={'인원 선택'} nextScreen={'rule'}>
      <Text style={{ width: wp(90), color: '#A3A3A3', alignSelf: 'center' }}>인원 제한</Text>
      <View style={styles.fullSizePicker}>
        <Picker dropdownIconColor={'#ffffff'} style={{ marginLeft: -16 }}>
          {peopleLimeits.map((count) => (
            <Picker.Item key={count} label={`${count}명`} value={count} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>일정 선택</Text>
      <View style={styles.pickerGroup}>
        <Text style={styles.pickerGroupTitle}>시작일</Text>
        <Text style={styles.pickerGroupTitle}>진행주차</Text>
        <TouchableOpacity
          style={[styles.halfSizePicker, { justifyContent: 'center' }]}
          onPress={() => setDateSelect(true)}
        >
          <Text>{date}</Text>
        </TouchableOpacity>
        <View style={styles.halfSizePicker}>
          <Picker dropdownIconColor={'#ffffff'} style={{ marginLeft: -16 }}>
            {weekList.map((week) => (
              <Picker.Item key={week.key} label={week.label} value={week.value} />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={styles.title}>금액 선택</Text>
      <View style={styles.fullSizePicker}>
        <Picker dropdownIconColor={'#ffffff'} style={{ marginLeft: -16 }}>
          {entryFeeList.map((entryFee) => (
            <Picker.Item key={entryFee} label={entryFee.label} value={entryFee.value} />
          ))}
        </Picker>
      </View>

      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => navigation.navigate('rule')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </View>

      {dateSelect && <RNDateTimePicker mode="date" value={new Date()} onChange={onChange} />}
    </RoomCreateFormTemplate>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: hp(3),
    padding: RFValue(12),
    fontSize: RFValue(18),
    fontWeight: 600,
  },
  pickerGroupTitle: {
    color: '#A3A3A3',
    fontWeight: 600,
    width: '50%',
  },
  fullSizePicker: {
    alignSelf: 'center',
    width: wp(90),
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  halfSizePicker: {
    width: '50%',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  pickerGroup: {
    width: wp(90),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default NumericInfoScreen;
