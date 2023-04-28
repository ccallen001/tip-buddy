import { Slider } from '@mui/material';

interface PercentSliderProps {
  percentTip: number;
  setPercentTip: (prev: number) => void;
  beforeTaxAmount: string;
  afterTaxAmount: string;
}

function PercentSlider({ percentTip, setPercentTip }: PercentSliderProps) {
  return (
    <div className="PercentSlider">
      <label>
        <strong>Percent Tip:</strong> {percentTip}%
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
        value={percentTip}
        onChange={(ev) => {
          setPercentTip(parseFloat((ev.target as HTMLInputElement).value));
        }}
      />
    </div>
  );
}
export default PercentSlider;
