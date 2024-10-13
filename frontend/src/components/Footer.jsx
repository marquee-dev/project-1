import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook'; // Import Facebook icon
import TwitterIcon from '@mui/icons-material/Twitter'; // Import Twitter icon
import InstagramIcon from '@mui/icons-material/Instagram'; // Import Instagram icon

const Footer = () => {
  return (
    <Box
      sx={{
        
        mt: 'auto',
        backgroundColor: '#b00020',
        color: '#fff',
        padding: '2rem 0',
        width: '100vw',
        position: 'relative',
        left: 0,
        right: 0,
      }}
    >
      <Grid container spacing={4} sx={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux", fontSize: "1.6rem" }} variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: "1.2rem" }} variant="body2">
            We are a leading online retailer offering the best deals on top quality products.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux", fontSize: "1.6rem" }} variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: "1.2rem" }} href="/contact" color="inherit" underline="hover">
            Contact Us
          </Link>
          <br />
          <Link sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: "1.2rem" }} href="/faq" color="inherit" underline="hover">
            FAQ
          </Link>
          <br />
          <Link sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: "1.2rem" }} href="/privacy-policy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontWeight: 500, fontFamily: "Afacad Flux", fontSize: "1.6rem" }} variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Typography sx={{ fontWeight: 400, fontFamily: "Afacad Flux", fontSize: "1.2rem" }} variant="body2">
            Stay connected through our social media channels.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '0.5rem' }}>
            <Link href="https://facebook.com" target="_blank" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
              <FacebookIcon  />
              
            </Link>
            <Link href="https://twitter.com" target="_blank" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
              <TwitterIcon  />
              
            </Link>
            <Link href="https://instagram.com" target="_blank" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
              <InstagramIcon sx={{ marginRight: '20rem' }} />
              
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Line Separator */}
      <Box 
        sx={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.5)', // Light white line
          margin: '2rem 0', // Space above and below the line
          width: '60%',
          margin: '1.6rem auto',
        }} 
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 400, fontFamily: "Pacifico", display: { xs: "none", sm: "block", marginTop: '10px', color: "#ffffff" } }}
        >
          UrbanThreads
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
