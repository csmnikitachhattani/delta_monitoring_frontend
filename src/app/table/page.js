"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function DepartmentDailyEntry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3001/api/auth/department-daily-entry"
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Department Daily Entry
      </Typography>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        {loading ? (
          <Box
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Dept Id</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Entry Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Press</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Success</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Facebook</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Twitter</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Instagram</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow
                    key={row.Entry_Id}
                    hover
                    sx={{
                      "& td": {
                        borderBottom: "1px solid #e0e0e0",
                      },
                    }}
                  >
                    <TableCell>{row.Dept_Id}</TableCell>
                    <TableCell>{row.Department_Name}</TableCell>
                    <TableCell>
                      {row.Entry_Date
                        ? new Date(row.Entry_Date).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{row.Press_Releases}</TableCell>
                    <TableCell>{row.Success_Stories}</TableCell>
                    <TableCell>{row.Facebook_Posts}</TableCell>
                    <TableCell>{row.Twitter_X_Posts}</TableCell>
                    <TableCell>{row.Instagram_Posts}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
