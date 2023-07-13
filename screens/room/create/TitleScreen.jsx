import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';

function TitleScreen(props) {
  const [requireFulfilled] = useState(true);

  const navigation = useNavigation();
  return (
    <RoomCreateFormTemplate title={'방 이름을 지어주세요'}>
      <TextInput style={styles.input} placeholder="방 이름을 지어주세요." />

      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => navigation.navigate('description')}
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
    height: hp(7),
    marginTop: hp(1),
    paddingLeft: RFValue(12),
    alignSelf: 'center',

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
  },
});

export default TitleScreen;
