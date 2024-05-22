import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Button from './components/Button';
import {useDispatch} from 'react-redux';
import {addOrder} from './utils/actions/ordersActions';
import {useNavigation} from '@react-navigation/native';

const StockDetails = ({route}) => {
  const {stock} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToOrder = () => {
    //console.log('add order');
    dispatch(addOrder(stock));
    navigation.navigate('OrdersScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.ticker}>{stock.symbol}</Text>
      <Text style={styles.name}>{stock.name}</Text>
      <Text style={styles.fullName}>{stock.exchange}</Text>
      <Text style={styles.price}>$ {stock.price}</Text>
      <View style={styles.changeContainer}>
        <Ionicon
          name={stock.change >= 0 ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={20}
          color={stock.change >= 0 ? 'green' : 'red'}
        />
        <Text
          style={
            stock.change >= 0 ? styles.changePositive : styles.changeNegative
          }>
          {stock.change}%
        </Text>
      </View>
      <Text
        style={{
          marginVertical: 10,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000000',
        }}>
        Lorem ipsum dolor
      </Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <View style={{marginVertical: 50}}>
        <Button type="PRIMARY" name="Add to order" onPress={handleAddToOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  ticker: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  name: {
    fontSize: 20,
    color: '#000',
  },
  fullName: {
    fontSize: 18,
    color: '#777',
  },

  description: {
    marginTop: 20,
    fontSize: 16,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default StockDetails;
