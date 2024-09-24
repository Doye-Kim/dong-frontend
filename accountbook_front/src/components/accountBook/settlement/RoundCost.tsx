import {User} from '@/assets/icons';
import {colors} from '@/constants';
import {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface RoundProps {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
}

interface UserProps {
  userId: number;
  userName: string;
  cost?: number;
  costEdit?: boolean;
}
const RoundCost = ({data, user}: {data: RoundProps; user: UserProps[]}) => {
  let distributedCost = Math.floor(data.balance / user.length);
  let extraAmount = data.balance - distributedCost * user.length;

  const [users, setUsers] = useState<UserProps[]>(
    user.map((item, index) => {
      const finalCost =
        index === 0 ? distributedCost + extraAmount : distributedCost;

      return {
        ...item,
        cost: finalCost,
        costEdit: false,
      };
    }),
  );

  const handleChangeText = (text: string, index: number) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const updatedUsers = [...users];
    updatedUsers[index].cost = Number(numericValue);
    updatedUsers[index].costEdit = true;
    setUsers(updatedUsers);
  };

  const remainingCalculate = (totalEditedCost: number) => {
    const remainingBalance = data.balance - totalEditedCost;

    const uneditedUsers = users.filter(user => !user.costEdit);
    const uneditedUsersCount = uneditedUsers.length;

    console.log('remaining', remainingBalance);
    if (uneditedUsersCount > 0) {
      // 5. 나눌 금액을 Math.floor로 계산해서 소수점 버림
      let distributedCost = Math.floor(remainingBalance / uneditedUsersCount);

      console.log(distributedCost);
      // 6. 소수점 때문에 남는 금액 계산
      let extraAmount = remainingBalance - distributedCost * uneditedUsersCount;
      let flag = false;
      const updatedUsers = users.map(user => {
        let finalCost;
        if (!user.costEdit) {
          // 7. 첫 번째 사용자에게 남은 금액을 추가로 분배
          if (!flag) {
            finalCost = distributedCost + extraAmount;
            flag = true;
          } else {
            finalCost = distributedCost;
          }
          return {
            ...user,
            cost: finalCost,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
    }
  };
  const handleEndEditing = (userIndex: number) => {
    console.log('handleEndEditing index', userIndex);
    // 1. costEdit이 true인 사용자들의 cost 합산
    let totalEditedCost = users
      .filter(user => user.costEdit)
      .reduce((sum, user) => sum + (user.cost || 0), 0);

    // 2. 사용자가 수정한 금액 합이 balance를 넘으면 자동으로 조정
    if (totalEditedCost > data.balance) {
      const adjustedUsers = users.map((item, index) => {
        item.cost =
          userIndex === index
            ? data.balance - (totalEditedCost - item.cost)
            : item.cost;
        return item;
      });
      totalEditedCost = data.balance;
      setUsers(adjustedUsers);
      remainingCalculate(totalEditedCost);
      return;
    }
    remainingCalculate(totalEditedCost);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.merchantNameText}>{data.merchantName}</Text>
        <Text style={styles.balanceText}>
          {data.balance.toLocaleString()}원
        </Text>
      </View>
      <ScrollView>
        {users.map((item, index) => (
          <View style={styles.infoContainer} key={item.userId}>
            <View style={styles.userContainer}>
              <User width={35} height={35} />
              <Text style={styles.nameText}>{item.userName}</Text>
            </View>
            <View style={styles.balanceContainer}>
              <TextInput
                style={styles.userBalanceText}
                value={item.cost?.toLocaleString() || ''}
                onChangeText={text => handleChangeText(text, index)}
                keyboardType="numeric"
                onEndEditing={() => handleEndEditing(index)}
              />
              <Text style={styles.userBalanceText}>원</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').height - 300,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY_600,
    padding: 10,
  },
  merchantNameText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.BLACK,
  },
  balanceText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 18,
    color: colors.BLACK,
    margin: 10,
  },
  userBalanceText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 22,
    paddingLeft: 10,
    color: colors.BLACK,
  },
});

export default RoundCost;
