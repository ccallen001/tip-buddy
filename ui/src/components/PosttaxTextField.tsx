import { TextField } from '@mui/material';
import { ErrorObject } from '../app/App';

interface PosttaxTextFieldProps {
  posttaxAmount: string;
  setPosttaxAmount: (prev: string) => void;
}

function PosttaxTextField({
  posttaxAmount,
  setPosttaxAmount
}: PosttaxTextFieldProps) {
  return (
    <TextField
      className=""
      type="number"
      label="Posttax Amount"
      size="small"
      color="info"
      fullWidth
      value={posttaxAmount}
      onChange={(ev) => {
        const value = ev.target.value;
        setPosttaxAmount(value);
      }}
    />
  );
}

export default PosttaxTextField;
