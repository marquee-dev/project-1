import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Typography, Button, Card, CardContent, List, ListItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [totalPrice, setTotalPrice] = useState(0);  // To store total price
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the cart items from the backend
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/mycart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);

        // Calculate total price
        const total = response.data.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:4000/api/orders/checkout',
        {
          shippingAddress,
          paymentDetails,
          cartItems,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Order placed successfully!');
      navigate('/order-summary');  // You can remove this if you don’t have an order-summary page
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      <Grid container spacing={4}>
        {/* Shipping Address Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Shipping Address</Typography>
          <TextField
            label="Address"
            fullWidth
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Grid>

        {/* Payment Details Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Payment Details</Typography>
          <TextField
            label="Card Number"
            fullWidth
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
          />
          <TextField
            label="Expiry Date"
            fullWidth
            value={paymentDetails.expiry}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
          />
          <TextField
            label="CVV"
            fullWidth
            value={paymentDetails.cvv}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
          />
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12}>
          <Typography variant="h6">Order Summary</Typography>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.productId.name}</Typography>
                    <Typography variant="body2">Price: ${item.productId.price}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>

          {/* Total Price */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Total Price: ${totalPrice}
          </Typography>

          {/* Place Order Button */}
          <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginTop: '20px' }}>
            Pay ${totalPrice}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
