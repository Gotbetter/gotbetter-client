import ActionButton from '@components/common/btn/ActionButton';
import ModalButton from '@components/common/btn/ModalButton';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';
import { useNavigation } from '@react-navigation/native';

function AccountScreen(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [requireFulfilled] = useState(false);

  const onClose = () => {
    setVisible(false);
    navigation.navigate('home');
  };

  return (
    <RoomCreateFormTemplate title={'계좌 번호 입력하기'}>
      <TextInput style={styles.input} placeholder="계좌 번호를 입력해주세요.." />
      <Text style={styles.example}>ex) 국민 000000-00-00000</Text>
      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => setVisible(true)}
          title={requireFulfilled ? '완료' : '계좌 번호 입력하기'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </View>
      <SmallInfoModal visible={visible} onRequestClose={() => setVisible(false)}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-around',
            justifyContent: 'space-around',
          }}
        >
          <Image source={require('@assets/confirm.png')} resizeMode="contain" style={{ width: '100%' }} />
          <Text style={{ width: '100%', fontSize: RFValue(18), fontWeight: 600, textAlign: 'center' }}>
            방 만들기 완료
          </Text>
          <Text style={{ width: '100%', color: '#979797', textAlign: 'center' }}>방 만들기가 완료되었습니다.</Text>
          <ModalButton title={'닫기'} onPress={onClose} />
          <ModalButton title={'바로가기'} highlight />
        </View>
      </SmallInfoModal>
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
  example: {
    width: wp(90),
    alignSelf: 'center',
    marginTop: RFValue(4),
    paddingLeft: RFValue(4),

    fontSize: RFValue(10),
    color: '#979797',
  },
});
export default AccountScreen;
