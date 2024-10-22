import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTabNavigation } from '../navigation/navigation';
import CartDetails from '../components/CheckoutScreenComponents/CartDetails';
import PaymentOptions, {
  EPaymentOptions,
} from '../components/CheckoutScreenComponents/PaymentOptions';
import OrderSummary from '../components/CheckoutScreenComponents/OrderSummary';
import PayNow from '../components/CheckoutScreenComponents/PayNow';
import Divider from '../components/common/Divider';
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from '../redux/selectors/cartSelectors';

const CheckoutScreen = () => {
  const navigation = useTabNavigation();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<EPaymentOptions>(EPaymentOptions.CASH);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <CartDetails cartItems={cartItems} totalQuantity={totalQuantity} />
            <Divider />
            <PaymentOptions
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
            <Divider />
            <OrderSummary
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </ScrollView>
          <PayNow
            totalPrice={totalPrice}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        </>
      ) : (
        <View
          style={{
            ...styles.container,
            ...styles.noItems,
          }}
        >
          <Text style={styles.largeText}>Ready to explore the galaxy?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Browse Starships</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    width: 200,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noItems: { justifyContent: 'center', alignItems: 'center', gap: 20 },
  largeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    letterSpacing: 1.2,
  },
});
