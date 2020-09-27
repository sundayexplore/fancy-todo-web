import React, { useState, useEffect, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Popover, Tooltip } from '@material-ui/core';
import { Today as TodayIcon } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Calendar } from '@material-ui/pickers';
import moment, { Moment } from 'moment';

// Types
import { ITodo } from '@/types';

export interface ITodoDatePickerProps {
  todo: ITodo;
  onChange: (date: MaterialUiPickersDate) => void;
}

export default function TodoDatePicker({
  todo,
  onChange,
}: ITodoDatePickerProps) {
  const classes = useStyles();
  const [
    datePickerAnchorEl,
    setDatePickerAnchorEl,
  ] = useState<HTMLButtonElement | null>(null);
  const [tooltipText, setTooltipText] = useState<string>('');
  const [dateHeadline, setDateHeadline] = useState<string | null>(null);
  const showDatePicker = Boolean(datePickerAnchorEl);

  useEffect(() => {
    const todoDue: Moment = todo.due as Moment;

    setTooltipText(todoDue.format('dddd, MMMM Do YYYY'));

    if (todoDue.isSame(moment(), 'day')) {
      setDateHeadline('Today');
    } else if (todoDue.isSame(moment().add(1, 'day'), 'day')) {
      setDateHeadline('Tomorrow');
    } else {
      setDateHeadline(todoDue.format('MMM Do YYYY'));
    }
  }, [todo.due]);

  const handleShowDatePicker = (e: MouseEvent<HTMLButtonElement>): void => {
    setDatePickerAnchorEl(e.currentTarget);
  };

  const handleHideDatePicker = (): void => {
    setDatePickerAnchorEl(null);
  };

  const onChangeDueDate = (date: MaterialUiPickersDate) => {
    onChange(date);
    handleHideDatePicker();
  };

  return (
    <div className={classes.wrapper}>
      <Tooltip arrow title={tooltipText}>
        <Button onClick={handleShowDatePicker} startIcon={<TodayIcon />} size={`small`}>
          {dateHeadline}
        </Button>
      </Tooltip>

      <Popover
        open={showDatePicker}
        anchorEl={datePickerAnchorEl}
        onClose={handleHideDatePicker}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Calendar
          date={todo.due as Moment}
          onChange={onChangeDueDate}
          minDate={moment()}
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
