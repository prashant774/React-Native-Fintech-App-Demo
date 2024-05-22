import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeOrder, clearOrders} from './utils/ordersSlice';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import SwipeButton from './components/SwipeButton';
import PushNotification from 'react-native-push-notification';
import Loader from './components/Loader';

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const handleRemoveOrder = index => {
    dispatch(removeOrder(index));
  };

  const handleSwipeConfirmed = () => {
    setLoader(true);
    //console.log('Swipe confirmed! Performing operation...');
    // Send push notifications for each order
    orders.forEach(order => {
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'Purchase Completed',
        message: `Your Purchase order for ${order.name} is completed`,
      });
    });

    // Wait for 3 seconds before clearing orders and hiding the loader
    // adding timer so that confirmed state can be seen.
    setTimeout(() => {
      dispatch(clearOrders());
      setLoader(false);
    }, 6000);
    //setLoader(false);
    // Navigate to the Dashboard
    //navigation.navigate('Dashboard');
  };

  const goToDashboard = () => {
    // Navigate to the Dashboard
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text
        style={{fontSize: 22, fontWeight: 'bold', color: '#000', margin: 10}}>
        Open Orders
      </Text>
      {orders.length > 0 ? (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item, index) =>
              `${item.symbol}-${item.exchange}-${index}`
            }
            renderItem={({item, index}) => (
              <View style={styles.orderItem}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {item.symbol}
                  </Text>
                </View>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderText}>{item.name}</Text>
                  <Text style={styles.ordersubText}>{item.exchange}</Text>
                  <View style={styles.priceChangeContainer}>
                    <Text style={styles.orderText}>${item.price}</Text>
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                      <Ionicon
                        name={
                          item.change >= 0
                            ? 'arrow-up-circle'
                            : 'arrow-down-circle'
                        }
                        size={20}
                        color={item.change >= 0 ? 'green' : 'red'}
                      />
                      <Text
                        style={
                          item.change >= 0
                            ? styles.changePositive
                            : styles.changeNegative
                        }>
                        {item.change.toFixed(2)}%
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleRemoveOrder(index)}>
                  <Ionicon name="trash-bin" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
          {/* swipe button UI */}
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <SwipeButton onConfirmed={handleSwipeConfirmed} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.noOrdersText}>No orders to display</Text>
          <Text onPress={goToDashboard} style={styles.dashboardText}>
            Go To Dashboard
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  orderInfo: {
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingRight: 10,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  ordersubText: {
    fontSize: 16,
    color: '#333',
  },
  noOrdersText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  dashboardText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 40,
  },
  changePositive: {
    fontSize: 16,
    color: 'green',
    marginLeft: 5,
  },
  changeNegative: {
    fontSize: 16,
    color: 'red',
    marginLeft: 5,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  swipeButtonContainer: {
    width: '80%',
    height: 60,
    padding: 10,
    backgroundColor: '#ECD996',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 50,
    left: 5,
  },
});

export default OrdersScreen;
