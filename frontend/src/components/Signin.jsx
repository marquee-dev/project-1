import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Card, CardContent, Dialog, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

const Signin = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up
  const [opacity, setOpacity] = useState(1); // State to control both image and form opacity
  const [imageSrc, setImageSrc] = useState("/images/signin.jpg"); // State to control current image src

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle transition when toggling between sign-in and sign-up
  const handleToggle = () => {
    setOpacity(0); // Fade out both form and image
    setTimeout(() => {
      setIsSignUp(!isSignUp); // Toggle between sign-in and sign-up after fade-out
      setImageSrc(isSignUp ? "/images/signin.jpg" : "/images/signup.jpg"); // Switch image source
      setOpacity(1); // Fade back in both form and image
    }, 300); // Adjust delay to ensure the fade-out completes before switching content
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: isSignUp ? Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required") : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const url = isSignUp ? 'http://localhost:4000/signup' : 'http://localhost:4000/signin';
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
        });
        const data = await response.json();
        if (response.ok) {
          login(data.token);
          localStorage.setItem('token', data.token);
          onClose(); // Close the modal after successful sign-in or sign-up
          navigate('/');
        } else {
          console.log("Error", data.message);
        }
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        alert('Error submitting form');
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: 16, // Ensure the dialog itself has rounded corners
          overflow: "hidden", // Prevent content from spilling out
        },
      }}
    >
      <Card
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 4, // Curved corners for the card
          overflow: "hidden", // Ensure image stays within the curved corners
          transition: "transform 0.5s ease", // Smooth transitions
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              position: "relative",
              overflow: "hidden", // Ensure the image respects the borderRadius
              opacity: opacity, // Use the shared opacity state for both image and form
              transition: "opacity 0.5s ease-in-out", // Smooth opacity transition
            }}
          >
            <img
              src={imageSrc}
              alt={isSignUp ? "Sign Up" : "Sign In"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "inherit", // Ensure image follows parent's rounded corners
                transition: "opacity 0.5s ease-in-out", // Smooth image transition
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent sx={{ alignItems: "center", pt: 8 }}>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                  mt: 3,
                  opacity: opacity, // Use the shared opacity state for form elements
                  transition: "opacity 0.5s ease-in-out", // Smooth form transition
                }}
              >
                {isSignUp && (
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                    variant="outlined"
                  />
                )}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>

                {!isSignUp && (
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    sx={{ mt: 2, mb: 2 }}
                    startIcon={<GoogleIcon />}
                  >
                    Sign in with Google
                  </Button>
                )}

                <Button
                  variant="text"
                  fullWidth
                  color="error"
                  onClick={handleToggle}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
};

export default Signin;
