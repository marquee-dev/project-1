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
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Signin from "./Signin";
import Signup from "./Signup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffe9f2",
    },
    background: {
      default: "#f4f4f4",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#f4f4f4",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "500px",
  height: "40px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "600px",
  },
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = ({ onOpenSignin, openSignin }) => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  const [category, setCategory] = useState("All Categories");

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogin = () => {
    onOpenSignin();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Search:", category);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          paddingLeft: "100px",
          paddingRight: "100px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          height: "80px",
          filter: openSignin ? "blur(8px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 400, fontFamily: "Pacifico", display: { xs: "none", sm: "block", marginRight: 150, color: "#d83832" } }}
          >
            UrbanThreads
          </Typography> */}
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

          <Box sx={{ marginRight: '150px' }} />

          <Search sx={{}}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              sx={{
                
                marginRight: 2,
                height: "40px",
                border: "none",
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Home and Living">Home and Living</MenuItem>
            </Select>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                marginLeft: 1,
                height: "40px",
                borderRadius: "20px",
                boxShadow: "none",
                backgroundColor: "#d21b14",
                "&:hover": {
                  backgroundColor: "#c41a12",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSearch}
            >
              <SearchIcon sx={{ color: "white" }} />
            </Button>
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleCart}>
            <ShoppingCartIcon />
          </IconButton>

          {!authState.loggedIn ? (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ color: "#d83832" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
