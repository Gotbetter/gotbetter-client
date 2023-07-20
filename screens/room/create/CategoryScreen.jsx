import ActionButton from '@components/common/btn/ActionButton';
import BackButton from '@components/common/btn/BackButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';
import RoomCreateForm from './RoomCreateForm';

function CategoryScreen(props) {
  const navigation = useNavigation();
  const [requireFulfilled] = useState(true);

  const headerOptions = useMemo(
    () => ({
      title: '방 만들기',
      headerTitleAlign: 'center',
      headerBackVisible: false,
      headerLeft: () => <BackButton />,
      headerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
      },
      headerTitleStyle: {
        color: '#000000',
        fontWeight: 700,
      },
    }),
    [],
  );

  useEffect(() => {
    navigation.setOptions(headerOptions);
  }, [navigation, headerOptions]);

  const categoryItems = useMemo(
    () => [
      {
        title: '공부',
        value: 'STUDY',
        img: <Image source={require('@assets/category/study.png')} />,
      },
      {
        title: '운동',
        value: 'EXERCISE',
        img: <Image source={require('@assets/category/exercise.png')} />,
      },
      {
        title: '개발',
        value: 'DEVELOP',
        img: <Image source={require('@assets/category/develop.png')} />,
      },
      {
        title: '다이어트',
        value: 'DIET',
        img: <Image source={require('@assets/category/diet.png')} />,
      },
      {
        title: '수험생',
        value: 'EXAM',
        img: <Image source={require('@assets/category/exam.png')} />,
      },
      {
        title: '자격증',
        value: 'CERTIFICATES',
        img: <Image source={require('@assets/category/certificates.png')} />,
      },
      {
        title: '정서관리',
        value: 'MIND',
        img: <Image source={require('@assets/category/mind-control.png')} />,
      },
      {
        title: '생활습관',
        value: 'LIFESTYLE',
        img: <Image source={require('@assets/category/lifestyle.png')} />,
      },
      {
        title: '기타',
        value: 'OTHERS',
        img: <Image source={require('@assets/category/others.png')} />,
      },
    ],
    [],
  );

  return (
    <RoomCreateForm>
      <Label>어떤 종류의 방인가요?</Label>
      <CategoryContainer>
        {categoryItems.map((item) => (
          <Category key={item.title}>
            {item.img}
            <CategoryLabel>{item.title}</CategoryLabel>
          </Category>
        ))}
      </CategoryContainer>
      <ButtonContainer>
        <ActionButton
          onPress={() => navigation.navigate('title')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </ButtonContainer>
    </RoomCreateForm>
  );
}

const Label = styled.Text`
  padding: ${RFValue(12)}px;
  margin-top: ${hp(3)}px;
  font-size: ${RFValue(18)}px;
  font-weight: 600;
`;

const CategoryContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: space-around;

  height: 60%;
  margin-top: ${hp(2)}px;
`;

const Category = styled.TouchableOpacity`
  width: 30%;
  height: 30%;

  justify-content: center;
  align-items: center;
`;

const CategoryLabel = styled.Text`
  color: #5f5f5f;
  font-weight: 700;
  margin-top: ${RFValue(4)}px;
`;

const ButtonContainer = styled.View`
  align-self: center;
  margin-top: auto;
  margin-bottom: ${hp(4)}px;
`;

export default CategoryScreen;
