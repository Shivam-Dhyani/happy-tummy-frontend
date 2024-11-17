import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
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
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useDispatch, useSelector } from "react-redux";
import { getTiffinsForDateRange } from "../redux/thunks/allThunk";
import {
  calculateEmployeeOrders,
  calculateTiffinCost,
  calculateTotalCost,
  countUniqueDates,
} from "../utils/tiffinConfig";
import { convertUTCDateToIST } from "../utils/dateConfig";

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

      {tiffinsDateInRangeDataStatus === "loading" ? (
        <Box
          height={400}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={50} />
        </Box>
      ) : tiffinsDateInRangeData.length > 0 ? (
        <>
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
          <Box
            sx={{
              maxHeight: "300px", // Adjust this height as per your UI needs
              overflowY: "auto", // Enable vertical scrolling
              border: "1px solid #ddd", // Optional: Add a border for better UI distinction
              borderRadius: "4px",
              padding: "8px",
            }}
          >
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
          </Box>
        </>
      ) : (
        <Typography color="textSecondary" textAlign="center">
          No Order Available for this month!
        </Typography>
      )}

      {/* Dialog for Detailed Orders */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Orders for {selectedEmployee?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee?.orderList?.map((order, index) => (
            <React.Fragment key={index}>
              <Typography>{`Date: ${convertUTCDateToIST(
                order?.date,
                "DD/MM/YYYY"
              )}`}</Typography>
              <Typography>{`Tiffin Type: ${_.capitalize(
                order?.tiffinType
              )}`}</Typography>
              <Typography>{`Vegetables: ${order?.vegetableId?.name}`}</Typography>
              <Typography>{`Cost: ₹${calculateTiffinCost(order)}`}</Typography>
              <Divider sx={{ my: 1 }} />
            </React.Fragment>
          ))}
          <Typography component="h1">{`Total Cost: ₹${selectedEmployee?.totalCost}`}</Typography>
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
      </Dialog> */}

      {/* Dialog for Detailed Orders */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Orders for {selectedEmployee?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee?.orderList?.map((order, index) => (
            <React.Fragment key={index}>
              <Typography>{`Date: ${convertUTCDateToIST(
                order?.date,
                "DD/MM/YYYY"
              )}`}</Typography>
              <Typography>{`Tiffin Type: ${_.capitalize(
                order?.tiffinType
              )}`}</Typography>
              <Typography>{`Vegetables: ${order?.vegetableId?.name}`}</Typography>
              <Typography>{`Cost: ₹${calculateTiffinCost(order)}`}</Typography>
              <Divider sx={{ my: 1 }} />
            </React.Fragment>
          ))}
        </DialogContent>
        <Box
          sx={{
            borderTop: "2px solid #ddd", // Optional: Add a border for separation
            borderBottom: "2px solid #ddd", // Optional: Add a border for separation
            padding: "4px", // Add padding for better visibility
            position: "sticky", // Stick to the bottom
            bottom: 0, // Ensure it's at the bottom
            backgroundColor: "white", // Keep it visually distinct
            zIndex: 1, // Ensure it stays above scrollable content
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Total Cost: ₹{selectedEmployee?.totalCost}
          </Typography>
        </Box>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={generateWhatsAppMessage}
            color="primary"
            variant="outlined"
            startIcon={<WhatsAppIcon />}
          >
            Send Payment Reminder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MonthlyOrders;
