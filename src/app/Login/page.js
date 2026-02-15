"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  IconButton,
  MenuItem,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function LoginForm() {
  const router = useRouter();
  const [userid, setUserid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const payload = {
        userid: userid,
        usrpassword: password,
        //usertypecode: '01',
        usertypecode: userType,
      };

      const res = await axiosClient.post(
        "/auth/userLogin",
        payload
      );

      const result = res.data?.result?.[0];
      console.log(result)
      if (result?.status) {
        // ✅ Save token
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_id", result.userid);
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("loginusertypename",result.loginusertypename)
        if(userType === '01'){
        localStorage.setItem("type", 'Department')
        }
        else if(userType === '03'){
          localStorage.setItem("type", 'District')
          }
        router.push(`/form`);
        alert("Login successful");
        // router.push("/dashboard") → if using next/navigation
      } else {
        setError(result?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600}>
          Login
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 0.5, mb: 3, color: "#9e9e9e" }}
        >
          Hi, welcome back 👋
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <TextField
          fullWidth
          label="User Id"
          margin="normal"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />

<TextField
  fullWidth
  type={showPassword ? "text" : "password"}
  label="Password"
  margin="normal"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  InputProps={{
    endAdornment: (
      <IconButton edge="end" onClick={handleTogglePassword}>
        {showPassword ? (
          <VisibilityOffOutlinedIcon fontSize="small" />
        ) : (
          <VisibilityOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    ),
  }}
/>

        <TextField
          select
          fullWidth
          label="User Type"
          margin="normal"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <MenuItem value="01">Department</MenuItem>
          <MenuItem value="03">District</MenuItem>
        </TextField>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          size="large"
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}
