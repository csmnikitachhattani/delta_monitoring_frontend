"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const numberFieldProps = {
  type: "number",
  required: true,
  inputProps: { min: 0, max: 100 },
};

export default function DepartmentMetricsForm() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  
const getDepartmentsByUserId = async () => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  const response = await axios.get(
    `http://localhost:3001/api/auth/departments/${userId}`
  );
  console.log(response)
  return response.data;
};

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await getDepartmentsByUserId();
      console.log("useEffect", res.data)
      setDepartments(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("hkbjbghjg")
    }
  };

  fetchDepartments();
}, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontFamily: "'Inter','Roboto',sans-serif",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 520,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 600, color: "#000", mb: 0.5 }}
        >
          Department Activity Form
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: "#9e9e9e" }}
        >
          Enter monthly activity numbers (0–100)
        </Typography>

        <TextField
      select
      fullWidth
      label="Department"
      margin="normal"
      required
      value={selectedDept}
      onChange={(e) => setSelectedDept(e.target.value)}
    >
      {Array.isArray(departments) && departments.length > 0 ? (
  departments.map((dept) => (
    <MenuItem key={dept.dept_id} value={dept.dept_id}>
      {dept.dept_name}
    </MenuItem>
  ))
) : (
  <MenuItem disabled>No departments available</MenuItem>
)}
    </TextField>

        <TextField fullWidth label="Press Release" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Success Stories" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Stories Published Nationally" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="State Fund Post" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Twitter Posts" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Facebook Posts" margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Instagram Posts" margin="normal" {...numberFieldProps} sx={fieldStyle} />

        <Button
          fullWidth
          size="large"
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}

const fieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': { borderColor: 'rgba(0,0,0,0.25)' },
    '&:hover fieldset': { borderColor: '#000' },
    '&.Mui-focused fieldset': { borderColor: '#000' },
  },
  '& label': { color: '#9e9e9e' },
};
