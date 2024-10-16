import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Register = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toastShownRef = useRef(false); 

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check for the token
    if (token && !toastShownRef.current) {
      toast.error("You are already logged in!"); 
      toastShownRef.current = true;// Display toast for already logged in user
      navigate("/");
    }
  }, [navigate]);

  // Register controller
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        // "http://localhost:5000/api/v1/auth/register",
        "https://tool-e.onrender.com/api/v1/auth/register",
        { username, email, password }
      );
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        // Handle specific error messages from the server
        if (err.response.data.error.includes("Email is already registered")) {
          toast.error("This email is already registered."); // Display toast for already registered email
        } else {
          setError(err.response.data.error);
        }
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="text-bg-dark h-100">
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
      >
        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" color="white">Sign Up</Typography>
          <TextField
            label="Username"
            required
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Change label color to white
            }}
            sx={{
              '& .MuiInputBase-root': {
                color: 'white', // Change input text color to white
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color to white
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'lightgray', // Change border color on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color when focused
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            required
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Change label color to white
            }}
            sx={{
              '& .MuiInputBase-root': {
                color: 'white', // Change input text color to white
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color to white
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'lightgray', // Change border color on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color when focused
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            required
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Change label color to white
            }}
            sx={{
              '& .MuiInputBase-root': {
                color: 'white', // Change input text color to white
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color to white
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'lightgray', // Change border color on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change border color when focused
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ color: "white", mt: 2 }}
          >
            Sign Up
          </Button>
          <Typography mt={2} color="white">
            Already have an account? <Link to="/login"> Login</Link>
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default Register;
