import { Typography, Box, List, ListItem } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type MarkdownParserProps = {
  response: string;
  ref: React.RefObject<HTMLDivElement | null>;
};

const MarkdownParser = ({ response, ref }: MarkdownParserProps) => {
  // MarkdownParser component to render markdown content
  // It uses ReactMarkdown to parse the markdown and Material-UI components for styling
  return (
    <Box
      ref={ref}
      className="page-break-avoid"
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(102, 126, 234, 0.1)',
        mt: 2,
        // CSS for PDF page breaks
        '& .page-break-avoid': {
          pageBreakInside: 'avoid !important',
          breakInside: 'avoid !important',
        },
        '& .page-break-before': {
          pageBreakBefore: 'always !important',
          breakBefore: 'page !important',
        },
        '& .page-break-after': {
          pageBreakAfter: 'always !important',
          breakAfter: 'page !important',
        },
        // Specific elements that should avoid breaking
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          pageBreakInside: 'avoid !important',
          pageBreakAfter: 'avoid !important',
          breakInside: 'avoid !important',
          breakAfter: 'avoid !important',
        },
        // Tables and lists should try to stay together
        '& table, & ul, & ol': {
          pageBreakInside: 'avoid !important',
          breakInside: 'avoid !important',
        },
        // Individual table rows and list items
        '& tr, & li': {
          pageBreakInside: 'avoid !important',
          breakInside: 'avoid !important',
        },
        // Code blocks and blockquotes
        '& pre, & blockquote': {
          pageBreakInside: 'avoid !important',
          breakInside: 'avoid !important',
        },
        // Better orphans and widows control
        orphans: 3,
        widows: 3,
      }}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <Typography
              variant="h4"
              className="page-break-avoid"
              sx={{
                mb: 3,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                borderBottom: '3px solid',
                borderImage: 'linear-gradient(45deg, #667eea, #764ba2) 1',
                pb: 1,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
              {...props}
            />
          ),
          h2: (props) => (
            <Typography
              variant="h5"
              className="page-break-avoid"
              sx={{
                mt: 4,
                mb: 2,
                color: '#667eea',
                fontWeight: 600,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
              {...props}
            />
          ),
          p: (props) => (
            <Typography
              variant="body1"
              sx={{
                // the title of the section
                mb: 2,
                lineHeight: 1.7,
                color: '#333',
                pl: 5,
              }}
              {...props}
            />
          ),
          ul: (props) => (
            <List
              className="page-break-avoid"
              sx={{
                listStyleType: 'none',
                pl: 0,
                mb: 2,
                mt: 1,
                ml: 4,
                '& .MuiListItem-root': {
                  pl: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  py: 0.5,
                  '&::before': {
                    content: '"•"',
                    color: '#667eea',
                    fontWeight: 'bold',
                    marginRight: '8px',
                    minWidth: '16px',
                  },
                },
              }}
            >
              {props.children}
            </List>
          ),
          ol: (props) => (
            <List
              component="ol"
              className="page-break-avoid"
              sx={{
                listStyleType: 'none',
                pl: 0,
                mb: 3,
                mt: 2,
                counterReset: 'list-counter',
                '& > .MuiListItem-root': {
                  pl: 0,
                  display: 'block',
                  mb: 2,
                  counterIncrement: 'list-counter',
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  },
                  '&::before': {
                    // the number of the section
                    content: 'counter(list-counter) "."',
                    fontWeight: 'bold',
                    color: '#667eea',
                    fontSize: '1.1em',
                    position: 'absolute',
                    left: '10px',
                    top: '16px',
                    minWidth: '32px',
                  },
                },
              }}
            >
              {props.children}
            </List>
          ),
          li: (props) => (
            <ListItem
              className="page-break-avoid"
              sx={{
                display: 'flex',
                py: 1.5,
                px: 2,
                alignItems: 'flex-start',
                width: '100%',
                'ol > &': {
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  display: 'block', // Allow the content to flow properly
                },
                'ul > &': {
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  py: 0.5,
                  px: 0,
                  display: 'flex',
                },
              }}
              {...props}
            />
          ),
          strong: (props) => (
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                color: '#667eea',
              }}
              {...props}
            />
          ),
          code: (props) => (
            <Typography
              component="code"
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '2px 6px',
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.9em',
                color: '#d32f2f',
              }}
              {...props}
            />
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownParser;
