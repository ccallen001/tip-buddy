import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraAlt } from '@mui/icons-material';
import { NumberInput, RangeInput } from '../components';
import moneyWoman from '../assets/money-woman.png';
import './App.scss';

function getSalesTaxPercent(beforeTaxAmount: string, afterTaxAmount: string) {
  const beforeTax = parseFloat(parseFloat(beforeTaxAmount).toFixed(2)) || 0;
  const afterTax = parseFloat(parseFloat(afterTaxAmount).toFixed(2)) || 0;

  return Math.round(((afterTax - beforeTax) / beforeTax) * 100);
}

function App() {
  const [beforeTaxAmount, setBeforeTaxAmount] = useState('');
  const [afterTaxAmount, setAfterTaxAmount] = useState('');
  const [shouldRoundTotal, setShouldRoundTotal] = useState(true);
  const [percentTip, setPercentTip] = useState(20);
  const [tipAmount, setTipAmount] = useState('0.00');
  const [totalAmount, setTotalAmount] = useState('0.00');

  // const [errors, setErrors] = useState<string[]>([]);

  const beforeTaxInput = useRef<HTMLInputElement>(null);
  const afterTaxInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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
      <CameraAlt
        style={{ marginLeft: 'auto' }}
        onClick={() => navigate('/capture')}
      />
      <h1>Tip Buddy</h1>
      <img id="main-image" src={moneyWoman} alt="Tip Buddy" />
      <NumberInput
        ref={beforeTaxInput}
        label="Before Tax"
        value={beforeTaxAmount}
        onChange={(ev) => {
          let value = ev.target.value;

          if (value.length === 5) {
            (afterTaxInput.current as HTMLInputElement)?.focus();
          }

          setBeforeTaxAmount(value);
        }}
      />
      <NumberInput
        ref={afterTaxInput}
        label="After Tax"
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

      <div>
        <strong>Sales Tax:</strong>{' '}
        {getSalesTaxPercent(beforeTaxAmount, afterTaxAmount) || ''}%
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <label>
          <strong>Round:</strong>&nbsp;
          <input
            type="checkbox"
            checked={shouldRoundTotal}
            onChange={(ev) => setShouldRoundTotal(ev.target.checked)}
          />
        </label>
      </div>
      <RangeInput
        label="Percent Tip"
        value={percentTip}
        onChange={(ev) => {
          setPercentTip(parseFloat((ev.target as HTMLInputElement).value));
        }}
      />
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <strong>Tip:</strong>&nbsp;{tipAmount}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <strong>Total:</strong>&nbsp;{totalAmount}
        </div>
      </div>
    </div>
  );
}

export default App;
