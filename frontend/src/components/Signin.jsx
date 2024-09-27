import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const { login } = useAuth();
    const navigate=useNavigate()
  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try{
        const response=await fetch('http://localhost:4000/signin',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:values.name, password:values.password }),
        })
        const data = await response.json();
        if(response.ok)
        {
            login(data.token)
            localStorage.setItem('token', data.token);
            navigate('/')
        }
        else{
            console.log("error")
        }

      }
      catch(error){
        console.error('There was an error submitting the form!', error);
        alert('Error submitting form');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          {/* Name Field */}
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Triggers validation on blur
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
            variant="outlined"
          />

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button>SignUp</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
