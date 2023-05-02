import { ChangeEvent } from 'react';
import './RangeInput.scss';

interface RangeInputProps {
  label: string;
  value: number;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

function RangeInput({ label, value, onChange }: RangeInputProps) {
  return (
    <div className="RangeInput">
      <label>
        <strong>{label}:</strong> {value}%
        <input type="range" value={value} max="30" onChange={onChange} />
      </label>
    </div>
  );
}
export default RangeInput;
