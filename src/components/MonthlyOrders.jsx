import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import moment from "moment-timezone";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useDispatch, useSelector } from "react-redux";
import { getTiffinsForDateRange } from "../redux/thunks/allThunk";
import {
  calculateEmployeeOrders,
  calculateTotalCost,
  countUniqueDates,
} from "../utils/tiffinConfig";

dayjs.extend(utc);

const MonthlyOrders = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messagePreview, setMessagePreview] = useState("");
  const [orderMonth, setOrderMonth] = useState(dayjs().subtract(1, "month"));

  const { tiffinsDateInRangeData, tiffinsDateInRangeDataStatus } = useSelector(
    (state) => state.all
  );

  console.log(
    "Tiffin Range Data::",
    tiffinsDateInRangeData,
    tiffinsDateInRangeDataStatus,
    calculateEmployeeOrders(tiffinsDateInRangeData)
  );

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

  useEffect(() => {
    const getTiffinsPayload = {
      start: orderMonth.startOf("month").utc().toISOString(),
      end: orderMonth.endOf("month").utc().toISOString(),
    };
    console.log("getTiffinsPayload::", getTiffinsPayload);
    dispatch(getTiffinsForDateRange(getTiffinsPayload));
  }, [orderMonth, dispatch]);

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
    <Box p={3} pt={1}>
      {/* Select Order Date */}
      <Box display="flex" justifyContent="center">
        <DatePicker
          sx={{ marginBottom: 2, width: "100%" }}
          views={["month", "year"]}
          label="Select Month"
          value={orderMonth}
          onChange={(newValue) => setOrderMonth(newValue)}
        />
      </Box>

      {/* Monthly Summary Card */}
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="h6">
            Summary:{" "}
            {tiffinsDateInRangeData?.[0] &&
              moment(tiffinsDateInRangeData?.[0]?.date)
                ?.tz("Asia/Kolkata")
                ?.format("MMMM YYYY")}
          </Typography>
          <Typography>
            Total Amount: {calculateTotalCost(tiffinsDateInRangeData)}
          </Typography>
          <Typography>
            Orders Placed on {countUniqueDates(tiffinsDateInRangeData)} Days
          </Typography>
          <Typography>
            Total Tiffins: {tiffinsDateInRangeData.length}
          </Typography>
        </CardContent>
      </Card>

      {/* Employee Orders List */}
      <List>
        {calculateEmployeeOrders(tiffinsDateInRangeData)?.map(
          (employee, index) => (
            <React.Fragment key={index}>
              <ListItem
                button="true"
                onClick={() => handleEmployeeClick(employee)}
              >
                <ListItemText
                  primary={employee?.name}
                  secondary={`Tiffins: ${employee?.totalOrders}, Total Price: ₹${employee?.totalCost}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        )}
      </List>

      {/* Dialog for Detailed Orders */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Orders for {selectedEmployee?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee?.orders?.map((order, index) => (
            <React.Fragment key={index}>
              <Typography>{`Date: ${order?.date}`}</Typography>
              <Typography>{`Tiffin: ${order?.tiffinType}`}</Typography>
              <Typography>{`Vegetables: ${order?.vegetables}`}</Typography>
              <Typography>{`Cost: ₹${order?.cost}`}</Typography>
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
