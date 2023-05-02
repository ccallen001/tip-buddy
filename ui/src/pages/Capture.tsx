import { useNavigate } from 'react-router-dom';
import { CloseSharp } from '@mui/icons-material';
import './Capture.scss';

function Capture() {
  const navigate = useNavigate();

  return (
    <div className="Capture">
      <CloseSharp
        style={{ marginLeft: 'auto' }}
        onClick={() => navigate('/')}
      />

      <h2>Capture</h2>
    </div>
  );
}

export default Capture;
