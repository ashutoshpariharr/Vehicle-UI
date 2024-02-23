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

function Dashbord() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("clicked");

    // Send data to the database.
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log(response);

      if (response.ok) {
        alert(`Your Message Sent Successfully!!`);
        setUser({
          username: "",
          email: "",
          message: "",
        });

        navigate("/vendor");
      } else {
        // toast.error("Faild To Send Message..")
        console.log("Error while post");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <center>
        <h1>Dashboard</h1>
      </center>
      <form method="POST">
        <Container sx={{ padding: "40px" }} component={Paper}>
          <Typography variant="h5" gutterBottom>
            Enter Vehicle Details
          </Typography>

          <Typography variant="body1">Upload Vehicle Photo</Typography>
          <Box marginTop={3} gap={2} display="flex">
            <TextField
              fullWidth
              // label="Incorporation Certificate"
              type="file"
              // onChange={(e) => setImg(e.target.files[0])}
              // InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box mt={5} textAlign={"center"}>
            <Box gap={3} display="flex" marginBottom={5}>
              <TextField
                label="Enter Vehicale Number"
                fullWidth
                required
                type="text"
                name="username"
                autoComplete="off"
                className="user-input"
                id="username"
                value={user.username}
                onChange={handleInput}
              />
            </Box>
            <Box marginTop={3} gap={2} display="flex">
              <TextField
                fullWidth
                required
                label="Enter Delivery Challan Number"
                type="text"
                name="email"
                autoComplete="off"
                id="email"
                className="user-input"
                value={user.email}
                onChange={handleInput}
              />
            </Box>
            <Box marginTop={3} gap={2} display="flex">
              <TextField
                fullWidth
                required
                label="Enter Purchase Order Number"
                name="message"
                id="contact-message"
                className="user-input"
                value={user.message}
                onChange={handleInput}
              />
            </Box>
          </Box>
          <Box
            marginTop={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" onClick={handleSubmit} type="submit">
              Submit
            </Button>
          </Box>
        </Container>
      </form>
    </div>
  );
}

export default Dashbord;
