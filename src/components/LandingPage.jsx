import { Box, Typography, Container, Grid, Button } from "@mui/material";
import Mascot from "../assets/happy_tummy_mascot.webp";

const LandingPage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* First Section: Mascot and App Name */}
      <Box
        sx={{
          // backgroundImage: 'url("/path-to-your-background-image.jpg")', // replace with your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={Mascot}
            alt="App Mascot"
            style={{
              width: "400px",
              height: "auto",
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Happy Tummy
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Manage your tiffin with ease!
          </Typography>
        </Container>
      </Box>

      {/* Second Section: Problem We Solve */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          paddingY: "40px",
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
            How We Solve Your Tiffin Management Problem
          </Typography>
          <Grid container spacing={4}>
            {/* First Part: Centralizing Orders */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  For Managers
                </Typography>
                <Typography variant="body1">
                  We help managers centralize all tiffin orders in one place
                  with ease, reducing the manual effort of keeping track of
                  orders.
                </Typography>
              </Box>
            </Grid>

            {/* Second Part: Monthly Orders */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  For Employees
                </Typography>
                <Typography variant="body1">
                  Keep track of your monthly tiffin orders for hassle-free
                  payments. Say goodbye to the confusion of manual records.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Third Section: Built with Love */}
      <Box
        sx={{
          backgroundColor: "#e0f7fa",
          paddingY: "40px",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            Built with ❤️ by SSPL Fam for SSPL Fam
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "600px", margin: "auto" }}
          >
            We are here to take care of your needs, and all we need from you in
            return is your valuable feedback to help us improve this app for
            you!
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="#feedback"
            >
              Share Your Feedback
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
