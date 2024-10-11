import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Footer from "./Footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import Signin from './Signin';


const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const ProductDetailPage = () => {

  const [openSignin, setOpenSignin] = useState(false);

const handleOpenSignin = () => {
  setOpenSignin(true);
};

const handleCloseSignin = () => {
  setOpenSignin(false);
};
  const swiperRef = React.useRef(null);
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productName}`
        );
        setProduct(response.data);
        const imageArray = Array.from(
          { length: 4 },
          (_, i) => `/images/${productName}${i + 1}.jpg`
        );
        setImages(imageArray);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!authState.loggedIn) {
      handleOpenSignin();;
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/addcart",
        { productId: product._id, quantity: 1, size: selectedSize },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return <Typography>Loading product details...</Typography>;
  }

  if (!product || images.length === 0) {
    return <Typography>Product not found or no images available.</Typography>;
  }

  return (
    <Box sx={{overflowX: 'hidden', display: "flex", flexDirection: "column", minHeight: "100vh" , filter: openSignin ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease-in-out'}}>
      <NavBar onOpenSignin={handleOpenSignin} openSignin={openSignin} />
      
      <Box sx={{ flexGrow: 1, mt: { xs: 8, sm: 10 } }}>
        {" "}
        {/* Adjust top margin based on navbar height */}
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} md={6}>
              <style>
                {`
    .swiper-pagination-bullet {
      background-color: #d21b14 !important;
    }
    .swiper-pagination-bullet-active {
      background-color: #d21b14 !important;
    }
  `}
              </style>
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                style={{ width: "100%", height: "400px" }}
                onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  // Apply custom styles to navigation buttons and pagination
                  if (swiper.navigation && swiper.navigation.nextEl) {
                    swiper.navigation.nextEl.style.color = "#d21b14";
                  }
                  if (swiper.navigation && swiper.navigation.prevEl) {
                    swiper.navigation.prevEl.style.color = "#d21b14";
                  }
                  if (swiper.pagination && swiper.pagination.bullets) {
                    swiper.pagination.bullets.forEach((bullet) => {
                      bullet.style.backgroundColor = "#d21b14";
                    });
                  }
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                style={{ marginTop: "10px" }}
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 400, fontFamily: "Afacad Flux" }}>{product.name}</Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 300 }}>
                Men's {product.name}
              </Typography>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
              <Box
                sx={{
                  borderTop: "1px solid rgba(0, 0, 0, 0.2)", // Light white line
                  //margin: '2rem 0', // Space above and below the line
                  width: "100%",
                  margin: "1rem auto",
                }}
              />
              <Typography
                variant="h5"
                color="black"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                ${product.price}
              </Typography>

              <Typography variant="body1" paragraph>
                Select Size:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                {["S", "M", "L", "XL"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    color={selectedSize === size ? "error" : "default"}
                    sx={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      minWidth: 0,
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Box>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleAddToCart(product)}
                sx={{ marginRight: "10px" }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleAddToCart(product)}
              >
                <FavoriteBorderIcon sx={{ marginRight: "10px" }} />
                Wishlist
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ mt: 10 }}/>
      <Footer />
      <Signin open={openSignin} onClose={handleCloseSignin} />
    </Box>
  );
};

export default ProductDetailPage;
