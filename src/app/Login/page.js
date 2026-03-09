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
    CircularProgress,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

/**
 * Note: We are using native window.location for navigation and fetch for API calls
 * to ensure compatibility with the preview environment while resolving dependency errors.
 */

export default function LoginForm() {
    const [isMounted, setIsMounted] = React.useState(false);
    const [userid, setUserid] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    // Fix for Hydration Error: Ensure component is mounted before rendering MUI Box
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const payload = {
                userid: userid,
                usrpassword: password,
            };

            // Using native fetch instead of axiosClient to resolve path alias issues in this environment
            const response = await fetch("http://103.79.34.50:3001/api/auth/userLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Login request failed");
            }

            const data = await response.json();
            const result = data?.result?.[0];

            if (result?.status) {
                // Save token and core user data
                localStorage.setItem("token", result.token);
                localStorage.setItem("user_id", result.userid);
                localStorage.setItem("user", JSON.stringify(result));

                const detectedType = result.loginusertypename || (result.role === 'department_pro' ? 'Department' : 'District');
                localStorage.setItem("loginusertypename", detectedType);
                localStorage.setItem("type", detectedType);

                if (detectedType === 'District' || result.role === 'district_pro') {
                    const distName = result.district_name || result.district_name_text_en || (result.assignedEntities ? result.assignedEntities[0] : '');
                    if (distName) localStorage.setItem('district', distName);
                    if (result.district_code) localStorage.setItem('district_code', result.district_code);
                }

                alert("Login successful");
                // Using window.location to resolve router compatibility issues in the preview
               // window.location.href = "/form";
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

    // Prevent Hydration error by not rendering until mounted
    if (!isMounted) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: 420,
                    p: 4,
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}
            >
                <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
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
                    variant="outlined"
                    margin="normal"
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    disabled={loading}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    sx={{ mb: 1 }}
                    InputProps={{
                        endAdornment: (
                            <IconButton edge="end" onClick={handleTogglePassword} disabled={loading}>
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
                    <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                        {error}
                    </Typography>
                )}

                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
            </Paper>
        </Box>
    );
}