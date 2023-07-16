import ModalButton from '@components/common/btn/ModalButton';
import SmallInfoModal from '@components/common/modal/SmallInfoModal';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

StudyRoomCodeInfoModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomCodeInfoModal({ visible, close }) {
  return (
    <SmallInfoModal visible={visible} onRequestClose={close}>
      <View style={styles.container}>
        <Text style={styles.title}>초대하기</Text>
        <Text style={styles.codeNum}>코드번호: zy9xrx</Text>
        <View style={styles.info}>
          <Text style={{ color: '#979797', fontWeight: 600, fontSize: 16 }}>코드 번호를 초대하고 싶은</Text>
          <Text style={{ color: '#979797', fontWeight: 600, fontSize: 16 }}> 친구에게 전달해주세요.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ModalButton title={'닫기'} onPress={close} />
          <ModalButton title={'복사하기'} highlight />
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
  title: {
    color: '#33F',
    fontWeight: 700,
    fontSize: 16,
  },
  codeNum: {
    fontWeight: 600,
    fontSize: 24,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default StudyRoomCodeInfoModal;
