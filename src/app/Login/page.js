"use client";

import * as React from "react";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
    IconButton,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function LoginForm() {
    const [userid, setUserid] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            // ✅ Removed usertypecode - the backend is now smart enough to find it!
            const payload = {
                userid: userid,
                usrpassword: password,
            };

            // Replaced custom axiosClient with standard fetch to run seamlessly in the preview environment
            const res = await fetch("http://103.79.34.50:3001/api/auth/userLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            const result = data?.result?.[0];
            console.log("Login Result:", result);

            if (result?.status) {
                // ✅ Save token and core user data
                localStorage.setItem("token", result.token);
                localStorage.setItem("user_id", result.userid);
                localStorage.setItem("user", JSON.stringify(result));

                // Extract dynamic role/type from the backend response
                const detectedType = result.loginusertypename || (result.role === 'department_pro' ? 'Department' : 'District');
                localStorage.setItem("loginusertypename", detectedType);
                localStorage.setItem("type", detectedType);

                // Handle District specific storage if applicable
                if (detectedType === 'District' || result.role === 'district_pro') {
                    // Extract the district name (falls back to the assignedEntities array we built in the backend)
                    const distName = result.district_name || (result.assignedEntities && result.assignedEntities.length > 0 ? result.assignedEntities[0] : '');
                    if (distName) localStorage.setItem('district', distName);
                    if (result.district_code) localStorage.setItem('district_code', result.district_code);
                }

                alert("Login successful");
                // Replaced next/navigation useRouter with standard window.location to run in preview
                window.location.href = "/form";
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