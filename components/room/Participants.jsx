import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import StudyRoomInviteModal from './modal/StudyRoomInviteModal';
import TotalParticipantModal from './modal/TotalParticipantModal';

function Participants() {
  const navigation = useNavigation();
  const [totalParticipantModal, setTotalParticipantsModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [process] = useState(true);
  const participants = useMemo(
    () => [
      {
        participant_id: 63,
        user_id: 42,
        auth_id: 39,
        username: '갓배러12',
        email: 'daza@zubudo.dm',
        profile: 'test',
        authority: false,
      },
      {
        participant_id: 45,
        user_id: 42,
        auth_id: 39,
        username: 'Maud Ferguson',
        email: 'daza@zubudo.dm',
        profile: 'test',
        authority: false,
      },
    ],
    [],
  );

  return (
    <View style={styles.participationsContainer}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>참가자</Text>
        <TouchableOpacity onPress={() => setInviteModalVisible(true)}>
          <Text style={styles.inviteRequest}>&#183; 초대 요청(3명)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {participants.slice(0, 6).map((participant) => (
          <TouchableOpacity
            key={participant.participant_id}
            style={styles.participant}
            onPress={() => navigation.navigate('plan')}
          >
            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#C4C4C4' }} />
            <Text style={{ fontSize: RFValue(10), fontWeight: 600 }} numberOfLines={1}>
              {participant.username}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: RFValue(12) }}>
        <TouchableOpacity
          onPress={() => (process ? navigation.navigate('rank') : setTotalParticipantsModalVisible(true))}
          style={{
            alignSelf: 'center',
            width: wp(90),
            height: hp(6),
            borderColor: '#CACACA',
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {process ? (
            <Text style={{ fontWeight: 700, color: '#979797' }}>전체 참가자 & 랭킹 보기</Text>
          ) : (
            <Text style={{ fontWeight: 700, color: '#979797' }}>전체 참가자 보기</Text>
          )}
        </TouchableOpacity>
      </View>

      <TotalParticipantModal
        participants={participants}
        visible={totalParticipantModal}
        close={() => setTotalParticipantsModalVisible(false)}
      />

      {/* 초대하기 모달 */}
      <StudyRoomInviteModal visible={inviteModalVisible} close={() => setInviteModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  participationsContainer: {
    width: '100%',
    minHeight: hp(22),

    padding: RFValue(10),
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 700,
  },
  inviteRequest: {
    color: '#3333FF',
    fontSize: 12,
    fontWeight: 600,
  },
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

export default Participants;
