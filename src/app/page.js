"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
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
  IconButton,
} from "@mui/material";

import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DepartmentDailyEntry() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const goToEdit = async (id) =>{
    router.push(`/form/${id}`);
  }

  const fetchData = async () => {
    const userId = localStorage.getItem("user_id");
    const type = localStorage.getItem("type");
  
    try {
      setLoading(true);
  
      let typeId;
  
      if (type === "Department") {
        typeId = 1;
      } else if (type === "District") {
        typeId = 2;
      } else {
        console.warn("Unknown type:", type);
        return;
      }
  
      const res = await axiosClient.get(
        `/auth/get-entries?user_id=${userId}&type_id=${typeId}`
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

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    // TODO: Navigate to edit page or open modal
  };

  const handleDelete = (row) => {
    console.log("Delete clicked:", row);
    // TODO: Show confirmation dialog
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Department Daily Entry
      </Typography>

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
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
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

                    <TableCell align="center">
                      <IconButton
                        onClick={() => goToEdit(row.Entry_Id)}
                        sx={{ color: "black" }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(row)}
                        sx={{ color: "black" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
