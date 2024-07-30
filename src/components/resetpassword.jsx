import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from "../hooks/use-auth";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [input, setInput] = useState({
    Password: "",
    ConfirmPassword: "",
  });

  const { token } = useParams(); // Retrieve token from URL params
  const { resetpassword } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (input.Password !== input.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Call Resetpassword function with token and new password
      await resetpassword(token, {
        Password: input.Password,
      });

      // Password reset successful, can redirect or show success message
      alert("Password reset successful");
      // Example: history.push('/login');
    } catch (error) {
      console.error('Failed to reset password:', error);
      alert(`Failed to reset password: ${error.message}`);
      // Handle error as needed, show error message to user
      if (error.response && error.response.status === 401) {
        alert("Invalid or expired password reset link. Please request a new one.");
      } else {
        alert("Failed to reset password. Please try again later.");
      }
    }
  };

  if (!token) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Invalid password reset link
          </Typography>
          <Typography variant="body2">
            The password reset link is invalid or expired. Please request a new one.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Password
        </Typography>
        <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={input.Password}
            onChange={(e) => setInput({ ...input, Password: e.target.value })}
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="ConfirmPassword"
            label="Confirm Password"
            type="password"
            id="ConfirmPassword"
            value={input.ConfirmPassword}
            onChange={(e) => setInput({ ...input, ConfirmPassword: e.target.value })}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Commit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

