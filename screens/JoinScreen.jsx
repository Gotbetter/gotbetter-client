import ActionButton from '@components/common/btn/ActionButton';
import JoinRequestModal from '@components/join/JoinRequestModal';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

function JoinScreen() {
  const [requireFulfilled] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>참여코드를 입력해주세요</Text>
      <TextInput style={styles.input} placeholder="참여코드를 입력해주세요." />
      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => requireFulfilled && setVisible(true)}
          title={'참여하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </View>

      <JoinRequestModal request="" visible={visible} close={() => setVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: hp(3),
    padding: RFValue(12),
    fontSize: RFValue(18),
    fontWeight: 600,
  },
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

export default JoinScreen;
