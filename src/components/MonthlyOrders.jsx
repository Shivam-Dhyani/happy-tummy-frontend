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
import { handleSendMessage } from "../utils/whatsappConfig";
dayjs.extend(utc);

const MonthlyOrders = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [orderMonth, setOrderMonth] = useState(dayjs().subtract(1, "month"));

  const { tiffinsDateInRangeData, tiffinsDateInRangeDataStatus } = useSelector(
    (state) => state.all
  );

  useEffect(() => {
    const getTiffinsPayload = {
      start: orderMonth.startOf("month").utc().toISOString(),
      end: orderMonth.endOf("month").utc().toISOString(),
    };
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
      // Symbols for box drawing
      // const topBorder = `┌────────────────────────┐\n`;
      // const bottomBorder = `└────────────────────────┘\n`;

      const topBorder = `────────────────────\n`;
      const bottomBorder = `────────────────────\n`;

      // Summary section with  top & bottom borders
      const summaryMessage =
        `${topBorder}` +
        `   *Tiffin Summary for ${selectedEmployee.name}*\n\n` +
        `   *Month: ${
          tiffinsDateInRangeData?.[0] &&
          moment(tiffinsDateInRangeData?.[0]?.date)
            ?.tz("Asia/Kolkata")
            ?.format("MMMM YYYY")
        }*\n\n` +
        `   *Total Cost: ₹${selectedEmployee.totalCost}*\n\n` +
        `   *Total Tiffin Ordered: ${selectedEmployee.orderList.length}*\n` +
        `${bottomBorder}\n\n` +
        `*Order List:* \n\n`;

      // Orders list in normal font
      const ordersMessage = selectedEmployee.orderList
        .map(
          (order, index) =>
            `Order ${index + 1}:\n` +
            `- Date: ${convertUTCDateToIST(order?.date, "DD/MM/YYYY")}\n` +
            `- Tiffin Type: ${_.capitalize(order?.tiffinType)}\n` +
            `- Vegetables: ${order?.vegetableId?.name}\n` +
            `- Cost: ₹${calculateTiffinCost(order)}\n`
        )
        .join("\n");

      // Combine summary and orders
      const fullMessage = summaryMessage + ordersMessage;

      handleSendMessage(fullMessage);
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
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle bgcolor="#F0F0F0">
          Orders for {selectedEmployee?.name}
        </DialogTitle>
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
            borderTop: "2px solid #ddd", // Optional: Add a border top for separation
            borderBottom: "2px solid #ddd", // Optional: Add a border bottom for separation
            padding: "4px", // Add padding for better visibility
            position: "sticky", // Stick to the bottom
            bottom: 0, // Ensure it's at the bottom
            zIndex: 1, // Ensure it stays above scrollable content
            backgroundColor: "#F0F0F0",
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
