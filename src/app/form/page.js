"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "@/lib/axiosClient";
import {
    Box, Button, TextField, Typography, Paper, MenuItem, Divider,
    CircularProgress, IconButton, Alert, AlertTitle, Dialog,
    DialogTitle, DialogContent, DialogActions, styled
} from "@mui/material";
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        "& fieldset": { borderColor: "#e5e7eb" },
        "&.Mui-focused fieldset": { borderColor: "#111827", borderWidth: "2px" },
    },
});

export default function DepartmentMetricsForm() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    const [dateLimits, setDateLimits] = useState({ min: "", max: "" });
    const [countdown, setCountdown] = useState("");
    const [isMondayGracePeriod, setIsMondayGracePeriod] = useState(false);

    const [type, setType] = useState("");
    const [district, setDistrict] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState("");

    const [formData, setFormData] = useState({
        entryDate: "",
        pressRelease: "",
        successStories: "",
        nationalStories: "",
        stateFrontPost: "",
        twitterPosts: "",
        facebookPosts: "",
        instagramPosts: "",
    });

    const updateStatus = useCallback(() => {
        const now = new Date();
        const nowIST = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        const todayStr = nowIST.toISOString().split("T")[0];

        const day = nowIST.getUTCDay();
        const hours = nowIST.getUTCHours();

        // Monday 4 PM Cutoff
        if (day === 1 && hours < 16) {
            setIsMondayGracePeriod(true);
            setCountdown(`${15 - hours}h ${59 - nowIST.getUTCMinutes()}m`);
        } else {
            setIsMondayGracePeriod(false);
        }

        // Calculate Monday of the allowed week
        let start = new Date(nowIST);
        const diffToMonday = (day === 0 ? 6 : day - 1);
        start.setDate(nowIST.getDate() - diffToMonday);
        if (day === 1 && hours < 16) start.setDate(start.getDate() - 7);

        // Calculate Sunday of that same week
        const sundayOfAllowedWeek = new Date(start);
        sundayOfAllowedWeek.setDate(start.getDate() + 6);
        const sundayStr = sundayOfAllowedWeek.toISOString().split("T")[0];

        // PREVENT FUTURE DATES: Max is either the Sunday of that week OR today
        const finalMaxDate = sundayStr > todayStr ? todayStr : sundayStr;

        setDateLimits({
            min: start.toISOString().split("T")[0],
            max: finalMaxDate
        });
    }, []);

    useEffect(() => {
        setIsMounted(true);
        updateStatus();
        setType(localStorage.getItem("type") || "");
        setDistrict(localStorage.getItem("district") || "");
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            const entities = (user.assignedEntities || []).map(e =>
                typeof e === 'string' ? e : (e.Department_name_english || "Unknown")
            );
            setDepartments(entities);
            if (entities.length === 1) setSelectedDept(entities[0]);
        }
    }, [updateStatus]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "http://192.168.10.176:3000/Login"; // Use hard redirect for clean logout
    };

    const handlePreSubmit = () => {
        const isInvalid = Object.values(formData).some(val => val === "") || (type === "Department" && !selectedDept);
        if (isInvalid) return alert("All fields are mandatory.");
        setOpenReview(true);
    };

    const handleFinalSubmit = async () => {
        setOpenReview(false);
        setLoading(true);

        const payload = {
            user_id: localStorage.getItem("user_id"),
            Entry_Date: formData.entryDate,
            // We send the department name to the "Department_Name" field
            Department_Name: type === "Department" ? selectedDept : "District Office",
            District_Name: district,
            Press_Releases: Number(formData.pressRelease) || 0,
            Success_Stories: Number(formData.successStories) || 0,
            National_Stories: Number(formData.nationalStories) || 0,
            State_Front_Post: Number(formData.stateFrontPost) || 0,
            Twitter_X_Posts: Number(formData.twitterPosts) || 0,
            Facebook_Posts: Number(formData.facebookPosts) || 0,
            Instagram_Posts: Number(formData.instagramPosts) || 0,
        };

        try {
            // ROUTING LOGIC:
            // Even though the route says 'district-daily-entry', 
            // your backend has it linked to 'insertDepartmentDailyEntry'
            const endpoint = type === "Department"
                ? "/auth/district-daily-entry"
                : "/auth/district-entry";

            const response = await axiosClient.post(endpoint, payload);

            if (response.status === 200 || response.status === 201) {
                setSubmitted(true);
            }
        } catch (e) {
            console.error("Submission Error:", e.response?.data);
            alert(`Error: ${e.response?.data?.message || "Check API Connection"}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) return null;

    if (submitted) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f3f4f6" }}>
                <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 6, width: 420 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
                    <Typography variant="h4" fontWeight={800} gutterBottom>Success!</Typography>
                    <Button fullWidth variant="contained" size="large" sx={{ py: 2, borderRadius: 3, bgcolor: '#111827' }}
                        onClick={() => { setFormData({ entryDate: "", pressRelease: "", successStories: "", nationalStories: "", stateFrontPost: "", twitterPosts: "", facebookPosts: "", instagramPosts: "" }); setSubmitted(false); }}>
                        Submit Another Entry
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f3f4f6", p: 2 }}>
            <Paper elevation={0} sx={{ width: 550, p: 4, borderRadius: 6, position: 'relative', border: "1px solid #e5e7eb" }}>

                {/* FIXED LOGOUT BUTTON */}
                <IconButton
                    onClick={handleLogout}
                    sx={{ position: 'absolute', top: 20, right: 20, color: '#9ca3af', "&:hover": { color: '#ef4444', bgcolor: '#fee2e2' } }}
                >
                    <LogoutIcon />
                </IconButton>

                <Typography variant="h5" align="center" fontWeight={900} color="#111827">
                    {type === "District" ? `${district} District` : "Daily Department"} Entry
                </Typography>

                {isMondayGracePeriod && (
                    <Alert severity="warning" icon={<TimerIcon />} sx={{ mt: 3, borderRadius: 3 }}>
                        <AlertTitle sx={{ fontWeight: 700 }}>Deadline Approaching</AlertTitle>
                        Reporting window closes in <strong>{countdown}</strong>
                    </Alert>
                )}

                <Divider sx={{ my: 4 }} />

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {type === "Department" && (
                        <StyledTextField select fullWidth label="Department" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                            {departments.map((d, i) => <MenuItem key={i} value={d}>{d}</MenuItem>)}
                        </StyledTextField>
                    )}

                    <StyledTextField
                        fullWidth
                        label="Entry Date"
                        type="date"
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: dateLimits.min, max: dateLimits.max }}
                        value={formData.entryDate}
                        onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                        helperText="Future dates and closed weeks are disabled"
                    />

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        {Object.keys(formData).filter(k => k !== 'entryDate').map((key) => (
                            <StyledTextField key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} type="number" value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} />
                        ))}
                    </Box>

                    <Button fullWidth size="large" variant="contained" disabled={loading} onClick={handlePreSubmit} sx={{ mt: 2, py: 2, bgcolor: "#111827", fontWeight: 800, borderRadius: 3 }}>
                        {loading ? <CircularProgress size={26} color="white" /> : "Review & Submit"}
                    </Button>
                </Box>
            </Paper>

            {/* REVIEW MODAL */}
            <Dialog open={openReview} onClose={() => setOpenReview(false)} PaperProps={{ sx: { borderRadius: 4, width: '100%', maxWidth: '400px' } }}>
                <DialogTitle sx={{ fontWeight: 800 }}>Confirm Details</DialogTitle>
                <DialogContent>
                    <Box sx={{ bgcolor: '#f9fafb', p: 2, borderRadius: 2 }}>
                        {Object.entries(formData).map(([key, val]) => (
                            <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                                <Typography variant="caption" fontWeight={600} color="#64748b">{key.toUpperCase()}</Typography>
                                <Typography variant="body2" fontWeight={700}>{val || '0'}</Typography>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenReview(false)}>Edit</Button>
                    <Button onClick={handleFinalSubmit} variant="contained" sx={{ bgcolor: '#111827' }}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}