import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const ManageEmployees = () => {
  const [open, setOpen] = useState(false); // State to handle dialog open/close
  const [employeeName, setEmployeeName] = useState(""); // State to manage the employee name
  const [employees, setEmployees] = useState([]); // State to store list of employees

  // Function to open dialog
  const handleClickOpen = () => setOpen(true);

  // Function to close dialog
  const handleClose = () => {
    setOpen(false);
    setEmployeeName(""); // Clear input field after closing the dialog
  };

  // Function to handle employee addition
  const handleAddEmployee = () => {
    if (employeeName.trim()) {
      // Only add non-empty employee names
      setEmployees([...employees, employeeName]);
      setEmployeeName(""); // Clear input field after adding
      setOpen(false); // Close dialog
    }
  };

  return (
    <Box p={3}>
      {/* Top App Bar for "Manage Employees" Section */}
      {/* <AppBar position="static" color="primary" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Manage Employees
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClickOpen}
            aria-label="add employee"
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      {/* Employee List */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Employee List
          <IconButton
            edge="end"
            color="primary"
            onClick={handleClickOpen}
            aria-label="add employee"
          >
            <AddIcon />
          </IconButton>
        </Typography>
        {employees.length > 0 ? (
          <List>
            {employees.map((employee, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={employee} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No employees added yet.</Typography>
        )}
      </Box>

      {/* Dialog for adding employee */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Employee
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="employeeName"
            label="Employee Name"
            type="text"
            fullWidth
            variant="outlined"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)} // Handle input change
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddEmployee}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageEmployees;
