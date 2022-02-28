import { Box } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';

import { TriggerButton } from './TriggerButton';

interface Props {
  selectedDate?: Date | null;
  buttonText: string;
  onChange(date: Date | null): void;
}

export const DatePicker = (props: Props) => {
  const { selectedDate, onChange, buttonText } = props;

  const onClear = () => {
    onChange?.(null);
  };

  return (
    <Box>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        showPopperArrow
        customInput={<TriggerButton text={buttonText} onClickClear={onClear} />}
      />
    </Box>
  );
};

export default DatePicker;
