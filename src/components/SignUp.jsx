import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../hooks/use-auth";

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = React.useState(null); 
  const { register } = useAuth();
  const [formState, setFormState] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await register({
          User_Name: formState.username,
          Email_User: formState.email,
          Password: formState.password,
          confirmPassword: formState.confirmPassword,
          Department: formState.department,
        });

        setError("Registration successful");

        // Reset form state upon successful registration
        setFormState({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          department: "",
        });
        setFormErrors({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          department: "",
        });

      } catch (error) {
        console.error("Registration failed:", error);
        setError("Registration failed. Please try again.");
      }
    } else {
      console.error("Form validation failed.");
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
    };

    if (!formState.username.trim()) {
      errors.username = "Username is required";
      valid = false;
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!formState.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formState.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formState.confirmPassword !== formState.password) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formState.department.trim()) {
      errors.department = "Department is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: theme.spacing(3) }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={formState.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!formErrors.department}
                  helperText={formErrors.department}
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                  autoComplete="organization"
                  value={formState.department}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: theme.spacing(3), mb: theme.spacing(2) }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
