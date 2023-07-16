import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

function StudyRoomRank(props) {
  const items = useMemo(
    () => [
      {
        username: '갓배터1',
        rank: 1,
        refund: 30000,
      },
      {
        username: '갓배터2',
        rank: 2,
        refund: 20000,
      },
      {
        username: '갓배터3',
        rank: 3,
        refund: 50000,
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>랭킹</Text>
        <Text style={styles.date}>2023년 6월 29일 기준</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          {items.map((item) => (
            <View key={item.rank} style={styles.item}>
              <Text style={styles.rank}>{item.rank}</Text>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#C4C4C4' }} />
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.refund}>{item.refund.toLocaleString('ko-KR')}원</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: RFValue(18),
  },

  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    marginRight: RFValue(12),
  },
  date: {
    fontSize: 16,
    color: '#848484',
  },

  scrollViewContainer: {
    marginTop: RFValue(12),
    flex: 1,
  },

  item: {
    padding: RFValue(15),
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    width: '100%',

    justifyContent: 'space-between',

    flexDirection: 'row',
    alignItems: 'center',
  },

  rank: {
    color: '#848484',
    fontSize: 20,
    fontWeight: 700,
  },

  username: {
    width: '50%',
    fontSize: 15,
    fontWeight: 700,
  },
  refund: {
    fontSize: 12,
    fontWeight: 600,
  },
});

export default StudyRoomRank;
