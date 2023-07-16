import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Description(props) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.title}>소개</Text>
      <Text style={styles.description}>
        홍익대학교 개발자 모임입니다. 💻 누구나 참여할 수 있습니다. 참여비 15000원 입금 후 참여 가능합니다. 주 1회
        비대면 스터디
      </Text>
      <View style={styles.subInfoGroup}>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>{4}주</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>코딩</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>90,000원</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    width: '100%',
    marginTop: RFValue(2),
    minHeight: hp(20),
    padding: RFValue(10),

    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 700,
  },
  description: {
    marginVertical: RFValue(12),
  },
  subInfoGroup: {
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',

    marginRight: 'auto',
  },
  subInfo: {
    padding: RFValue(4),
    borderRadius: 4,
    backgroundColor: '#F2F3F5',
  },
});

export default Description;
