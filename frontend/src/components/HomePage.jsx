import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardMedia, CardContent, Box, Grid } from '@mui/material';
import { useAuth } from './AuthContext';  // Import the useAuth hook
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { authState, logout } = useAuth(); // Access authState and logout function
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleSignUp =() =>{
    navigate('/signup')
  }
  const handleSignIn =() =>{
    navigate('/signin')
  }
  const handleShop =() =>{
    navigate('/products')
  } 
  const handleCart = () => {
    if (!authState.loggedIn) {
      navigate('/signin');
    } else {
      navigate('/cart');
    }
  };
  const handleAddToCart = async (product) => {
    console.log("Add")
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!authState.loggedIn) {
      console.log('User not logged in, redirecting to sign-in page.');
      navigate('/signin'); // Redirect to sign-in
      return;
    }

    try {
      console.log(token)
      console.log("Entering")
      const response = await axios.post(
        'http://localhost:4000/api/addcart',
        { productId: product._id, quantity: 1, size:"M"},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  return (
    <Container>
      {/* Welcome Message */}
      <Typography variant="h3" align="center" gutterBottom>Welcome to Our Clothing Store</Typography>
      
      {/* Banner Section */}
      <Box sx={{
        background: '#f5f5f5',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
      }}>
        <Typography variant="h4">Big Sale!</Typography>
        <Typography variant="body1">Up to 50% off on selected items</Typography>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleShop}>Shop Now</Button>

          {/* Conditionally render Sign In and Sign Up if not logged in */}
          {!authState.loggedIn && (
            <>
              <Button variant="contained" color="primary" href="/signin-freelancer" onClick={handleSignUp}>Sign In</Button>
              <Button variant="contained" color="primary" href="/signup-freelancer" onClick={handleSignIn}>Sign Up</Button>
            </>
          )}

          {/* If logged in, show logout button */}
          {authState.loggedIn && (
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          )}
        </Box>
      </Box>

      {/* Featured Products */}
      <Container>
      <Typography variant="h4" gutterBottom>All Products</Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`https://source.unsplash.com/random/200x200?product-${product._id}`}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCart}>
                  My Cart
                </Button>
                <Button
                  component={Link}
                  to={`/products/${product.name}`}  // Dynamic URL based on product name
                  variant="outlined"
                  color="primary"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Container>
  );
};

export default HomePage;
