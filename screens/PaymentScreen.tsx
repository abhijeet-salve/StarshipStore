import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTabNavigation } from '../navigation/navigation';

const Payment = () => {
  const navigation = useTabNavigation();
  const [processingPayment, setProcessingPayment] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setProcessingPayment(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      {processingPayment ? (
        <View style={styles.processingContainer}>
          <Icon name='payment' size={24} />

          <Text style={styles.message}>
            Please wait while payment is in process
          </Text>

          <ActivityIndicator size='small' />
        </View>
      ) : (
        <>
          <View style={styles.iconContainer}>
            <Icon name='check-circle' size={50} color='#4CAF50' />
          </View>
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.message}>
            Thank you for your purchase. Your order has been successfully
            placed.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title='Go to Home'
              onPress={() => navigation.navigate('Home')}
              accessibilityLabel='Go to Home'
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  processingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 100,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    letterSpacing: 0.2,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Payment;
