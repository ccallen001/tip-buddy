import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Slider } from '@mui/material';
import './App.scss';

function App() {
  const [pretaxAmount, setPretaxAmount] = useState('');
  const [percentAmount, setPercentAmount] = useState(20);
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const pretax = parseFloat(pretaxAmount) || 0;
    const percent = percentAmount / 100;
    const total = Math.round(pretax * percent + pretax);
    const tip = total - pretax;

    setTotalAmount(total.toFixed(2));
    setTipAmount(tip.toFixed(2));
  }, [pretaxAmount, percentAmount]);

  return (
    <div className="App">
      <Typography variant="h1" pb={4} textAlign="center">
        🤑
        <br />
        Tip Buddy
      </Typography>

      <TextField
        type="number"
        label="Pretax Amount"
        size="small"
        color="info"
        value={pretaxAmount}
        onChange={(ev) => {
          const value = ev.target.value;
          if (value) setError('');
          setPretaxAmount(value);
        }}
        error={!!error}
        helperText={error}
        sx={{ height: 64, width: '100%' }}
      />
      <Box pt={4} pb={4}>
        <label>
          <strong>Percent:</strong> {percentAmount}%
        </label>

        <Slider
          defaultValue={20}
          max={30}
          // step={5}
          valueLabelDisplay="auto"
          marks={[
            {
              label: '15%',
              value: 15
            },
            {
              label: '20%',
              value: 20
            }
          ]}
          value={percentAmount}
          onChange={(ev) => {
            if (!pretaxAmount) setError('Please provide pretax amount');
            setPercentAmount(parseFloat((ev.target as HTMLInputElement).value));
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
