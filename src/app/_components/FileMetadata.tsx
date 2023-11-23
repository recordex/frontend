// components/ListItem.js
import { appColors } from '@/themes/main';
import { Box, Typography, Chip } from '@mui/material';

type ListItemProps = {
  name: string;
  timestamp: Date;
};

const FileMetadata = ({ name, timestamp }: ListItemProps) => {
  const date = `${timestamp.getFullYear()}年${timestamp.getMonth()}月${timestamp.getDate()}日`;

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderLeft: `5px solid ${appColors.primaryAccent}`,
        borderRadius: '5px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
      }}
    >
      <Box>
        <Typography variant='body1' gutterBottom>
          {name}
        </Typography>
      </Box>
      <Chip label={date} />
    </Box>
  );
};

export default FileMetadata;
