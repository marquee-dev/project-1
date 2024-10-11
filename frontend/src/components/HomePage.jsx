import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardMedia, CardContent, Grid, Box } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from './NavBar';
import SlickMousewheel from './SlickMousewheel';
import Footer from './Footer'; 
import Signin from './Signin';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [openSignin, setOpenSignin] = useState(false);

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

  const handleOpenSignin = () => {
    setOpenSignin(true);
  };

  const handleCloseSignin = () => {
    setOpenSignin(false);
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');

    if (!authState.loggedIn) {
      navigate('/signin');
      return;
    }

    try {
      await axios.post(
        'http://localhost:4000/api/addcart',
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Custom arrow components
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronRight
        className={className}
        style={{ ...style, display: "block", color: "red", fontSize: '40px', zIndex: 2, right: '10px' }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronLeft
        className={className}
        style={{ ...style, display: "block", color: "red", fontSize: '40px', zIndex: 2, left: '10px' }}
        onClick={onClick}
      />
    );
  };

  const carouselItemStyle = {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundSize: 'cover', // Ensures the background covers the area
  backgroundPosition: 'center',
  margin: 0, // Ensure no margin
  padding: 0, // 
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 1,
    },
  };

  const contentStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    zIndex: 2,
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    draggable: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  };

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column'
    }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onOpenSignin={handleOpenSignin} openSignin={openSignin} />
      
      <Container maxWidth="lg" sx={{ mt: 12, flex: 1, display: 'flex', flexDirection: 'column', filter: openSignin ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease-in-out' }}>
        {/* Carousel Section for Big Sale */}
        <Box className="carousel-container" sx={{ marginBottom: '2rem', overflow: 'hidden', borderRadius: '20px',boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',padding: 0, }}>
          <SlickMousewheel>
            <Slider {...settings}>
              {/* Carousel items */}
              <Box sx={{ ...carouselItemStyle, backgroundImage: "url('/images/slide.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Box sx={contentStyle}>
                  <Typography sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: '4rem' }} variant="h4">Big Sale!</Typography>
                  <Typography sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: '1.5rem' }} variant="body1">Up to 50% off on selected items</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#d21b14', color: '#FFF' }}>Shop Now</Button>
                </Box>
              </Box>
              <Box
                sx={{
                  ...carouselItemStyle,
                  backgroundImage: "url('/images/slide2.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box sx={contentStyle}>
                  <Typography sx={{fontWeight:400, fontFamily:"Afacad Flux",fontSize:'4rem'}} variant="h4">Limited Time Offer!</Typography>
                  <Typography sx={{fontWeight:400, fontFamily:"Afacad Flux",fontSize:'1.5rem'}} variant="body1">Buy One Get One Free</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#d21b14', color: '#FFF' }}>Shop Now</Button>
                </Box>
              </Box>
              <Box
                sx={{
                  ...carouselItemStyle,
                  backgroundImage: "url('/images/slide3.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box sx={contentStyle}>
                  <Typography sx={{fontWeight:400, fontFamily:"Afacad Flux",fontSize:'4rem'}} variant="h4">Exclusive Online Sale!</Typography>
                  <Typography sx={{fontWeight:400, fontFamily:"Afacad Flux",fontSize:'1.5rem'}} variant="body1">Get 20% off on your first order</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#d21b14', color: '#FFF' }}>Shop Now</Button>
                </Box>
              </Box>
            </Slider>
          </SlickMousewheel>
        </Box>

        {/* Featured Products Section */}
        <Box>
          <Typography sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: '2.5rem' }} variant="h4" gutterBottom>New Arrivals</Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Link to={`/products/${product.name}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' } }}>
                    <CardMedia component="img" height="200" image={`/images/${product.name}.jpg`} alt={product.name} />
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2">${product.price}</Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Button variant="outlined" color="#d21b14" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} sx={{ color: "red", marginTop: "10px" }}>View Product</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Updated Footer */}
      
      
      {/* Render Signin outside of the blurred container */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: openSignin ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1300 }}>
        <Signin open={openSignin} onClose={handleCloseSignin} />
      </Box>
    </Box>
    <Box sx={{ mt: 10 }}/>
    <Footer sx={{  width: '100vw', position: 'relative', left: 'calc(-50vw + 50%)', backgroundColor: '#f8f8f8', padding: '20px 0' }} />
    </Box>
  );
};

export default HomePage;
