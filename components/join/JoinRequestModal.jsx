import ModalButton from '@components/common/btn/ModalButton';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

JoinRequestModal.propTypes = {
  request: PropTypes.string,
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function JoinRequestModal({ request, visible, close }) {
  const [error] = [false];

  if (error) {
    return (
      <SmallInfoModal visible={visible} onRequestClose={close}>
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
          <Text style={{ width: '100%', fontSize: RFValue(18), fontWeight: 600, textAlign: 'center' }}>
            초대요청 실패
          </Text>
          <Text style={{ width: '100%', color: '#979797', textAlign: 'center' }}>요청이 실패하였습니다.{'\n'}</Text>
          <ModalButton title={'닫기'} onPress={close} />
        </View>
      </SmallInfoModal>
    );
  }

  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
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
          초대요청 완료
        </Text>
        <Text style={{ width: '100%', color: '#979797', textAlign: 'center' }}>
          요청이 완료되었습니다.{'\n'}초대 승인까지 잠시 기다려주세요!
        </Text>
        <ModalButton title={'닫기'} onPress={close} />
      </View>
    </SmallInfoModal>
  );
}

export default JoinRequestModal;
