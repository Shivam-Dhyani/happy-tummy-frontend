import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ManagerSection from "./ManagerSection";
import LandingPage from "./LandingPage";
import EmployeeSection from "./EmployeeSection";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/thunks/allThunk";

const HappyTummyApp = () => {
  const [role, setRole] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const dispatch = useDispatch();
  const { employeesData, employeesDataStatus } = useSelector(
    (state) => state.all
  );

  // API Call for get Employees
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // Detect beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Handle PWA installation
  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("PWA installed");
      }
      setDeferredPrompt(null);
      setShowInstallModal(false);
    }
  };

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
      {employeesDataStatus === "loading" ? (
        <Box
          height={700}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mx={2}
        >
          <CircularProgress size={50} />
          <Typography variant="h6">
            It might take max. 2 mins to load the app
          </Typography>
        </Box>
      ) : (
        <>
          {/* Install PWA Modal */}
          <Dialog
            open={showInstallModal}
            onClose={() => setShowInstallModal(false)}
          >
            <DialogTitle>Install Happy Tummy</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Install this app on your device for a better experience.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowInstallModal(false)}>Later</Button>
              <Button onClick={handleInstallPWA} autoFocus>
                Install
              </Button>
            </DialogActions>
          </Dialog>

          {/* Header */}
          <AppBar position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
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
                  <MenuItem
                    onClick={() => handleRoleSelect("Employee")}
                    disabled={!employeesData?.length}
                  >
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
      )}
    </>
  );
};

export default HappyTummyApp;
