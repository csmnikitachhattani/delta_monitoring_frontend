"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import DepartmentTable from "@/components/departmentTable"
import DistrictTable from "@/components/districtTable"
import DeleteModal from "@/components/DeleteModal"
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

  const [type, setType] = useState('');
  const [district , setDistrict] = useState('');
  
  useEffect(() => {
    const storedType = localStorage.getItem("type");
    const storedDistrict = localStorage.getItem("district")
    setType(storedType);
    if(storedType === 'District'){
      setDistrict(storedDistrict)
    }
  }, []);
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
       
  const handleType = (type) => {


    if (type === "Department") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box sx={{ p: 3 }}>
    {handleType(type) ? (
     
      <DepartmentTable />
    ) : (
      <DistrictTable />
    )}
    <DeleteModal />
  </Box>
  
  );
}
