import { Container, Box } from '@mui/material';
import Form from './components/Form';
import Summary from './components/Summary';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Header />
        <Form />
        <Summary />
      </Container>
      <ToastContainer />
    </Box>
  );
}

export default App;
