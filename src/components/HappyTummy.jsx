import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ManagerSection from "./ManagerSection";
import LandingPage from "./LandingPage";
import EmployeeSection from "./EmployeeSection";

const HappyTummyApp = () => {
  const [role, setRole] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle menu open/close
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    handleClose();
  };

  return (
    <>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => window.location.reload()}
          >
            {role ? `Happy Tummy (${role})` : `Happy Tummy`}
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleRoleSelect("Manager")}>
                Manager
              </MenuItem>
              <MenuItem onClick={() => handleRoleSelect("Employee")}>
                Employee
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Show Landing Page when no option is Selected */}
      {role === "" && <LandingPage />}

      {/* Show Manager Section if Manager is Selected */}
      {role === "Manager" && <ManagerSection />}

      {/* Show Employee Section if Employee is Selected */}
      {role === "Employee" && <EmployeeSection />}
    </>
  );
};

export default HappyTummyApp;
