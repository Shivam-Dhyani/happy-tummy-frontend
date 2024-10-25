import React, { useState } from "react";
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
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const DailyOrders = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [messagePreview, setMessagePreview] = useState("");

  // Mock Data for Daily/Monthly Orders
  const dailyOrders = [
    { name: "John Doe", tiffinType: "Full", vegetables: "Potato, Tomato" },
    { name: "Jane Smith", tiffinType: "Half", vegetables: "Spinach, Carrot" },
  ];

  const generateWhatsAppMessage = () => {
    const selectedOrders = dailyOrders;
    const message = selectedOrders
      .map(
        (order) =>
          `Name: ${order.name}, Tiffin: ${order.tiffinType}, Vegetables: ${order.vegetables}`
      )
      .join("\n");
    setMessagePreview(message);
    setOpenDialog(true);
  };

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(messagePreview);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box>
      {/* Order List */}
      <List>
        {dailyOrders.map((order, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={order.name}
                secondary={`Tiffin: ${order.tiffinType}, Vegetables: ${order.vegetables}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Button to Generate WhatsApp Message */}
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
        >
          Generate WhatsApp Message
        </Button>
      </Box>

      {/* WhatsApp Message Preview Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>WhatsApp Message Preview</DialogTitle>
        <DialogContent>
          <Typography>{messagePreview}</Typography>
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
