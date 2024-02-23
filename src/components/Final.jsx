import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Final() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleCheckOut = () => {
    console.log("Checking out...");
    setOpenDialog(false);

    // Remove token from local storage
    localStorage.removeItem("token");

    // Navigate to the login page
    navigate("/login");
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <center>
        <h1>Quality Check And Approval</h1>
      </center>

      <Container sx={{padding: '5rem'}}>
        <Typography sx={{
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             margin: "0 auto",
        }}>
         This is the final Component and processed to checkout as well as logout.
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            marginTop: "2rem",
          }}
        >
          Check Out
        </Button>
      </Container>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Check Out</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to proceed with the check out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCheckOut} variant="contained">
            Check Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Final;
