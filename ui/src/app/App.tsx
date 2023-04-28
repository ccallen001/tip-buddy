import { useRef, useState, useEffect } from 'react';
import { Typography, Box, Switch, FormControlLabel } from '@mui/material';
import PercentSlider from '../components/PercentSlider';
import moneyWoman from '../assets/money-woman.png';
import './App.scss';

function App() {
  const [beforeTaxAmount, setBeforeTaxAmount] = useState('');
  const [afterTaxAmount, setAfterTaxAmount] = useState('');
  const [shouldRoundTotal, setShouldRoundTotal] = useState(true);
  const [percentTip, setPercentTip] = useState(20);
  const [tipAmount, setTipAmount] = useState('0.00');
  const [totalAmount, setTotalAmount] = useState('0.00');

  const [errors, setErrors] = useState<string[]>([]);

  const beforeTaxInput = useRef<HTMLInputElement>(null);
  const afterTaxInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const beforeTax = parseFloat(parseFloat(beforeTaxAmount).toFixed(2)) || 0;
    const afterTax = parseFloat(parseFloat(afterTaxAmount).toFixed(2)) || 0;

    const hasBeforeAndAfter = beforeTax && afterTax;

    let tip = hasBeforeAndAfter ? beforeTax * (percentTip / 100) : 0;
    let total = hasBeforeAndAfter ? afterTax + tip : 0;

    if (shouldRoundTotal) {
      total = Math.round(total);
      tip = total - afterTax;
    }

    setTipAmount(tip.toFixed(2));
    setTotalAmount(total.toFixed(2));
  }, [beforeTaxAmount, afterTaxAmount, percentTip, shouldRoundTotal]);

  return (
    <div className="App">
      <Typography variant="h2" pb={4} fontFamily="cursive" textAlign="center">
        <strong>Tip Buddy</strong>
      </Typography>

      <img id="main-image" src={moneyWoman} />

      <Box pb={2}>
        <div>
          <label>
            <strong>Before Tax</strong>
          </label>
          <br />
          <input
            ref={beforeTaxInput}
            type="number"
            value={beforeTaxAmount}
            onChange={(ev) => {
              let value = ev.target.value;

              if (value.length === 5) {
                (afterTaxInput.current as HTMLInputElement)?.focus();
              }

              setBeforeTaxAmount(value);
            }}
          />
        </div>

        <div>
          <label>
            <strong>After Tax</strong>
          </label>
          <br />
          <input
            ref={afterTaxInput}
            type="number"
            value={afterTaxAmount}
            onChange={(ev) => {
              let value = ev.target.value;

              if (value.length > 5) value = value.slice(0, 5);

              setAfterTaxAmount(value);
            }}
            onKeyUp={(ev) => {
              if (ev.key === 'Enter') {
                (afterTaxInput.current as HTMLInputElement).blur();
              }
            }}
          />
        </div>
      </Box>

      <Box mb={1} ml="auto">
        <FormControlLabel
          control={
            <Switch
              checked={shouldRoundTotal}
              onChange={(ev) => setShouldRoundTotal(ev.target.checked)}
            />
          }
          label="Round"
          labelPlacement="start"
        />
      </Box>

      <Box pb={4}>
        <PercentSlider
          {...{
            percentTip,
            setPercentTip,
            beforeTaxAmount,
            afterTaxAmount
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
