import React, { useState, FormEvent, MouseEvent, useEffect } from 'react';
import {
  TextField,
  getTheme,
  DatePicker,
  DefaultButton,
  Dropdown
} from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { ITodo } from '@/types';

export interface IDemoTodoForm {
  type: 'add' | 'update';
  todo?: ITodo;
}

export default function DemoTodoForm({ type, todo }: IDemoTodoForm) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [localTodo, setLocalTodo] = useState<ITodo>({
    name: '',
    due: null,
    dueDate: null,
    dueTime: null,
    priority: 0,
    position: null,
    completed: false,
  });

  useEffect(() => {
    switch (type) {
      case 'update':
        setLocalTodo({
          ...todo!,
        });
        break;
    }
  }, []);

  const handleDemoTodoDataChange = (
    type: 'name' | 'dueDate' | 'dueTime' | 'priority',
    value: string | number | any
  ) => {
    switch (type) {
      case 'name':
        setLocalTodo({
          ...localTodo,
          name: value as string,
        });
        break;

      case 'dueDate':
        setLocalTodo({
          ...localTodo,
          dueDate: value,
        });
        break;

      case 'dueTime':
        setLocalTodo({
          ...localTodo,
          dueTime: value,
        });
        break;

      case 'priority':
        setLocalTodo({
          ...localTodo,
          priority: value,
        });
        break;
    }
  };

  const onFormatDate = (date?: Date): string => moment(date).format('LL');

  const onSelectDate = (date?: Date | null) => {
    setLocalTodo({
      ...localTodo,
      dueDate: date || null,
    });
  };

  const handleSubmitTodo = (
    e:
      | FormEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLButtonElement
          | HTMLFormElement
        >
      | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const clearDue = (type: 'date' | 'time') => {
    switch (type) {
      case 'date':
        setLocalTodo({
          ...localTodo,
          dueDate: null,
        });
        break;

      case 'time':
        setLocalTodo({
          ...localTodo,
          dueTime: null,
        });
        break;
    }
  };

  return (
    <form onSubmit={handleSubmitTodo}>
      <TextField
        label='Todo Name'
        value={localTodo.name}
        placeholder='Fix Bugs on line 37'
        type='text'
        onChange={({}, newName) =>
          handleDemoTodoDataChange('name', newName as string)
        }
        required
        title='Todo Name'
      />
      <div>
        <DatePicker
          label='Due Date'
          placeholder={moment().format('LL')}
          formatDate={onFormatDate}
          minDate={moment().toDate()}
          onSelectDate={onSelectDate}
          allowTextInput
          value={localTodo.dueDate! as Date | undefined}
          title='Due Date'
        />
        <DefaultButton
          title='Clear Date'
          label='Clear Date'
          onClick={() => clearDue('date')}
        >
          Clear Date
        </DefaultButton>
      </div>
      <div>
        <TextField
          label='Due Time'
          type='time'
          title='Due Time'
          onChange={({}, newDueTime) =>
            handleDemoTodoDataChange('dueTime', newDueTime)
          }
          value={localTodo.dueTime! as string}
        />
        <DefaultButton onClick={() => clearDue('time')}>
          Clear Time
        </DefaultButton>
      </div>
    </form>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    demoTodoFormWrapper: {
      display: 'grid',
    },
  })
);
