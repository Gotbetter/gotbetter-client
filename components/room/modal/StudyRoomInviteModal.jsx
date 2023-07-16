import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';

StudyRoomInviteModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function StudyRoomInviteModal({ visible, close }) {
  const waitParticipants = useMemo(
    () => [
      {
        participant_id: 1,
        user_id: 1,
        profile: '',
        username: '갓배러1',
      },
      {
        participant_id: 2,
        user_id: 2,
        profile: '',
        username: '갓배러2',
      },
      {
        participant_id: 3,
        user_id: 3,
        profile: '',
        username: '갓배러3',
      },
    ],
    [],
  );

  return (
    <ListModal visible={visible} onRequestClose={close}>
      <View style={styles.container}>
        <Text style={styles.title}>초대하기</Text>
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            {waitParticipants.map((participant) => (
              <Shadow
                key={participant.participant_id}
                distance={1}
                offset={[0, 2]}
                style={{ marginBottom: RFValue(12) }}
              >
                <View style={styles.waitParticipant}>
                  <View style={{ width: 50, height: 50, backgroundColor: '#C4C4C4', borderRadius: 50 }}>
                    {participant.profile}
                  </View>
                  <Text style={styles.username}>{participant.username}</Text>
                  <View style={{ height: '100%', justifyContent: 'space-around' }}>
                    <ModalButton title={'수락'} width={wp(18)} height={RFValue(24)} highlight />
                    <ModalButton title={'거절'} width={wp(18)} height={RFValue(24)} />
                  </View>
                </View>
              </Shadow>
            ))}
          </ScrollView>
        </View>
        <View style={{ marginTop: RFValue(24) }}>
          <ModalButton title={'닫기'} onPress={close} />
        </View>
      </View>
    </ListModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 700,
    fontSize: RFValue(16),
    marginBottom: RFValue(20),
  },
  scrollViewContainer: {
    height: hp(50),
  },
  waitParticipant: {
    width: wp(76),
    height: hp(12),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: RFValue(12),
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 600,
    fontSize: 16,
    width: '40%',
  },
});

export default StudyRoomInviteModal;
