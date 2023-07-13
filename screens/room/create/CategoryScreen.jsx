import ActionButton from '@components/common/btn/ActionButton';
import BackButton from '@components/common/btn/BackButton';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';

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
    <RoomCreateFormTemplate title={'어떤 종류의 방인가요?'} buttonActivate={true} nextScreen={'title'}>
      <View style={styles.categoryContainer}>
        {categoryItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.category}>
            {item.img}
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => navigation.navigate('description')}
          title={'다음'}
          width={wp(90)}
          height={hp(8)}
          color={requireFulfilled ? '#3333FF' : '#E0E0E0'}
          round={true}
        />
      </View>
    </RoomCreateFormTemplate>
  );
}
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
    flexWrap: 'wrap',
    height: '60%',
    marginTop: hp(2),
  },
  category: {
    width: '30%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryText: {
    marginTop: RFValue(4),
    color: '#5F5F5F',
    fontWeight: 700,
  },
});

export default CategoryScreen;
