import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { clearCart } from '../../redux/slices/cartSlice';
import { getVatAmount } from '../../utils/priceUtil';
import { useDispatch } from 'react-redux';
import DisplayPrice from '../common/DisplayPrice';
import { EPaymentOptions } from './PaymentOptions';
import { useAppNavigation } from '../../navigation/navigation';

const PayNow = ({
  selectedPaymentMethod,
  totalPrice,
}: {
  selectedPaymentMethod: EPaymentOptions;
  totalPrice: number;
}) => {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const handlePlaceOrder = () => {
    //can add safe check for no payment method but not needed as default is Cash.
    dispatch(clearCart());

    navigation.navigate('PaymentSuccess');
  };

  return (
    <View style={styles.stickyContainer}>
      <Text>
        Total{'  '}
        <DisplayPrice
          price={totalPrice + getVatAmount(totalPrice)}
          fontSize={18}
        />
      </Text>
      <TouchableOpacity style={styles.payButton} onPress={handlePlaceOrder}>
        <Text style={styles.payButtonText}>
          {selectedPaymentMethod === EPaymentOptions.CARD
            ? 'Pay Now'
            : 'Place order'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PayNow;

const styles = StyleSheet.create({
  stickyContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e6e8e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  payButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
