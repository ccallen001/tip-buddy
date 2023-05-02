import { ChangeEvent, ForwardedRef, KeyboardEvent, forwardRef } from 'react';
import './NumberInput.scss';

interface NumberInputProps {
  label?: string;
  value?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (ev: KeyboardEvent) => void;
}

const NumberInput = forwardRef(
  (props: NumberInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, value, onChange, onKeyUp } = props;

    return (
      <div className="NumberInput">
        <label>
          <strong>{label || ''}</strong>
          <input
            ref={ref}
            type="number"
            value={value || ''}
            onChange={(ev) => onChange?.(ev)}
            onKeyUp={(ev) => onKeyUp?.(ev)}
          />
        </label>
      </div>
    );
  }
);

export default NumberInput;
