import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function WeekList(props) {
  const [weekList] = useState(() => {
    const week = [];
    for (let i = 1; i <= 5; i++) {
      week.push(i);
    }

    function splitIntoChunk(arr, chunk) {
      // 빈 배열 생성
      const result = [];

      for (let index = 0; index < arr.length; index += chunk) {
        // slice() 메서드를 사용하여 특정 길이만큼 배열을 분리함
        const tempArray = arr.slice(index, index + chunk);
        // 빈 배열에 특정 길이만큼 분리된 배열을 추가
        result.push(tempArray);
      }
      return result;
    }

    return splitIntoChunk(week, 4);
  });

  return (
    <View style={styles.weekContainer}>
      <Feather name="chevron-left" color={'#D9D9D9'} size={30} />
      {weekList[0].map((week) => (
        <TouchableOpacity key={week} style={styles.week}>
          <Text>{week}주차</Text>
        </TouchableOpacity>
      ))}
      <Feather name="chevron-right" color={'#D9D9D9'} size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignItems: 'center',

    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: '12%',
  },

  week: {
    width: 45,
    height: 33,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeekList;
