import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
function ThisWeekDetailPlans(props) {
  const detailPlans = useMemo(
    () => [
      {
        plan_id: 1,
        detail_plan_id: 1,
        content: '데이터베이스 중간고사',
        complete: true,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 2,
        detail_plan_id: 2,
        content: '컴웅통 중간고사',
        complete: false,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 3,
        detail_plan_id: 4,
        content: '컴응통 7과 풀고 제출',
        complete: true,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
      {
        plan_id: 4,
        detail_plan_id: 5,
        content: '아침에 계절 수강',
        complete: false,
        rejected: false,
        detail_plan_dislike_count: 1,
        detail_plan_dislike_checked: false,
      },
    ],
    [],
  );

  return (
    <View style={styles.myDetailPlanContainer}>
      <Text style={styles.title}>이번주 나의 계획</Text>
      <Text style={styles.leftDay}>D-4</Text>

      <View style={styles.detailPlanContainer}>
        {detailPlans.map((detailPlan) => (
          <DetailPlanItem key={detailPlan.detail_plan_id} detailPlan={detailPlan} />
        ))}
      </View>
    </View>
  );
}

const DetailPlanItem = ({ detailPlan }) => {
  const { content, complete } = detailPlan;

  return (
    <View style={styles.detailPlan}>
      <View style={styles.checkbox}>
        <Feather name={'check'} color={'#000000'} size={RFValue(20)} />
      </View>
      <Text style={{ marginLeft: RFValue(12), fontSize: RFValue(14) }} numberOfLines={1}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  myDetailPlanContainer: {
    width: '100%',

    padding: RFValue(10),
    backgroundColor: '#ffffff',

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 700,
  },
  leftDay: {
    color: '#979797',
    fontWeight: 600,
    marginLeft: RFValue(4),
  },

  detailPlanContainer: {
    marginTop: RFValue(12),
    width: '100%',
  },

  detailPlan: {
    paddingVertical: RFValue(12),
    flexDirection: 'row',
  },

  checkbox: {
    borderRadius: 5,
    backgroundColor: '#E7E7E7',
  },
});

export default ThisWeekDetailPlans;
