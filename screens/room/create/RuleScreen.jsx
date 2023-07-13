import ActionButton from '@components/common/btn/ActionButton';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Shadow } from 'react-native-shadow-2';

import RoomCreateFormTemplate from './RoomCreateFormTemplate';

function RuleScreen(props) {
  const [selected, select] = useState(0);
  const [requireFulfilled] = useState(true);
  const navigation = useNavigation();

  const rules = useMemo(
    () => [
      {
        rule_code: 'R1',
        rule_description: '👑 1등 몰빵',
        rule_attribute1: '1등한테 200% 몰빵! 기본 규칙 선택하기',
        rule_attribute2: '👑 1등 200% 환급\n\n2등 ~ 5등 100% 환급\n\n😥 꼴등 0% 환급',
      },
      {
        rule_code: 'R2',
        rule_description: '👥 공평하게',
      },
      {
        rule_code: 'R3',
        rule_description: '규칙 만들기',
      },
    ],
    [],
  );

  return (
    <RoomCreateFormTemplate title={'방 규칙'} buttonActivate={true} nextScreen={'account'}>
      <View style={styles.ruleSelectContainer}>
        {rules.map((rule) => (
          <View key={rule.rule_code} style={styles.rule}>
            <Text>{rule.rule_description}</Text>
            <RadioButton
              value={rule.rule_code}
              status={selected === rule.rule_code ? 'checked' : 'unchecked'}
              onPress={() => select(rule.rule_code)}
            />
          </View>
        ))}
      </View>
      <View style={{ alignSelf: 'center', marginTop: hp(10) }}>
        <Shadow distance={4} offset={[0, 5]}>
          <View style={styles.ruleSelectedContainer}>
            <Text style={{ fontWeight: 600 }}>{rules[0].rule_description}</Text>
            <Text style={{ color: '#959595' }}>{rules[0].rule_attribute1}</Text>
            <Text style={styles.highlight}>{rules[0].rule_attribute2}</Text>
          </View>
        </Shadow>
      </View>
      <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: hp(4) }}>
        <ActionButton
          onPress={() => navigation.navigate('account')}
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
  ruleSelectContainer: {
    width: wp(95),
    marginTop: RFValue(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  ruleSelectedContainer: {
    width: wp(90),
    height: hp(30),
    backgroundColor: '#ffffff',
    borderRadius: 18,

    justifyContent: 'space-around',
    alignItems: 'center',
    padding: RFValue(12),
  },
  rule: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: RFValue(2),
    paddingRight: RFValue(2),
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#E4E4E4',
  },

  highlight: {
    width: '80%',
    height: '60%',
    fontWeight: 600,
    backgroundColor: '#F6F6F6',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default RuleScreen;
