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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function SignUpPage() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!name) {
      setError({ ...error, name: "Name is required" });
      return;
    }

    if (!email) {
      setError({ ...error, email: "Email is required" });
      return;
    }
    if (!password) {
      setError({ ...error, password: "Password is required" });
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_BASEURL}/user/signup`, {
        emailid: email,
        password: password,
        name: name,
      })
      .then((res) => {
        alert("sign up success!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          height: "90vh",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {!isXs && (
          <Grid item xs={12} sm={6} sx={{ backgroundColor: "gray" }}></Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ pl: 4, pr: 4, pt: 3 }}
          >
            <Typography variant="h6" fontWeight="600">
              ChatMe
            </Typography>
            <Typography variant="h5" fontWeight="700">
              Welcome to ChatMe
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
              Name
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              {...(error.name &&
                !name && {
                  error: true,
                  helperText: error.name,
                })}
            />

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
              {...(error.email &&
                !email && {
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
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
