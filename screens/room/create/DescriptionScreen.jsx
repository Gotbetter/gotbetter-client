import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';

function DescriptionScreen(props) {
  const [text, setText] = useState('');
  const [requireFulfilled] = useState(true);

  const navigation = useNavigation();

  return (
    <RoomCreateFormTemplate title={'방 소개를 작성해주세요'} buttonActivate={true} nextScreen={'numeric-info'}>
      <Text style={styles.length}>글자수 제한 {text.length}/60</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        maxLength={60}
        multiline={true}
        placeholder="어떤 활동을 할지 간단하게 소개해주세요."
      />
      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => navigation.navigate('numeric-info')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </View>
    </RoomCreateFormTemplate>
  );
}

const styles = StyleSheet.create({
  input: {
    width: wp(90),
    height: hp(20),
    marginTop: hp(1),
    padding: RFValue(12),

    alignSelf: 'center',
    textAlignVertical: 'top',

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
  },
  length: {
    paddingLeft: RFValue(20),
    color: '#979797',
  },
});

export default DescriptionScreen;
