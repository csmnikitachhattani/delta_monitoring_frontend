"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HeaderLayout() {
  const router = useRouter();

  const handleCreateEntry = () => {
    router.push("/create-entry"); // change route if needed
  };

  const handleLogout = () => {
    localStorage.clear(); // optional
    router.push("/login"); // redirect after logout
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left side title */}
        <Typography variant="h6" component="div">
          Dashboard
        </Typography>

        {/* Right side buttons */}
        <Box>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ mr: 2, borderColor: "white" }}
            onClick={handleCreateEntry}
          >
            Create Entry
          </Button>

          <Button
            color="inherit"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
