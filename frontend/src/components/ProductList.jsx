import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { authState } = useAuth(); // Get authState from context
  const navigate = useNavigate();

  // Fetch products from backend
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

  // Add product to cart
  const handleAddToCart = async (product) => {
    console.log("Add")
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!authState.loggedIn) {
      console.log('User not logged in, redirecting to sign-in page.');
      navigate('/signin'); // Redirect to sign-in
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/addcart',
        { productId: product._id, quantity: 1 },
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

  // Navigate to cart page
  const handleCart = () => {
    if (!authState.loggedIn) {
      navigate('/signin');
    } else {
      navigate('/cart');
    }
  };

  return (
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
  );
};

export default ProductList;
