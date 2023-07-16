import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Shadow } from 'react-native-shadow-2';

StudyRoomInfoModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomInfoModal({ visible, close }) {
  return (
    <ListModal visible={visible} onRequestClose={close}>
      <View style={styles.container}>
        <Text style={styles.title}>방 정보</Text>
        <Shadow distance={1} offset={[0, 5]}>
          <View style={styles.infoContainer}>
            <View style={styles.infoGroup}>
              <Text style={styles.infoTitle}>방 이름</Text>
              <Text style={styles.info}>[홍익대학교 개발자 모임] 코딩 스터디</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoTitle}>방 코드</Text>
              <Text style={styles.info}>zy9xrx</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoTitle}>계좌 번호</Text>
              <Text style={styles.info}>국민 000000-00-000000</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoTitle}>시작 날짜</Text>
              <Text style={styles.info}>2023년 6월 29일</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoTitle}>최대 인원</Text>
              <Text style={styles.info}>10명</Text>
            </View>
            <View style={[styles.infoGroup, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoTitle}>현재 인원</Text>
              <Text style={styles.info}>9명</Text>
            </View>
          </View>
        </Shadow>
        <View style={{ alignSelf: 'center', marginTop: RFValue(24) }}>
          <ModalButton title={'닫기'} />
        </View>
      </View>
    </ListModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontWeight: 700,
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },

  infoContainer: {
    width: 280,
    borderRadius: 10,
    borderColor: '#F3F3F3',
    backgroundColor: '#ffffff',
    borderWidth: 1,
  },
  infoGroup: {
    justifyContent: 'space-around',
    height: RFValue(56),
    padding: RFValue(8),
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
  },
  infoTitle: {
    fontSize: RFValue(12),
    fontWeight: 600,
  },
  info: {
    color: '#5B5B5B',
    fontWeight: 600,
    fontSize: RFValue(10),
  },
});

export default StudyRoomInfoModal;
