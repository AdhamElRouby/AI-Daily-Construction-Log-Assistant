import { Box, Button, TextField } from '@mui/material';
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
    <form>
      <TextField
        label="Your message"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ margin: '0.7rem 0' }}
      >
        <WeatherToggle />
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={!message.trim()}
          loading={loading}
        >
          Generate Report
        </Button>
      </Box>
      <hr />
    </form>
  );
};

export default Form;
