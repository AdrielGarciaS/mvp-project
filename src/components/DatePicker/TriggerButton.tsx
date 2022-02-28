import { CalendarIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface TriggerButtonProps {
  onClick?(): void;
  onClickClear?(): void;
  value?: string;
  text?: string;
}

export const TriggerButton = forwardRef<never, TriggerButtonProps>(
  (props, ref) => {
    const { value, onClick, text, onClickClear } = props;

    const hasValue = Boolean(value);

    return (
      <ButtonGroup isAttached colorScheme="teal" size="sm">
        <Button onClick={onClick} ref={ref}>
          {hasValue ? value : text}
        </Button>

        <IconButton
          aria-label="Clear value"
          icon={hasValue ? <SmallCloseIcon /> : <CalendarIcon />}
          onClick={hasValue ? onClickClear : onClick}
        />
      </ButtonGroup>
    );
  },
);
