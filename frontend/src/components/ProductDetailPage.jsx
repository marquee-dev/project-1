import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, CardMedia, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');  // State to store selected size

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productName}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productName]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');

    if (!authState.loggedIn) {
      navigate('/signin');
      return;
    }

    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/addcart',
        { productId: product._id, quantity: 1, size: selectedSize },  // Send size with cart
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={`https://source.unsplash.com/random/400x400?clothes-${product._id}`}
            alt={product.name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h5" color="secondary">${product.price}</Typography>

          <Typography variant="body1" paragraph>Select Size:</Typography>
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>Select Size</MenuItem>
            
              <MenuItem value="M">M</MenuItem>
            
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(product)}
            style={{ marginTop: '20px' }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
