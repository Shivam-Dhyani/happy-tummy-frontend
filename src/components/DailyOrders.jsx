import React, { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment-timezone";
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
import { getTiffins } from "../redux/thunks/allThunk";

const DailyOrders = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDate, setOrderDate] = useState(dayjs().add(1, "day"));
  const [messagePreview, setMessagePreview] = useState("");

  const { tiffinsData, tiffinsDataStatus } = useSelector((state) => state.all);

  console.log("tiffinsData::", tiffinsData, tiffinsDataStatus);

  // Mock Data for Daily/Monthly Orders
  const dailyOrders = [
    { name: "John Doe", tiffinType: "Full", vegetables: "Potato, Tomato" },
    { name: "Jane Smith", tiffinType: "Half", vegetables: "Spinach, Carrot" },
  ];

  // const generateWhatsAppMessage = () => {
  //   const selectedOrders = dailyOrders;
  //   const message = selectedOrders
  //     .map(
  //       (order) =>
  //         `Name: ${order.name}, Tiffin: ${order.tiffinType}, Vegetables: ${order.vegetables}`
  //     )
  //     .join("\n");
  //   setMessagePreview(message);
  //   setOpenDialog(true);
  // };

  // const generateWhatsAppMessage = () => {
  //   // Group by tiffin type and vegetable name
  //   const groupedOrders = _.groupBy(tiffinsData, "tiffinType");
  //   let message = "";

  //   Object.keys(groupedOrders).forEach((tiffinType) => {
  //     const tiffins = groupedOrders[tiffinType];

  //     // Count occurrences of each vegetable for this tiffin type
  //     const vegetableCounts = _.countBy(
  //       tiffins,
  //       (tiffin) => tiffin.vegetableId.name
  //     );

  //     message += `${_.capitalize(tiffinType)} Tiffins\n`;

  //     Object.entries(vegetableCounts).forEach(([vegetable, count], index) => {
  //       message += `  ${index + 1}. ${vegetable} (${count})\n`;
  //     });

  //     message += "\n";
  //   });

  //   setMessagePreview(message.trim());
  //   setOpenDialog(true);
  // };

  // const generateWhatsAppMessage = () => {
  //   // Group by tiffin type and vegetable
  //   const groupedOrders = _.groupBy(tiffinsData, "tiffinType");
  //   const orderTypes = ["full", "half", "only-veggie"];
  //   const messageSections = orderTypes
  //     .map((type) => {
  //       const orders = groupedOrders[type] || [];
  //       if (orders.length === 0) return "";

  //       // Map count of each vegetable
  //       const vegetableCounts = _.countBy(
  //         orders,
  //         (order) => order.vegetableId.name
  //       );
  //       const vegetableLines = Object.entries(vegetableCounts)
  //         .map(([name, count]) => `${name} (${count})`)
  //         .join("\n    ");

  //       const header =
  //         type === "full"
  //           ? "Full Tiffins"
  //           : type === "half"
  //           ? "Half Tiffins"
  //           : "Only-Veggie Tiffins";
  //       return `*${header}*\n    ${vegetableLines}`;
  //     })
  //     .filter(Boolean) // Remove any empty sections
  //     .join("\n\n"); // Separate each section with two new lines

  //   setMessagePreview(messageSections);
  //   setOpenDialog(true);
  // };

  const generateWhatsAppMessage = () => {
    // Get the order date from the first tiffin data
    const orderDateUTC = tiffinsData[0]?.date;
    if (!orderDateUTC) return;

    // Convert orderDate from UTC to IST using moment
    const orderDateIST = moment(orderDateUTC)
      ?.tz("Asia/Kolkata")
      ?.format("DD MMM, YYYY");

    // Group by tiffin type and vegetable
    const groupedOrders = _.groupBy(tiffinsData, "tiffinType");
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

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(messagePreview);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
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
    console.log("getTiffinsPayload::", getTiffinsPayload);
    dispatch(getTiffins(getTiffinsPayload));
  }, [orderDate, dispatch]);

  return (
    <Box>
      {/* Select Order Date */}
      <Box display="flex" justifyContent="center">
        <DatePicker
          sx={{ margin: 2, width: "90%" }}
          label="Select Order Date"
          value={orderDate}
          onChange={(newValue) => setOrderDate(newValue)}
          // renderInput={(params) => <TextField {...params} />}
        />
      </Box>

      {/* Order List */}
      {tiffinsDataStatus === "loading" ? (
        <Box
          height={400}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={50} />
        </Box>
      ) : tiffinsData.length > 0 ? (
        <List>
          {tiffinsData?.map((order, index) => (
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
      ) : (
        <Typography color="textSecondary">
          No Order Selected for this date!
        </Typography>
      )}

      {/* Button to Generate WhatsApp Message */}
      {tiffinsData?.length ? (
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
            disabled={!tiffinsData?.length}
          >
            Generate WhatsApp Message
          </Button>
        </Box>
      ) : (
        ""
      )}

      {/* WhatsApp Message Preview Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>WhatsApp Message Preview</DialogTitle>
        <DialogContent>
          <Typography component="pre">{messagePreview}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            color="primary"
            startIcon={<WhatsAppIcon />}
          >
            Send via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyOrders;
