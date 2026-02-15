"use client";

import React, { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

const numberFieldProps = {
  type: "number",
  required: true,
  inputProps: { min: 0, max: 100 },
};

export default function DepartmentMetricsForm() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [today, setToday] = useState("");
  const [yesterdayDate, setYesterdayDate] = useState("");
  const type = localStorage.getItem("type");
  

  useEffect(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const yest = new Date();
    yest.setDate(now.getDate() - 1);
    const yestStr = yest.toISOString().split("T")[0];

    setToday(todayStr);
    setYesterdayDate(yestStr);
  }, []);

  // ✅ ADDED: form state
  const [formData, setFormData] = useState({
    entryDate: "",
    pressRelease: "",
    successStories: "",
    nationalStories: "",
    stateFundPost: "",
    twitterPosts: "",
    facebookPosts: "",
    instagramPosts: "",
    user_id: localStorage.getItem('user_id')
  });

  const getDepartmentsByUserId = async () => {
    const userId = localStorage.getItem("user_id");
    const type = localStorage.getItem("type")

    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axiosClient.get(
      `/auth/departments/${userId}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartmentsByUserId();
        setDepartments(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ ADDED: handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData)
  };

  const handleType = (type) => {


    if (type === "Department") {
      return true;
    } else {
      return false;
    }
  }

  // ✅ ADDED: submit POST API
  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId || !selectedDept) {
      alert("Please select department");
      return;
    }

    const payload = {
      user_id: userId,
      deptId: selectedDept,
      departmentName: 'सामान्य प्रशासन',
      ...formData,
    };

    try {
      await axiosClient.post(
        "/auth/district-daily-entry",
        payload
      );

      alert("Submitted successfully");

      // reset (optional but safe)
      setFormData({
        entryDate: "",
        pressRelease: "",
        successStories: "",
        nationalStories: "",
        stateFundPost: "",
        twitterPosts: "",
        facebookPosts: "",
        instagramPosts: "",
      });

      setSelectedDept("");
      router.push(`/`);
    } catch (error) {
      console.error(error);
      alert("Submission failed");
    }
  };

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
          {type} Activity Form
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: "#9e9e9e" }}
        >
          Enter monthly activity numbers (0–100)
        </Typography>

        {handleType(type) && (
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
                  {dept.dept_name} ({dept.Department_Name_English})
                </MenuItem>
              ))
            ) : (
                <MenuItem disabled>No departments available</MenuItem>
              )}
          </TextField>
        )}

        <TextField
          fullWidth
          label="Activity Date"
          type="date"
          margin="normal"
          required
          name="entryDate"
          value={formData.entryDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: yesterdayDate || undefined,
            max: today || undefined,
          }}
          sx={fieldStyle}
        />


        <TextField fullWidth label="Press Release" name="pressRelease" value={formData.pressRelease} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Success Stories" name="successStories" value={formData.successStories} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Stories Published Nationally" name="nationalStories" value={formData.nationalStories} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="State Fund Post" name="stateFundPost" value={formData.stateFundPost} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Twitter Posts" name="twitterPosts" value={formData.twitterPosts} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Facebook Posts" name="facebookPosts" value={formData.facebookPosts} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />
        <TextField fullWidth label="Instagram Posts" name="instagramPosts" value={formData.instagramPosts} onChange={handleChange} margin="normal" {...numberFieldProps} sx={fieldStyle} />

        <Button
          fullWidth
          size="large"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": { borderColor: "rgba(0,0,0,0.25)" },
    "&:hover fieldset": { borderColor: "#000" },
    "&.Mui-focused fieldset": { borderColor: "#000" },
  },
  "& label": { color: "#9e9e9e" },
};
