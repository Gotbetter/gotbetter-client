import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

WeekList.propTypes = {
  weekInfo: PropTypes.shape({
    selectedWeek: PropTypes.number.isRequired,
    totalWeek: PropTypes.number.isRequired,
    currentWeek: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

function WeekList({ weekInfo, onPress }) {
  const { selectedWeek, totalWeek, currentWeek } = weekInfo;
  const [offset, setOffset] = useState(Math.ceil(selectedWeek / 5) - 1);

  const [weekList] = useState(() => {
    const week = [];
    for (let i = 1; i <= totalWeek; i++) {
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

    return splitIntoChunk(week, 5);
  });

  return (
    <Container>
      <Feather
        name="chevron-left"
        color={'#D9D9D9'}
        size={30}
        onPress={() => setOffset((prev) => (prev - 1 >= 0 ? prev - 1 : prev))}
      />
      <WeekListContainer>
        {weekList[offset].map((week) => (
          <Week
            key={week}
            onPress={() => onPress(week)}
            border={week === selectedWeek ? 0 : '1px solid #C4C4C4'}
            backgroundColor={selectedWeek === week ? '#3333FF' : week < currentWeek ? '#D9D9D9' : '#ffffff'}
            disabled={week > currentWeek}
          >
            <WeekLabel color={selectedWeek === week ? '#ffffff' : '#C4C4C4'}>{week}주차</WeekLabel>
          </Week>
        ))}
      </WeekListContainer>
      <Feather
        name="chevron-right"
        color={'#D9D9D9'}
        size={30}
        onPress={() => setOffset((prev) => (prev + 1 <= weekList.length - 1 ? prev + 1 : prev))}
      />
    </Container>
  );
}

const Container = styled.View`
  height: ${hp(10)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background-color: #ffffff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const WeekListContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
`;

const Week = styled.TouchableOpacity`
  width: ${RFValue(36)}px;
  height: ${RFValue(28)}px;

  border-radius: 10px;
  border: ${({ border }) => border};
  background-color: ${({ backgroundColor }) => backgroundColor};

  justify-content: center;
  margin-right: 9%;
  align-items: center;
`;

const WeekLabel = styled.Text`
  font-size: ${RFValue(8)}px;
  color: ${({ color }) => color};
`;

export default WeekList;
