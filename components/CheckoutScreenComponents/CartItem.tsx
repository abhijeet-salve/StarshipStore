import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DisplayPrice from '../common/DisplayPrice';
import AddToCart from '../common/AddToCart';
import { useSelector } from 'react-redux';
import { selectShipById } from '../../redux/selectors/starShipsSelectors';
import { RootState } from '../../redux/store';

const CartItem = ({ item }: { item: CartItem }) => {
  const { id, price } = item;
  const starship = useSelector((state: RootState) => selectShipById(state, id));

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.manufacturer}>{starship?.starship_class}</Text>
        <Text style={styles.name}>{starship?.name}</Text>
      </View>

      <View style={styles.gap8}>
        <DisplayPrice price={price} fontSize={14} />
        <AddToCart starship={starship} />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    gap: 12,
    width: 130,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  manufacturer: {
    fontSize: 12,
    fontWeight: '300',
  },
  gap8: { gap: 8 },
});
