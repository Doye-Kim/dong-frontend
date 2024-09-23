import { ExpandRight, StoreIcon, UserProfileImage} from '@/assets/icons';
import NotificationHeader from '@/components/common/NotificationHeader';
import {colors} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ExtraMainScreenProps {}

const ExtraMainScreen = ({}: ExtraMainScreenProps) => {
  const navigation = useNavigation();

  const DATALIST = [
    {id: '1', title: '카테고리 편집', screen: 'CategoryEditScreen'},
    {id: '2', title: '예산 관리', screen: 'BudgetMainScreen'},
    {id: '3', title: '월간 소비 리포트', screen: 'SpendingReportScreen'},
    {id: '4', title: '내기 목록', screen: 'BudgetMainScreen'},
  ];

  return (
    <View style={styles.container}>
      <NotificationHeader />
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
        <Text style={styles.pointText}>5,000p</Text>
        <TouchableOpacity style={styles.storeButton}>
          <StoreIcon />
          <Text style={styles.storeText}>포인트 상점</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionHeaderText}>가계부</Text>
      {DATALIST.map(item => (
        <TouchableOpacity style={styles.listItemContainer} onPress={() => {}}>
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
