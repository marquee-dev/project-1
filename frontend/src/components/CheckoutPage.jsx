import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarWS from "./NavBarWS";
import Footer from "./Footer";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:4000/api/mycart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
        const total = response.data.reduce(
          (sum, item) => sum + item.productId.price,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:4000/api/orders/checkout",
        {
          shippingAddress,
          paymentDetails,
          cartItems,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully!");
      navigate("/order-summary");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Box
      sx={{
        overflowX: "hidden",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBarWS />
      <Container sx={{ mt: 15 }}>
        <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux" }} variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Shipping Address Card */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux",mb: 1 }} variant="h6">Shipping Address</Typography>
            <Card>
              <CardContent>
                <TextField
                  label="Address"
                  color="error"
                  fullWidth
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Details Card */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux",mb: 1 }} variant="h6">Payment Details</Typography>
            <Card>
              <CardContent>
                <TextField
                  label="Card Number"
                  color="error"
                  fullWidth
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: e.target.value,
                    })
                  }
                  sx={{mb: 1}}
                />
                <TextField
                  label="Expiry Date"
                  color="error"
                  fullWidth
                  value={paymentDetails.expiry}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiry: e.target.value,
                    })
                  }
                  sx={{mb: 1}}
                />
                <TextField
                  label="CVV"
                  color="error"
                  fullWidth
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                  
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary Card */}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux",mb: 1 }} variant="h6">Order Summary</Typography>
            <Card>
              <CardContent>
                <List>
                  {cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50, mr: 2 }}
                        image={`/images/${item.productId.name}.jpg`}
                        alt={item.productId.name}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 500 }} variant="body1">
                          {item.productId.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.size}
                        </Typography>
                        <Typography sx={{ fontWeight: 500 }} variant="body1">
                          {" "}
                          ${item.productId.price}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="h5"
                  style={{ marginTop: "20px", fontWeight: 700 , fontFamily: "Afacad Flux" }}
                >
                  Total Price: ${totalPrice}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Place Order Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCheckout}
              style={{ marginTop: "20px" }}
            >
              Pay ${totalPrice}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ mt: 10 }} />
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
