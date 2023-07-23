import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { studyRoomCreateRequest } from 'recoil/room/atoms';
import styled from 'styled-components/native';

import RoomCreateForm from './RoomCreateForm';

function CategoryScreen(props) {
  const navigation = useNavigation();
  const [request, setRequest] = useRecoilState(studyRoomCreateRequest);
  const [requireFulfilled, setRequireFulfilled] = useState(false);

  const categoryItems = useMemo(
    () => [
      {
        label: '공부',
        value: 'STUDY',
        img: <Image source={require('@assets/category/study.png')} />,
      },
      {
        label: '운동',
        value: 'EXERCISE',
        img: <Image source={require('@assets/category/exercise.png')} />,
      },
      {
        label: '개발',
        value: 'DEVELOP',
        img: <Image source={require('@assets/category/develop.png')} />,
      },
      {
        label: '다이어트',
        value: 'DIET',
        img: <Image source={require('@assets/category/diet.png')} />,
      },
      {
        label: '수험생',
        value: 'EXAM',
        img: <Image source={require('@assets/category/exam.png')} />,
      },
      {
        label: '자격증',
        value: 'CERTIFICATE',
        img: <Image source={require('@assets/category/certificates.png')} />,
      },
      {
        label: '정서관리',
        value: 'EMOTION',
        img: <Image source={require('@assets/category/mind-control.png')} />,
      },
      {
        label: '생활습관',
        value: 'LIFESTYLE',
        img: <Image source={require('@assets/category/lifestyle.png')} />,
      },
      {
        label: '기타',
        value: 'ETC',
        img: <Image source={require('@assets/category/others.png')} />,
      },
    ],
    [],
  );

  useEffect(() => {
    setRequireFulfilled(request.room_category_code !== '');
  }, [request.room_category_code]);

  const onPressCategory = (value) => {
    setRequest((prev) => ({
      ...request,
      room_category_code: prev.room_category_code !== value ? value : '',
    }));
  };

  return (
    <RoomCreateForm>
      <Label>어떤 종류의 방인가요?</Label>
      <CategoryContainer>
        {categoryItems.map((item) => (
          <Category
            key={item.label}
            selected={request.room_category_code === item.value}
            onPress={() => onPressCategory(item.value)}
          >
            {item.img}
            <CategoryLabel>{item.label}</CategoryLabel>
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
          disabled={!requireFulfilled}
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

  background-color: ${({ selected }) => (selected ? '#E0E0E0' : '#ffffff')};
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
