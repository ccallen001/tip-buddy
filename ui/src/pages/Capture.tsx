import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorker } from 'tesseract.js';
import { CloseSharp } from '@mui/icons-material';
import './Capture.scss';

function Capture() {
  const navigate = useNavigate();

  const [captured, setCaptured] = useState('');

  const video = useRef<HTMLVideoElement>(null);
  const videoCurr = video.current;
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasCurr = canvas.current;

  let worker: Tesseract.Worker;

  useEffect(() => {
    (async () => {
      console.log(videoCurr, canvasCurr);

      if (videoCurr && canvasCurr) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        videoCurr.srcObject = stream;

        videoCurr.onresize = () => {
          canvasCurr.width = videoCurr.videoWidth;
          canvasCurr.height = videoCurr.videoHeight;
        };

        videoCurr.play();
      }
    })();
  }, [video, videoCurr, canvas, canvasCurr]);

  (async () => {
    worker = await createWorker({
      logger: (m) => console.log(m)
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  })();

  async function capture() {
    if (videoCurr && canvasCurr && worker) {
      canvasCurr
        ?.getContext('2d')
        ?.drawImage(videoCurr, 0, 0, canvasCurr?.width, canvasCurr?.height);

      const img = canvasCurr?.toDataURL('image/png');

      const {
        data: { text }
      } = await worker.recognize(img || '');

      setCaptured(
        text?.match(/(\d|\.)+/g)?.join(' ') || 'No digits were captured'
      );
    }
  }

  return (
    <div className="Capture">
      <CloseSharp
        style={{ marginLeft: 'auto' }}
        onClick={() => navigate('/')}
      />

      <h2 style={{ marginBottom: 16 }}>Capture</h2>

      <video ref={video}></video>
      <canvas ref={canvas} style={{ display: 'none' }}></canvas>

      <button onClick={capture}>Capture</button>
      <div>
        <b>Captured:</b> {captured}
      </div>
    </div>
  );
}

export default Capture;
