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
      sx={{
        p: 3,
        maxWidth: '100%',
        backgroundColor: '#fafafa',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                color: '#1976d2',
                fontWeight: 600,
                borderBottom: '2px solid #e3f2fd',
                pb: 1,
              }}
              {...props}
            />
          ),
          h2: (props) => (
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                mb: 2,
                color: '#424242',
                fontWeight: 500,
              }}
              {...props}
            />
          ),
          p: (props) => (
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                lineHeight: 1.7,
                color: '#333',
              }}
              {...props}
            />
          ),
          ul: (props) => (
            <List
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
                    color: '#1976d2',
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
                    content: 'counter(list-counter) "."',
                    fontWeight: 'bold',
                    color: '#1976d2',
                    fontSize: '1.1em',
                    position: 'absolute',
                    left: '8px',
                    top: '12px',
                    minWidth: '32px',
                  },
                  '& > *:first-child': {
                    marginLeft: '48px',
                  },
                },
              }}
            >
              {props.children}
            </List>
          ),
          li: (props) => (
            <ListItem
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
                color: '#1976d2',
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
