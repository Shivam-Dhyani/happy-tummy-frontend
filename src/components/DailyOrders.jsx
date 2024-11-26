import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getTiffinsForDate } from "../redux/thunks/allThunk";
import { convertUTCDateToIST } from "../utils/dateConfig";
import { handleSendMessage } from "../utils/whatsappConfig";

const DailyOrders = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDate, setOrderDate] = useState(dayjs().add(1, "day"));
  const [messagePreview, setMessagePreview] = useState("");

  const { tiffinsDateData, tiffinsDateDataStatus } = useSelector(
    (state) => state.all
  );

  const generateWhatsAppMessage = () => {
    // Get the order date from the first tiffin data
    const orderDateUTC = tiffinsDateData[0]?.date;
    if (!orderDateUTC) return;

    // Convert orderDate from UTC to IST using moment
    const orderDateIST = convertUTCDateToIST(orderDateUTC, "DD MMM, YYYY");

    // Group by tiffin type and vegetable
    const groupedOrders = _.groupBy(tiffinsDateData, "tiffinType");
    const orderTypes = ["full", "half", "only-veggie"];

    const messageSections = orderTypes
      .map((type) => {
        const orders = groupedOrders[type] || [];
        if (orders.length === 0) return "";

        // Map count of each vegetable
        const vegetableCounts = _.countBy(
          orders,
          (order) => order.vegetableId.name
        );
        const vegetableLines = Object.entries(vegetableCounts)
          .map(([name, count]) => `${name} (${count})`)
          .join("\n    ");

        const header =
          type === "full"
            ? "Full Tiffins"
            : type === "half"
            ? "Half Tiffins"
            : "Only-Veggie Tiffins";
        return `*${header}*\n    ${vegetableLines}`;
      })
      .filter(Boolean) // Remove any empty sections
      .join("\n\n"); // Separate each section with two new lines

    // Add order date at the beginning of the message
    const finalMessage = `Order Date: ${orderDateIST}\n\n${messageSections}`;

    setMessagePreview(finalMessage);
    setOpenDialog(true);
  };

  useEffect(() => {
    const dateWithZeroTime = dayjs(orderDate)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const getTiffinsPayload = {
      start: dateWithZeroTime.toISOString(),
    };
    dispatch(getTiffinsForDate(getTiffinsPayload));
  }, [orderDate, dispatch]);

  return (
    <Box>
      {/* Select Order Date */}
      <Box display="flex" justifyContent="center">
        <DatePicker
          format="DD/MM/YYYY"
          sx={{ margin: 2, width: "90%" }}
          label="Select Order Date"
          value={orderDate}
          onChange={(newValue) => setOrderDate(newValue)}
        />
      </Box>

      {/* Order List */}
      {tiffinsDateDataStatus === "loading" ? (
        <Box
          height={400}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={50} />
        </Box>
      ) : tiffinsDateData.length ? (
        <Box
          sx={{
            maxHeight: "38vh", // Adjust this height as per your UI needs
            overflowY: "auto", // Enable vertical scrolling
            border: "1px solid #ddd", // Optional: Add a border for better UI distinction
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <List>
            {tiffinsDateData?.map((order, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={order?.employeeId?.name}
                    secondary={`Tiffin: ${_.capitalize(
                      order?.tiffinType
                    )} | Vegetable: ${order?.vegetableId?.name}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      ) : (
        <Typography color="textSecondary" textAlign="center">
          No Order Available for this date!
        </Typography>
      )}

      {/* Button to Generate WhatsApp Message */}
      {tiffinsDateData?.length && tiffinsDateDataStatus === "success" ? (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<WhatsAppIcon />}
            onClick={generateWhatsAppMessage}
            disabled={!tiffinsDateData?.length}
          >
            Generate WhatsApp Message
          </Button>
        </Box>
      ) : (
        ""
      )}

      {/* WhatsApp Message Preview Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle bgcolor="#F0F0F0">WhatsApp Message Preview</DialogTitle>
        <DialogContent dividers>
          <Typography component="pre">{messagePreview}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSendMessage(messagePreview)}
            color="primary"
            variant="outlined"
            startIcon={<WhatsAppIcon />}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyOrders;
