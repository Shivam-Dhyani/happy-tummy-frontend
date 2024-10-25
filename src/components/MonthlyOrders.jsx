import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const MonthlyOrders = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messagePreview, setMessagePreview] = useState("");

  // Mock Data
  const monthlySummary = {
    month: "October",
    totalAmount: 15000,
    totalTiffins: 300,
    totalDays: 20,
  };

  const employeeOrders = [
    {
      name: "John Doe",
      totalTiffins: 30,
      totalPrice: 1500,
      orders: [
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-03",
          tiffinType: "Half",
          vegetables: "Spinach",
          cost: 30,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Potato, Tomato",
          cost: 50,
        },
      ],
    },
    {
      name: "Jane Smith",
      totalTiffins: 25,
      totalPrice: 1250,
      orders: [
        {
          date: "2024-10-01",
          tiffinType: "Full",
          vegetables: "Carrot, Peas",
          cost: 60,
        },
        {
          date: "2024-10-05",
          tiffinType: "Half",
          vegetables: "Broccoli",
          cost: 40,
        },
      ],
    },
  ];

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const generateWhatsAppMessage = () => {
    if (selectedEmployee) {
      const message = selectedEmployee.orders
        .map(
          (order) =>
            `Date: ${order.date}, Tiffin: ${order.tiffinType}, Vegetables: ${order.vegetables}, Cost: ₹${order.cost}`
        )
        .join("\n");
      setMessagePreview(message);
      const encodedMessage = encodeURIComponent(
        `Payment Details for ${selectedEmployee.name}:\n\n${message}`
      );
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <Box p={3}>
      {/* Monthly Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{monthlySummary.month} Summary</Typography>
          <Typography>Total Amount: ₹{monthlySummary.totalAmount}</Typography>
          <Typography>Total Tiffins: {monthlySummary.totalTiffins}</Typography>
          <Typography>
            Orders Placed on {monthlySummary.totalDays} Days
          </Typography>
        </CardContent>
      </Card>

      {/* Employee Orders List */}
      <List>
        {employeeOrders.map((employee, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleEmployeeClick(employee)}>
              <ListItemText
                primary={employee.name}
                secondary={`Tiffins: ${employee.totalTiffins}, Total Price: ₹${employee.totalPrice}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Dialog for Detailed Orders */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Orders for {selectedEmployee?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee?.orders.map((order, index) => (
            <React.Fragment key={index}>
              <Typography>{`Date: ${order.date}`}</Typography>
              <Typography>{`Tiffin: ${order.tiffinType}`}</Typography>
              <Typography>{`Vegetables: ${order.vegetables}`}</Typography>
              <Typography>{`Cost: ₹${order.cost}`}</Typography>
              <Divider sx={{ my: 1 }} />
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
          <Button
            onClick={generateWhatsAppMessage}
            color="primary"
            startIcon={<WhatsAppIcon />}
          >
            Send Payment Reminder via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MonthlyOrders;
