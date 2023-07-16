import ModalButton from '@components/common/btn/ModalButton';
import ListModal from '@components/common/modal/ListModal';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

TotalParticipantModal.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      participant_id: PropTypes.number,
      user_id: PropTypes.number,
      auth_id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
      profile: PropTypes.string,
      authority: PropTypes.bool,
    }),
  ),
  visible: PropTypes.bool,
  close: PropTypes.func,
};

function TotalParticipantModal({ participants, visible, close }) {
  return (
    <ListModal visible={visible} onRequestClose={close}>
      <Text style={{ width: '100%', fontWeight: 700 }}>전체 참가자</Text>
      <View style={styles.listContainer}>
        {participants.map((participant) => (
          <TouchableOpacity key={participant.participant_id} style={styles.participant}>
            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#C4C4C4' }} />
            <Text style={{ fontSize: RFValue(10), fontWeight: 600 }} numberOfLines={1}>
              {participant.username}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: RFValue(16), alignSelf: 'center' }}>
        <ModalButton title={'닫기'} onPress={close} />
      </View>
    </ListModal>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: RFValue(12),
  },
  participant: {
    width: '33.3%',
    height: RFValue(80),

    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default TotalParticipantModal;
