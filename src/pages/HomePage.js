import React from "react";
import { Container, Typography } from "@mui/material";
import Base from "../components/Base";

const HomePage = () => {
  return (
    <Base>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Please select any user and start conversation</Typography>
      </Container>
    </Base>
  );
};

export default HomePage;
