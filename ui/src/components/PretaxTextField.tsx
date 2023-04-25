import { TextField } from '@mui/material';
import { ErrorObject } from '../app/App';

interface PretaxTextFieldProps {
  pretaxAmount: string;
  setPretaxAmount: (prev: string) => void;
}

function PretaxTextField({
  pretaxAmount,
  setPretaxAmount
}: PretaxTextFieldProps) {
  return (
    <TextField
      className=""
      type="number"
      label="Pretax Amount"
      size="small"
      color="info"
      fullWidth
      value={pretaxAmount}
      onChange={(ev) => {
        const value = ev.target.value;
        setPretaxAmount(value);
      }}
    />
  );
}

export default PretaxTextField;
