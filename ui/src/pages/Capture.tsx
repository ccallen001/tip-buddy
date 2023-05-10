import { useNavigate } from 'react-router-dom';
import { ImageLike, createWorker } from 'tesseract.js';
import { CloseSharp } from '@mui/icons-material';
import './Capture.scss';
import { SyntheticEvent, useState } from 'react';

function Capture() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [recognizedDigits, setRecognizedDigits] = useState<
    RegExpMatchArray | []
  >([]);

  async function handleImageChange({ target }: SyntheticEvent) {
    const worker = await createWorker({
      logger: (m) => {
        console.log(m);
        setProgress(m.progress * 100);
      }
    });

    const image = (target as HTMLInputElement).files?.[0];

    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text }
    } = await worker.recognize(image as ImageLike);
    setProgress(100);

    const digits = text.match(/[+-]?([0-9]*[.])?[0-9]+/g);

    console.log(digits);
    setRecognizedDigits(digits || recognizedDigits);
    await worker.terminate();
  }

  return (
    <div className="Capture">
      <CloseSharp
        style={{ marginLeft: 'auto' }}
        onClick={() => navigate('/')}
      />

      <h2 style={{ marginBottom: 16 }}>Capture</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <meter
        min="0"
        max="100"
        value={progress}
        style={{ margin: '16px 0', width: '100%' }}
      />

      <div>
        {recognizedDigits.map((digitGroup, i) => (
          <pre key={i}>{digitGroup}</pre>
        ))}
      </div>
    </div>
  );
}

export default Capture;
