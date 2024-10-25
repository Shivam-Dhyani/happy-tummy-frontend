import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TiffinOrders from "./TiffinOrders";
import ManageEmployees from "./ManageEmployees";
import AddMenu from "./AddMenu";

const ManagerSection = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Main Content Section */}
      <Box sx={{ flex: 1, paddingBottom: "64px" }}>
        {/* Today's Menu Tab */}
        {tabIndex === 0 && <AddMenu />}

        {/* Tiffin Orders Tab */}
        {tabIndex === 1 && <TiffinOrders />}

        {/* Manage Employees Tab */}
        {tabIndex === 2 && <ManageEmployees />}
      </Box>

      {/* Bottom Navigation Tabs */}
      <BottomNavigation
        value={tabIndex}
        onChange={handleTabChange}
        showLabels
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "64px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <BottomNavigationAction
          label="Add Menu"
          icon={<RestaurantMenuIcon />}
        />
        <BottomNavigationAction
          label="Tiffin Orders"
          icon={<AssignmentIcon />}
        />
        <BottomNavigationAction
          label="Manage Employee"
          icon={<PersonAddIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default ManagerSection;
