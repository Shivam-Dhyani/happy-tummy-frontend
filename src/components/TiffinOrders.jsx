import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import MonthlyOrders from "./MonthlyOrders";
import DailyOrders from "./DailyOrders";

const TiffinOrders = () => {
  const [orderType, setOrderType] = useState("daily");

  const handleOrderTypeChange = (event, newOrderType) => {
    if (newOrderType !== null) {
      setOrderType(newOrderType);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6">Tiffin Orders</Typography>

      {/* Order Type Toggle (Daily/Monthly) */}
      <ToggleButtonGroup
        color="primary"
        value={orderType}
        exclusive
        onChange={handleOrderTypeChange}
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToggleButton value="daily">Daily Orders</ToggleButton>
        <ToggleButton value="monthly">Monthly Orders</ToggleButton>
      </ToggleButtonGroup>

      {orderType === "daily" && <DailyOrders />}

      {orderType === "monthly" && <MonthlyOrders />}
    </Box>
  );
};

export default TiffinOrders;
