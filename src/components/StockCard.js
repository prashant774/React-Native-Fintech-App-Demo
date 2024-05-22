import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const StockCard = ({stock, navigation}) => {
  const [showDetails, setShowDetails] = useState(false); // state to manage for display static text on long press

  // long press fucntion
  const handleLongPress = () => {
    setShowDetails(!showDetails);
  };

  // single click / press fucntion
  const handlePress = () => {
    navigation.navigate('StockDetails', {stock});
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={handleLongPress}
      onPress={handlePress}>
      <View style={styles.symbolContainer}>
        <Text style={{color: '#000', fontWeight: 'bold'}}>{stock.symbol}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{stock.name}</Text>
        <Text style={styles.fullName}>{stock.exchange}</Text>
        <View style={styles.priceChangeContainer}>
          <Text style={styles.price}>$ {stock.price}</Text>
          <View style={styles.changeContainer}>
            <Ionicon
              name={stock.change >= 0 ? 'arrow-up-circle' : 'arrow-down-circle'}
              size={20}
              color={stock.change >= 0 ? 'green' : 'red'}
            />
            <Text
              style={
                stock.change >= 0
                  ? styles.changePositive
                  : styles.changeNegative
              }>
              {stock.change}%
            </Text>
          </View>
        </View>
        {showDetails && (
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  symbolContainer: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  fullName: {
    fontSize: 14,
    color: '#777',
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

export default StockCard;
