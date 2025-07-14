import { Container, Box, Typography } from '@mui/material';
import { Construction, Analytics } from '@mui/icons-material';
import Form from './components/Form';
import Summary from './components/Summary';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            py: 3,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Construction sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Daily Construction Log
            </Typography>
            <Analytics sx={{ fontSize: 40, color: '#764ba2', ml: 2 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontWeight: 400,
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
            }}
          >
            AI-Powered Construction Report Assistant
          </Typography>
        </Box>

        <Form />
        <Summary />
      </Container>
    </Box>
  );
}

export default App;
