import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';
import Feather from 'react-native-vector-icons/Feather';

function PlanList(props) {
  const navigation = useNavigation();
  const detailPlans = useMemo(
    () => [
      {
        detail_plan_id: 1,
        content: '[매일 인증] 토익 스터디',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 1,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        detail_plan_id: 2,
        content: '[매일 인증] 코딩 스터디',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 2,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        detail_plan_id: 3,
        content: '러닝하기',
        complete: true,
        approve_comment: '',
        rejected: false,
        plan_id: 3,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
    ],
    [],
  );

  return (
    <>
      {detailPlans.map((detailPlan) => (
        <Shadow key={detailPlan.detail_plan_id} distance={2} offset={[0, 2]}>
          <TouchableOpacity style={styles.detailPlan} onPress={() => navigation.navigate('detail')}>
            <View style={styles.checkbox}>
              <Feather name={'check'} color={'#000000'} size={RFValue(20)} />
            </View>
            <Text style={styles.content} numberOfLines={1}>
              {detailPlan.content}
            </Text>
          </TouchableOpacity>
        </Shadow>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  detailPlan: {
    width: wp(90),
    height: hp(12),
    padding: RFValue(24),
    marginBottom: RFValue(24),

    borderRadius: 10,
    backgroundColor: '#ffffff',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    fontSize: RFValue(14),
    marginLeft: RFValue(12),
    flexGrow: 1,
  },
  checkbox: {
    borderRadius: 5,
    backgroundColor: '#E7E7E7',
  },
});

export default PlanList;
