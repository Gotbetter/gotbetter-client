import { MediaTypeOptions, launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { detailPlanRecordRequest } from 'recoil/plan/atoms';
import styled from 'styled-components/native';

function AddPhoto() {
  const [status, requestPermission] = useMediaLibraryPermissions();

  const [{ recordPhoto }, setRequest] = useRecoilState(detailPlanRecordRequest);

  const upLoadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    const photo = result.assets[0];
    setRequest((prev) => ({ ...prev, recordPhoto: { ...photo } }));
  };

  return (
    <PhotoContainer onPress={upLoadImage}>
      {recordPhoto === null ? (
        <>
          <Image source={require('@assets/photo.png')} resizeMode="contain" />
          <PhotoInfo>사진을 첨부해주세요.</PhotoInfo>
        </>
      ) : (
        <Image source={{ uri: recordPhoto.uri }} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
      )}
    </PhotoContainer>
  );
}
// 4 3 
const PhotoContainer = styled(Pressable)`
  width: ${wp(56)}px;
  height: ${wp(42)}px;

  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  margin-top: ${RFValue(36)}px;
`;

const PhotoInfo = styled.Text`
  color: #ffffff;
  margin-top: ${RFValue(12)}px;
`;

export default AddPhoto;
