import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const history = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", res_data.token);

        setUser({
          email: "",
          password: "",
        });
        onLogin();
        history("/"); // Navigate to home page
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <center>
        <h1> LogIn</h1>
      </center>

      <form method="POST">
        <Container sx={{ padding: "100px", width: "50%" }} component={Paper}>
          <Box sx={{
            marginTop: '-3rem',
            padding: '8px',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          <Typography variant="h5" gutterBottom>
          Vehicle Management System with MERN Stack
          </Typography>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          <Box gap={3}>
            <TextField
              required
              className="res-input"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              label="Enter Your Email"
              fullWidth
            />
          </Box>

          <Box mt={2}>
            <TextField
              required
              className="res-input"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              label="Enter Your Password"
              fullWidth
            />
          </Box>
          <Box marginTop={4}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
          <Typography
           sx={{ padding: "10px" }}
           >
          Team Sumadhura Infracon Private Limited.
          </Typography>
        </Container>
      </form>
    </div>
  );
}

export default Login;
