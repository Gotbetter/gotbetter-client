import ActionButton from '@components/common/btn/ActionButton';
import React from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function PlanCertificationFormScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('@assets/photo.png')} resizeMode="contain" />
        <Text style={styles.photoInfo}>사진을 첨부해주세요.</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.formTitle}>제목</Text>
        <TextInput style={styles.titleInput} placeholder="계획 제목을 작성해주세요." />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.formTitle}>내용</Text>
        <TextInput
          style={styles.contentInput}
          maxLength={60}
          multiline={true}
          placeholder="구체적으로 계획 내용을 작성해주세요."
        />
      </View>
      <ActionButton title={'계획 완료'} width={wp(90)} height={hp(8)} color={'#33F'} round={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imgContainer: {
    marginTop: RFValue(36),
    backgroundColor: '#D9D9D9',
    width: wp(50),
    height: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoInfo: {
    color: '#ffffff',
    marginTop: RFValue(12),
  },

  formGroup: {
    width: wp(90),
  },
  formTitle: {
    fontWeight: 700,
    fontSize: RFValue(20),
  },
  titleInput: {
    padding: RFValue(12),
    width: '100%',
    height: RFValue(56),
    marginTop: RFValue(12),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  contentInput: {
    padding: RFValue(12),
    textAlignVertical: 'top',
    width: wp(90),
    height: RFValue(140),
    marginTop: RFValue(12),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
});

export default PlanCertificationFormScreen;
