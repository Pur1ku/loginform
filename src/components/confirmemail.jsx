import React, { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function ConfirmEmail() {
  const { token } = useParams();
  const { confirmEmail } = useAuth();

  useEffect(() => {
    const confirm = async () => {
      try {
        await confirmEmail(token);
        // Handle successful confirmation if needed
      } catch (error) {
        console.error("Error confirming email:", error);
        // Handle error in confirmation
      }
    };

    confirm();
  }, [confirmEmail, token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Email Confirmed Successfully
      </Typography>
      <Typography variant="body1">
        Thank you for confirming your email.
      </Typography>
    </Box>
  );
}
