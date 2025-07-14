import { useRef } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  PictureAsPdfRounded,
  SummarizeRounded,
  ErrorOutlineRounded,
  AutoAwesomeRounded,
} from '@mui/icons-material';
import { useGeminiCall } from '../context/GeminiContext';
import html2pdf from 'html2pdf.js';
import MarkdownParser from './MarkdownParser';

const Summary = () => {
  // Summary component to display the generated report
  // It includes a button to save the report as a PDF and a markdown parser to render
  const markdownRef = useRef<HTMLDivElement>(null);
  const { response, loading, error } = useGeminiCall();

  const handleSaveAsPDF = () => {
    if (!markdownRef.current) return;
    const date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
    const options = {
      margin: [8, 8, 8, 8] as [number, number, number, number],
      filename: `construction-report-${date}.pdf`,
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      },
    };

    html2pdf().set(options).from(markdownRef.current).save();
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
        minHeight: '200px',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 2, sm: 0 }}
        mb={3}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SummarizeRounded sx={{ color: '#667eea', mr: 1, fontSize: 28 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#333',
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
            }}
          >
            Generated Report
          </Typography>
        </Box>
        {!!response && (
          <Button
            variant="contained"
            startIcon={<PictureAsPdfRounded />}
            onClick={handleSaveAsPDF}
            size="large"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              background: 'linear-gradient(45deg, #ef4444, #dc2626)',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              minWidth: { xs: '100%', sm: 'auto' },
              '&:hover': {
                background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
                boxShadow: '0 6px 25px rgba(239, 68, 68, 0.5)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Save as PDF
          </Button>
        )}
      </Box>

      <Box>
        {!response && !loading && !error && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 3,
              borderRadius: 2,
              background:
                'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '2px dashed rgba(102, 126, 234, 0.3)',
            }}
          >
            <AutoAwesomeRounded
              sx={{ fontSize: 48, color: '#667eea', mb: 2 }}
            />
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Generate a daily construction report to view the summary here
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#999',
                mt: 1,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              Enter your construction activities above and click "Generate
              Report"
            </Typography>
          </Box>
        )}

        {loading && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 3,
              borderRadius: 2,
              background:
                'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            }}
          >
            <CircularProgress
              size={48}
              sx={{
                color: '#667eea',
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: '#667eea',
                fontWeight: 500,
                mb: 1,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Generating your construction report...
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#999',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              Please wait while AI analyzes your input
            </Typography>
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            icon={<ErrorOutlineRounded />}
            sx={{
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Error generating report
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {error}
            </Typography>
          </Alert>
        )}

        {!!response && <MarkdownParser response={response} ref={markdownRef} />}
      </Box>
    </Paper>
  );
};

export default Summary;
