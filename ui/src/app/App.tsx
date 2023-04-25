import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import PretaxTextField from '../components/PretaxTextField';
import PosttaxTextField from '../components/PosttaxTextField';
import PercentSlider from '../components/PercentSlider';
import moneyWoman from '../assets/money-woman.png';
import './App.scss';

export type ErrorObject = {
  field: string;
  msg: string;
};

function App() {
  const [pretaxAmount, setPretaxAmount] = useState('');
  const [posttaxAmount, setPosttaxAmount] = useState('');
  const [percentTip, setPercentTip] = useState(20);
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [errors, setErrors] = useState<ErrorObject[]>([]);

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
        <PretaxTextField
          {...{ pretaxAmount, setPretaxAmount, errors, setErrors }}
        />
        <PosttaxTextField
          {...{ posttaxAmount, setPosttaxAmount, errors, setErrors }}
        />
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
