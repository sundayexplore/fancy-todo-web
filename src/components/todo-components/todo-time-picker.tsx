import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  MouseEvent,
} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { IconButton, Popover, Tooltip } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';

// Types
import { ITodo, ITodoValidations } from '@/types';

export interface ITodoTimePickerProps {
  todo: ITodo;
  todoErrors: ITodoValidations;
  onChange: (date: MaterialUiPickersDate) => void;
  loading: boolean;
}

export default function TodoTimePicker({
  todo,
  todoErrors,
  onChange,
  loading,
}: ITodoTimePickerProps) {
  const classes = useStyles();
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const showTimePickerButtonRef = useRef<HTMLButtonElement>(null);
  const prevShowTimePicker = useRef(showTimePicker);

  useEffect(() => {
    if (prevShowTimePicker.current === true && showTimePicker === false) {
      showTimePickerButtonRef.current!.focus();
    }
  }, [showTimePicker]);

  const handleTimePicker = (): void => {
    setShowTimePicker((prevShowTimePicker) => !prevShowTimePicker);
  };

  const handleCloseTimePicker = (e: MouseEvent<EventTarget>): void => {
    if (
      showTimePickerButtonRef.current &&
      showTimePickerButtonRef.current.contains(e.target as HTMLElement)
    ) {
      return;
    }

    setShowTimePicker(false);
  };

  return (
    <div className={classes.wrapper}>
      <IconButton ref={showTimePickerButtonRef} onClick={handleTimePicker}>
        <AccessTimeIcon />
      </IconButton>

      <Popover
        open={showTimePicker}
        anchorEl={showTimePickerButtonRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <TimePicker
          value={todo.due}
          onChange={onChange}
          variant={`static`}
          disabled={loading}
          error={todoErrors.dueTime !== null && todoErrors.dueTime.length > 0}
          helperText={todoErrors.dueTime}
          disableToolbar
        />
      </Popover>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
    },
  }),
);
