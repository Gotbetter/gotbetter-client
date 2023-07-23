import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRecoilState } from 'recoil';
import { tabState } from 'recoil/room/atoms';
import styled from 'styled-components/native';
HomeHeader.propTypes = {
  menu: PropTypes.string,
  onPress: PropTypes.func,
};

function HomeHeader({ menu, onPress }) {
  const [tab, selectTab] = useRecoilState(tabState);

  return (
    <Container>
      <LogoContainer>
        <Logo source={require('@assets/logo.png')} resizeMode="contain" />
      </LogoContainer>
      <TabContainer>
        <Tab selected={tab === '전체'} onPress={() => selectTab('전체')}>
          <Label>전체</Label>
        </Tab>
        <Tab selected={tab === '진행중'} onPress={() => selectTab('진행중')}>
          <Label style={{ color: '#3333FF' }}>진행중</Label>
        </Tab>
      </TabContainer>
    </Container>
  );
}

const Container = styled.View``;

const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(80)}px;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.TouchableOpacity`
  width: 50%;
  padding: ${RFValue(12)}px;
  border-bottom-width: ${({ selected }) => (selected ? 2 : 0)}px;
  border-bottom-color: ${({ selected }) => selected && '#000000'};
`;

const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  text-align: center;
`;
export default HomeHeader;
