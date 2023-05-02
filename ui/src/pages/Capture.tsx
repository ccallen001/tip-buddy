import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { CloseSharp } from '@mui/icons-material';
import './Capture.scss';

function Capture() {
  const navigate = useNavigate();

  return (
    <div className="Capture">
      <Box ml="auto" onClick={() => navigate('/')}>
        <CloseSharp />
      </Box>

      <h2>Capture</h2>
    </div>
  );
}

export default Capture;
