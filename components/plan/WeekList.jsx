import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

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
    <Container>
      <Feather name="chevron-left" color={'#D9D9D9'} size={30} />
      {weekList[0].map((week) => (
        <Week key={week}>
          <WeekLabel>{week}주차</WeekLabel>
        </Week>
      ))}
      <Feather name="chevron-right" color={'#D9D9D9'} size={30} />
    </Container>
  );
}

const Container = styled.View`
  height: 12%;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: #ffffff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const Week = styled.TouchableOpacity`
  width: ${RFValue(42)}px;
  height: ${RFValue(32)}px;

  border-radius: 10px;
  background-color: #d9d9d9;

  justify-content: center;
  align-items: center;
`;

const WeekLabel = styled.Text``;

export default WeekList;
