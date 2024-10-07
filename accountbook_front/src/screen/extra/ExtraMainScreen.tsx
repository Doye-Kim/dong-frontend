import axiosInstance from '@/api/axios';
import {ExpandRight, StoreIcon, UserProfileImage} from '@/assets/icons';
import {colors, extraNavigations} from '@/constants';
import {ExtraStackParamList} from '@/navigations/stack/ExtraStackNavigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ExtraMainScreenProps {}

const ExtraMainScreen = ({}: ExtraMainScreenProps) => {
  const [point, setPoint] = useState<Number>(0);
  const navigation = useNavigation<NavigationProp<ExtraStackParamList>>();

  const fetchPoint = async () => {
    try {
      const response = await axiosInstance.get('/users/point');
      setPoint(response.data);
    } catch (error) {
      console.error('포인트불러오기 에러 : ', error);
    }
  };

  useEffect(() => {
    fetchPoint;
  }, []);

  const DATALIST = [
    {id: '1', title: '카테고리 편집', navigationKey: extraNavigations.CATEGORY},
    {id: '2', title: '예산 관리', navigationKey: extraNavigations.BUDGET},
    {
      id: '3',
      title: '월간 소비 리포트',
      navigationKey: extraNavigations.REPORT,
    },
    {id: '4', title: '내기 목록', navigationKey: extraNavigations.REPORT}, // 내기 목록도 REPORT로 설정된 경우
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeaderText}>프로필</Text>
      <View style={styles.profileContainer}>
        <UserProfileImage />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.usernameText}>이현규</Text>
          <Text style={styles.phoneNumberText}>010-1234-1234</Text>
        </View>
      </View>
      <Text style={styles.sectionHeaderText}>포인트</Text>
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>{point.toLocaleString()}p</Text>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={() =>
            navigation.navigate(extraNavigations.MARKET, {point: point})
          }>
          <StoreIcon />
          <Text style={styles.storeText}>포인트 상점</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionHeaderText}>가계부</Text>
      {DATALIST.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItemContainer}
          onPress={() => navigation.navigate(item.navigationKey)}>
          <Text style={styles.listTitleText}>{item.title}</Text>
          <ExpandRight />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    paddingHorizontal: 13,
  },
  profileContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 15,
  },
  profileInfoContainer: {
    marginLeft: 10,
  },
  usernameText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  phoneNumberText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  pointContainer: {
    paddingHorizontal: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  pointText: {
    fontSize: 35,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ORANGE_200,
    borderRadius: 25,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  storeText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.PRIMARY,
    marginLeft: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  listTitleText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
});

export default ExtraMainScreen;
