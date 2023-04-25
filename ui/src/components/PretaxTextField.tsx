import { TextField } from '@mui/material';

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
      className="PretaxTextField"
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
