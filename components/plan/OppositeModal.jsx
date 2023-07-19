import ModalButton from '@components/common/btn/ModalButton';
import OppositeIcon from '@components/common/icon/OppositeIcon';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

OppositeModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function OppositeModal({ visible, close }) {
  visible = false;

  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
      <View style={styles.container}>
        <OppositeIcon color={'#3333FF'} />
        <Text style={styles.codeNum}>반대를 누르시겠습니까?</Text>
        <View style={styles.info}>
          <Text style={styles.subInfo}>반대를 누른 뒤에 취소할 수 없습니다.</Text>
          <Text style={styles.subInfo}>신중하게 선택해주세요!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ModalButton title={'반대'} highlight />
          <ModalButton title={'닫기'} onPress={close} />
        </View>
      </View>
    </SmallInfoModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  codeNum: {
    fontWeight: 600,
    fontSize: RFValue(20),
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subInfo: {
    color: '#979797',
    fontWeight: 600,
    fontSize: RFValue(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default OppositeModal;
