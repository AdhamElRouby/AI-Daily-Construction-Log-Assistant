import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { SendRounded, EditNoteRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useGeminiCall } from '../context/GeminiContext';
import WeatherToggle from './WeatherToggle';

const Form = () => {
  // Form component to handle user input and trigger Gemini API calls
  // It includes a text field for user messages, a button to submit the message,
  const [message, setMessage] = useState<string>('');
  const { handleGeminiCall, loading } = useGeminiCall();

  const handleClick = async () => {
    await handleGeminiCall(message);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <EditNoteRounded sx={{ color: '#667eea', mr: 1, fontSize: 28 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: { xs: '1.3rem', sm: '1.5rem' },
          }}
        >
          Construction Log Input
        </Typography>
      </Box>

      <form>
        <TextField
          label="Describe your construction activities, progress, and observations"
          multiline
          rows={6}
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.8)',
              '&:hover fieldset': {
                borderColor: '#667eea',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root': {
              color: '#666',
              '&.Mui-focused': {
                color: '#667eea',
              },
            },
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 2, sm: 0 }}
        >
          <WeatherToggle />
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={!message.trim() || loading}
            size="large"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendRounded />
              )
            }
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: loading
                ? 'rgba(102, 126, 234, 0.6)'
                : 'linear-gradient(45deg, #667eea, #764ba2)',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              minWidth: { xs: '100%', sm: 'auto' },
              '&:hover': {
                background: loading
                  ? 'rgba(102, 126, 234, 0.6)'
                  : 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: 'rgba(102, 126, 234, 0.3)',
                color: 'rgba(255, 255, 255, 0.7)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
