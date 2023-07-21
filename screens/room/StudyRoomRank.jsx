import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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
    <Container>
      <LabelContainer>
        <Label>랭킹</Label>
      </LabelContainer>
      <DateContainer>
        <Date>2023년 6월 29일 기준</Date>
      </DateContainer>

      <ContentContainer>
        <ScrollView>
          {items.map((item) => (
            <Item key={item.rank}>
              <Rank>{item.rank}</Rank>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#C4C4C4' }} />
              <Name>{item.username}</Name>
              <Refund>{item.refund.toLocaleString('ko-KR')}원</Refund>
            </Item>
          ))}
        </ScrollView>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: ${RFValue(18)}px;

  flex-wrap: wrap;
  flex-direction: row;
`;

const LabelContainer = styled.View`
  width: 20%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.View`
  width: 80%;
  height: 10%;
  justify-content: center;
  align-items: flex-start;
  padding-left: ${RFValue(4)}px;
`;

const Label = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: 600;
`;

const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: #848484;
`;

const ContentContainer = styled.View`
  width: 100%;
  height: 80%;
  margin-top: ${RFValue(12)}px;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;

  padding: ${RFValue(15)}px;
`;

const Rank = styled.Text`
  color: #848484;
  font-size: ${RFValue(18)}px;
  font-weight: 700;
`;

const Name = styled.Text`
  width: 50%;
  font-size: ${RFValue(13)}px;
  font-weight: 700;
`;

const Refund = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
`;

export default StudyRoomRank;
