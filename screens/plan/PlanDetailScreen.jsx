import AddButton from '@components/common/btn/AddButton';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';

function PlanDetailScreen(props) {
  const navigation = useNavigation();
  const plans = useMemo(
    () => [
      {
        title: '영어 단어 300개 외우기',
        content: '단어책 20페이지까지 외우기',
      },
      {
        title: '토익 LC 3회차 풀기',
        content: 'LC 3회차까지 풀고 오답노트 하기',
      },
      {
        title: '토익 LC 3회차 풀기',
        content: 'LC 3회차까지 풀고 오답노트 하기',
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: RFValue(12), flexGrow: 1, alignItems: 'center' }}>
        {plans.map((plan, index) => (
          <View key={index} style={{ marginBottom: RFValue(12) }}>
            <Shadow distance={2} offset={[0, 2]}>
              <View style={styles.plan}>
                <Text style={styles.date}>06/18</Text>
                <Image style={styles.img} source={require('@assets/study-img.png')} resizeMode="contain" />
                <View style={styles.infoGroup}>
                  <Text style={{ width: '100%', fontWeight: 600, fontSize: 16 }}>{plan.title}</Text>
                  <Text
                    style={{ width: '100%', height: '80%', fontWeight: 600, fontSize: 12, paddingVertical: RFValue(8) }}
                  >
                    {plan.content}
                  </Text>
                </View>
              </View>
            </Shadow>
          </View>
        ))}
        <TouchableOpacity style={{ marginTop: RFValue(24) }} onPress={() => navigation.navigate('confirm')}>
          <AddButton />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  date: {
    fontWeight: 600,
    fontSize: 12,
    width: '100%',
    textAlign: 'right',
  },
  plan: {
    width: wp(90),
    minHeight: hp(7),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: RFValue(12),
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  img: {
    width: '30%',
  },

  infoGroup: {
    alignContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '70%',
    padding: RFValue(12),
  },
});
export default PlanDetailScreen;
