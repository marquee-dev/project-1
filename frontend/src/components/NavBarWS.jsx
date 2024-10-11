import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAuth } from "./AuthContext"; // Custom hook for authentication

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9fafa", // Custom primary color
    },
    secondary: {
      main: "#ffe9f2", // Custom secondary color
    },
    background: {
      default: "#f4f4f4", // Background color for the app
    },
  },
});

// Styling for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#f4f4f4",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "500px", // Adjust width to accommodate the dropdown
  height: "40px", // Adjust height
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "600px", // Adjust width on larger screens
  },
  display: "flex", // Flexbox layout for aligning the input and icon
  alignItems: "center",
}));

// Styled Input component as before
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,  // Make input take up the rest of the space
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),  // Padding inside the input
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBar = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth(); // Custom authentication hook

  const [category, setCategory] = useState("All Categories"); // State for selected category

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    logout(); // Logs the user out
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Search:", category);
    // Implement search functionality
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ paddingLeft: "100px", paddingRight: "100px", boxShadow: "none", height: '80px' }}
      >
        <Toolbar sx={{ height: '100%' }}>
          {/* Site Logo */}
          <Button
            onClick={() => navigate("/")} // Navigate to homepage
            sx={{
              textTransform: "none", // Prevents capitalization
              fontFamily: "Pacifico", // Keep the Pacifico font
              fontWeight: 400,
              color: "#d83832",
             
              fontSize: "1.25rem", // Adjust as needed
              "&:hover": {
                backgroundColor: "transparent", // Prevent background color on hover
                 
              },
            }}
          >
            UrbanThreads
          </Button>

          

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Button */}
          <IconButton color="inherit" onClick={handleCart}>
            <ShoppingCartIcon />
          </IconButton>

          {/* Login / Logout Button */}
          {!authState.loggedIn ? (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button color="inherit" sx={{ color: "#d83832" }} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
