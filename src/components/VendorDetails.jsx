import { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function VendorDetails() {
  const [adminContact, setAdminContact] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const adminContactData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setAdminContact(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error while fetching data from the Admin Contact: ${error}`);
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Your Data Deleted Successfully!");
      } else {
        console.log("Bad Request From Server");
      }

      const data = await res.json();
      console.log(data);

      adminContactData();
    } catch (error) {
      console.log(`Error deleting contact: ${error}`);
    }
  };

  useEffect(() => {
    adminContactData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ pt: 4 }}>
       Display Vendor Details
      </Typography>

      {loading ? (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            py: 4,
          }}
        >
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Container>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{border: '2px solid #bfe3bc', backgroundColor: '#d0d4cf'}}>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Vendor Company Name</TableCell>
                <TableCell>P.O Number</TableCell>
                <TableCell>Product List with Quantity</TableCell>
                <TableCell>CRUD opration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminContact.map((information, index) => (
                <TableRow key={index} sx={{border: '2px solid green'}}>
                  <TableCell sx={{border: '2px solid #bfe3bc'}}>{information.username}</TableCell>
                  <TableCell sx={{border: '2px solid #bfe3bc'}}>{information.email}</TableCell>
                  <TableCell sx={{border: '2px solid #bfe3bc'}}>{information.message}</TableCell>
                  <TableCell sx={{border: '2px solid #bfe3bc'}}>
                    {Math.floor(Math.random() * 2) + 1}
                    <span> Quantity</span>
                  </TableCell>
                  <TableCell sx={{border: '2px solid #bfe3bc'}}>
                    <Button  onClick={() => deleteMessage(information._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Link to='/final' >
        <Button variant="contained">
          Next
        </Button> 
        </Link>
      </Box>
    </Container>
  );
}

export default VendorDetails;
