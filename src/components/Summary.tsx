import { useRef } from 'react';
import { Box, Button } from '@mui/material';
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
    const options = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: 'report.pdf',
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
    <Box sx={{ marginTop: '1.7rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Summary</h2>
        {!!response && (
          <Button variant="contained" color="error" onClick={handleSaveAsPDF}>
            Save as PDF
          </Button>
        )}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        {!response &&
          !loading &&
          !error &&
          'Generate a daily report to view the summary here.'}
        {loading && <p>Generating your report, please wait...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!!response && <MarkdownParser response={response} ref={markdownRef} />}
      </Box>
    </Box>
  );
};

export default Summary;
