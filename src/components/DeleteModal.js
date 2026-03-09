"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { closeDeleteModal,  deleteItem } from "@/store/modules/deleteSlice";

export default function DeleteModal({
  onConfirm,
  title = "Delete Entry",
  description = "Are you sure you want to delete this entry? This action cannot be undone.",
  loading = false,
}) {

  const dispatch = useDispatch();

  // get modal state from redux
  const open = useSelector((state) => state.delete.open);
  const itemId = useSelector((state) => state.delete.itemId);
  const type = useSelector((state) => state.delete.type);

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  // const handleConfirm = () => {
  //   if (onConfirm) {
  //     onConfirm(itemId);
  //   }
  //   dispatch(closeDeleteModal());
  // };
  const handleConfirm = () => {
    dispatch(
      deleteItem({
        id: itemId,
        type: type
      })
    );
    dispatch(closeDeleteModal());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberRoundedIcon sx={{ color: "#dc2626" }} />
          <Typography fontWeight={700}>{title}</Typography>
        </Box>

        <IconButton onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          color="error"
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}