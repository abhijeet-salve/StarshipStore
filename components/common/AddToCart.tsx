import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeFromCart, setCartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { MAX_QUANTITY_PER_ITEM } from '../../utils/constants';
import { getQuantityById } from '../../redux/selectors/cartSelectors';
import { addStarship } from '../../redux/slices/starShipsSlice';
import { selectStarships } from '../../redux/selectors/starShipsSelectors';
import { convertCreditsToAED } from '../../utils/priceUtil';

interface IAddToCartProps {
  starship: Starship;
}

const AddToCart = ({ starship }: IAddToCartProps) => {
  const dispatch = useDispatch();
  const priceInAED = convertCreditsToAED(starship.cost_in_credits);

  const quantity = useSelector((state: RootState) =>
    getQuantityById(state, starship.id)
  );

  const startShipInStore = useSelector(selectStarships);

  const updateCart = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(
        setCartItem({
          id: starship.id,
          price: priceInAED,
          quantity: newQuantity,
        })
      );
    } else {
      dispatch(removeFromCart(starship.id));
    }
  };

  const modifyQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0 && newQuantity <= MAX_QUANTITY_PER_ITEM) {
      updateCart(newQuantity);
    }
  };

  const increaseQuantity = () => {
    const exists = startShipInStore.some((ship) => ship.id === starship.id);

    if (!exists) dispatch(addStarship(starship));

    modifyQuantity(1);
  };

  const decreaseQuantity = () => modifyQuantity(-1);

  return (
    <View style={cartStyles.container}>
      {quantity === 0 ? (
        <TouchableOpacity
          style={cartStyles.addButton}
          onPress={increaseQuantity}
        >
          <Icon name='plus' size={18} />
        </TouchableOpacity>
      ) : (
        <View style={cartStyles.quantityContainer}>
          <TouchableOpacity
            style={cartStyles.iconButton}
            onPress={decreaseQuantity}
          >
            {quantity === 1 ? (
              <MIcon name={'delete-outline'} color='#fff' size={18} />
            ) : (
              <Icon name={'minus'} color='#fff' size={18} />
            )}
          </TouchableOpacity>

          <Text style={cartStyles.quantityText}>{quantity}</Text>

          {quantity === MAX_QUANTITY_PER_ITEM ? (
            <View style={cartStyles.iconButton}>
              <MIcon name='cancel' color='#fff' size={18} />
            </View>
          ) : (
            <TouchableOpacity
              style={cartStyles.iconButton}
              onPress={increaseQuantity}
            >
              <Icon name='plus' color='#fff' size={18} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const cartStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  iconButton: {
    borderRadius: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(232, 68, 66)',
    borderRadius: 16,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 2,
  },
});

export default AddToCart;
