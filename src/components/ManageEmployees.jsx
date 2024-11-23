import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../redux/thunks/allThunk";

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const { employeesData, employeesDataStatus, addEmployeeDataStatus } =
    useSelector((state) => state.all);
  const [open, setOpen] = useState(false); // State to handle dialog open/close
  const [employeeName, setEmployeeName] = useState(""); // State to manage the employee name

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
      const addEmployeePayload = { name: employeeName.trim() };
      dispatch(addEmployee(addEmployeePayload));
    }
  };

  useEffect(() => {
    if (addEmployeeDataStatus === "success") {
      setEmployeeName(""); // Clear input field after adding
      setOpen(false); // Close dialog
    }
  }, [addEmployeeDataStatus]);

  return (
    <Box p={3}>
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
            disabled={employeesDataStatus === "loading"}
          >
            <AddIcon />
          </IconButton>
        </Typography>

        {employeesDataStatus === "loading" ? (
          <Box
            height={400}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={50} />
          </Box>
        ) : employeesData.length > 0 ? (
          <List
            sx={{
              height: "65vh", // Adjust this height as per your UI needs
              overflowY: "auto", // Enable vertical scrolling
              border: "1px solid #ddd", // Optional: Add a border for better UI distinction
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            {employeesData.map((employee, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={employee?.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No employees added yet.</Typography>
        )}
      </Box>

      {/* Dialog for adding employee */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle bgcolor="#F0F0F0">Add Employee</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="employeeName"
            label="Employee Name"
            type="text"
            fullWidth
            variant="outlined"
            disabled={addEmployeeDataStatus === "loading"}
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)} // Handle input change
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleAddEmployee}
            color="primary"
            variant="contained"
            disabled={
              !employeeName.trim() || addEmployeeDataStatus === "loading"
            }
          >
            {addEmployeeDataStatus === "loading" && (
              <Box mr={1} display="flex" justifyContent="center">
                <CircularProgress color="secondary" size={20} />
              </Box>
            )}
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageEmployees;
