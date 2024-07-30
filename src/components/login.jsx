import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({
    User_Name: "",
    Password: "",
  });
  const [error, setError] = useState(null); // State for login error
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {

      const res = await login(input);
      
      setAuthUser(res);
      setError(null); 
      navigate("/ddd");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid credentials. Please check your username and password.");
      } else if (error.response && error.response.status === 401) {
        setError("Please confirm your email before logging in.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmitForm}  sx={{ mt: 1 }}>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={input.User_Name}
            onChange={(e) => setInput({ ...input, User_Name: e.target.value })}
            autoFocus
            error={error !== null} // Apply error styling if there's an error
          />
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
            autoComplete="current-password"
            error={error !== null} // Apply error styling if there's an error
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
