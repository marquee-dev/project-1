import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/mycart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (authState.loggedIn) {
      fetchCartItems();
    }
  }, [authState.loggedIn]);

  // Handle delete cart item
  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/api/cart/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the UI after deletion
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/cart/checkout');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.productId._id}>
            <ListItemText
              primary={item.productId.name}
              secondary={`Price: $${item.productId.price}`}
              
            />
            <Typography>{item.size}</Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(item.productId._id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleCheckout}>Checkout</Button>
    </Container>
  );
};

export default CartPage;
