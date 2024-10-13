import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, IconButton, Box, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer'; 

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

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/api/cart/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <Box sx={{ 
      overflowX: 'hidden',
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: { xs: 10, sm: 14 }, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 500, fontFamily: "Afacad Flux" }} gutterBottom>Your Cart</Typography>
        <Grid container spacing={3} direction="column"> {/* Changed direction to column */}
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.productId._id}> {/* Removed sm and md props */}
              <Card>
                <CardContent sx={{ display: 'flex', position: 'relative' }}> {/* Added position: relative */}
                  {/* Delete button positioned absolutely */}
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 20 }} 
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item.productId._id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <CardMedia
                    component="img"
                    sx={{ width: 151, mr: 2 }}
                    image={`/images/${item.productId.name}.jpg`}
                    alt={item.productId.name}
                  />
                  <Box>
                    <Typography variant="h6" component="div">
                      {item.productId.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.productId.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.size}
                    </Typography>
                  </Box>
                </CardContent>
                {/* Removed CardActions since we moved the button */}
              </Card>
            </Grid>
          ))}
        </Grid>
        {cartItems.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default CartPage;