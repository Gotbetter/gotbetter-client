import AddButton from '@components/common/btn/AddButton';
import OppositeButton from '@components/plan/OppositeButton';
import OppositeModal from '@components/plan/OppositeModal';
import WeekList from '@components/plan/WeekList';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import PlanList from '../../components/plan/PlanList';

function PlanScreen(props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'abc10402의 계획' });
  }, [navigation]);

  return (
    <View style={styles.screenContainer}>
      <WeekList />

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <PlanList />

          <AddButton />
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <OppositeButton />
      </View>

      <OppositeModal />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingVertical: RFValue(24),
    paddingHorizontal: RFValue(12),
    width: '100%',
    height: '64%',

    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    height: '24%',
    width: '100%',
  },
});

export default PlanScreen;
