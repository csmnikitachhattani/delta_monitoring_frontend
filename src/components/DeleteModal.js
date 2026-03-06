'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  title = 'Delete Entry',
  description = 'Are you sure you want to delete this entry? This action cannot be undone.',
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          pt: 2.5,
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              background: 'rgba(220,38,38,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 20, color: '#dc2626' }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              color: '#0f1623',
              letterSpacing: '0.01em',
            }}
          >
            {title}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          disabled={loading}
          size="small"
          sx={{
            color: '#9aa0b4',
            '&:hover': { color: '#4b5672', background: '#eef0f4' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent sx={{ px: 3, py: 1.5 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#4b5672',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      {/* ── Actions ── */}
      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            borderColor: '#dde0e8',
            color: '#4b5672',
            '&:hover': {
              borderColor: '#c4c9d8',
              background: '#f5f6f8',
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
          sx={{
            flex: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            background: '#dc2626',
            boxShadow: 'none',
            '&:hover': {
              background: '#b91c1c',
              boxShadow: '0 4px 12px rgba(220,38,38,0.25)',
            },
            '&:active': {
              background: '#991b1b',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              background: '#fca5a5',
              color: '#fff',
            },
          }}
        >
          {loading ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}