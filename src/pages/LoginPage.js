import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  getLocalStorage,
  setLocalStorage,
} from "../constants/LocalStorageData";

export default function LoginPage() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!email) {
      setError({ ...error, email: "Email is required" });
      return;
    }
    if (!password) {
      setError({ ...error, password: "Password is required" });
      return;
    }
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASEURL}/user/signin`, {
        emailid: email,
        password: password,
      })
      .then((res) => {
        setLocalStorage("user", res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        alert("Signin success!");
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [loading]);
  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid
        container
        spacing={0}
        sx={{ height: "80vh", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
      >
        {!isXs && (
          <Grid item xs={12} sm={6} sx={{ backgroundColor: "gray" }}></Grid>
        )}
        <Grid item xs={12} sm={6} height={"80vh"}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: "auto", p: 4 }}
          >
            <Typography variant="h6" fontWeight="600">
              ChatMe
            </Typography>
            <Typography variant="h5" fontWeight="700">
              Welcome to ChatMe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We'll sign you in or create an account if you don't have one yet.
            </Typography>
            {/* 
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "black",
                borderColor: "grey.300",
                "&:hover": { borderColor: "grey.400" },
                height: "40px",
              }}
              onClick={() =>
                (window.location.href = `${TALENTINO_BACKEND_URL}/login/auth/google`)
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  src={GoogleIcon}
                  alt="Google"
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                Continue with Google
              </Box>
            </Button> */}
            {/* 
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "black",
                borderColor: "grey.300",
                "&:hover": { borderColor: "grey.400" },
                height: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  src={LinkedInIcon}
                  alt="LinkedIn"
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                Sign in with LinkedIn
              </Box>
            </Button> */}
            <Typography
              variant="body2"
              color="text.secondary"
              alignSelf="flex-start"
            >
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your company email"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.400",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                    borderWidth: "1px",
                  },
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...(error.email && {
                error: true,
                helperText: error.email,
              })}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              alignSelf="flex-start"
            >
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your company email"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.400",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                    borderWidth: "1px",
                  },
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...(error.password &&
                !password && {
                  error: true,
                  helperText: error.password,
                })}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                background:
                  "linear-gradient(45deg, #07BDFB 0%, #1C6CF8 34.1%, #5F44F9 65.6%, #9028F8 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #07BDFB 0%, #1C6CF8 34.1%, #5F44F9 65.6%, #9028F8 100%)",
                },
                textTransform: "none",
              }}
              type="submit"
              onClick={handleContinue}
            >
              Continue
            </Button>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
