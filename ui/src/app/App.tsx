import { useRef, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
// import PretaxTextField from '../components/PretaxTextField';
// import PosttaxTextField from '../components/PosttaxTextField';
import PercentSlider from '../components/PercentSlider';
import moneyWoman from '../assets/money-woman.png';
import './App.scss';

function App() {
  const [pretaxAmount, setPretaxAmount] = useState('');
  const [posttaxAmount, setPosttaxAmount] = useState('');
  const [percentTip, setPercentTip] = useState(20);
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const [errors, setErrors] = useState<string[]>([]);

  const pretaxInput = useRef<HTMLInputElement>(null);
  const posttaxInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pretax = parseFloat(pretaxAmount) || 0;
    const posttax = parseFloat(posttaxAmount) || 0;

    const tip = pretax * (percentTip / 100);
    const total = posttax + tip;

    const hasPretaxAndPosttax = !!pretax && !!posttax;

    setTipAmount((hasPretaxAndPosttax ? tip : 0).toFixed(2));
    setTotalAmount((hasPretaxAndPosttax ? total : 0).toFixed(2));
  }, [pretaxAmount, posttaxAmount, percentTip]);

  return (
    <div className="App">
      <Typography variant="h2" pb={4} fontFamily="cursive" textAlign="center">
        <strong>Tip Buddy</strong>
      </Typography>

      <img id="main-image" src={moneyWoman} />

      <Box pb={3}>
        {/* <PretaxTextField
          {...{ pretaxAmount, setPretaxAmount, errors, setErrors }}
        />
        <PosttaxTextField
          {...{ posttaxAmount, setPosttaxAmount, errors, setErrors }}
        /> */}
        <div>
          <label>
            <strong>Pretax Amount</strong>
          </label>
          <br />
          <input
            ref={pretaxInput}
            type="number"
            value={pretaxAmount}
            onChange={(ev) => {
              let value = ev.target.value;

              if (value.length === 5) {
                (posttaxInput.current as HTMLInputElement)?.focus();
              }

              setPretaxAmount(value);
            }}
          />
        </div>

        <div>
          <label>
            <strong>Posttax Amount</strong>
          </label>
          <br />
          <input
            ref={posttaxInput}
            type="number"
            value={posttaxAmount}
            onChange={(ev) => {
              let value = ev.target.value;

              if (value.length > 5) value = value.slice(0, 5);

              setPosttaxAmount(value);
            }}
            onKeyUp={(ev) => {
              if (ev.key === 'Enter') {
                (posttaxInput.current as HTMLInputElement).blur();
              }
            }}
          />
        </div>
      </Box>

      <Box pb={4}>
        <PercentSlider
          {...{
            percentTip,
            setPercentTip,
            pretaxAmount,
            posttaxAmount
          }}
        />
      </Box>

      <Typography align="right">
        <strong>Tip:</strong> {tipAmount}
      </Typography>
      <Typography align="right">
        <strong>Total:</strong> {totalAmount}
      </Typography>
    </div>
  );
}

export default App;
