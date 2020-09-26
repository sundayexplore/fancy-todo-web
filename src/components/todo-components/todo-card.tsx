import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Divider,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  Close as CloseIcon,
  Check as CheckIcon,
  AccessTime as AccessTimeIcon,
  Today as TodayIcon,
} from '@material-ui/icons';
import { red, lightGreen } from '@material-ui/core/colors';
import moment from 'moment';

import { ITodo, ITodoValidations, ICustomValidator } from '@/types';
import { todoAPI, CustomValidator } from '@/utils';
import { addTodo, updateTodo, deleteTodo } from '@/redux/actions/todo-actions';

export interface ITodoCardProps {
  todo?: ITodo;
  mode?: 'add' | 'update' | 'show';
  onCancel?: () => void;
  onComplete?: () => void;
}

export default function TodoCard({
  todo = {} as ITodo,
  mode = 'add',
  onCancel,
  onComplete = () => {},
}: ITodoCardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modeState, setModeState] = useState<'add' | 'update' | 'show'>(mode);
  const [todoData, setTodoData] = useState<ITodo>({
    name: '',
    due: moment().startOf('day'),
    dueDate: '',
    dueTime: '',
    priority: 0,
    position: null,
    completed: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [todoErrors, setTodoErrors] = useState<ITodoValidations>({
    name: null,
    dueTime: null,
  });

  useEffect(() => {
    setTodoData({
      ...todoData,
      ...todo,
    });
  }, [todo]);

  useEffect(() => {
    switch (modeState) {
      case 'add':
        break;

      case 'update':
        setTodoData({
          ...todo,
          due: moment(todo.due),
        });

      default:
        break;
    }
  }, [modeState]);

  const clearTodoData = (): void => {
    setTodoData({
      name: '',
      due: moment(),
      dueDate: '',
      dueTime: '',
      priority: 0,
      position: null,
      completed: false,
    });
  };

  const checkTodoErrors = (): boolean => {
    const { name, due } = todoData;
    const checkedTodoErrors: ITodoValidations = {
      name: CustomValidator.todoName(name),
      dueTime: CustomValidator.dueTime(due),
    };

    setTodoErrors({
      ...todoErrors,
      ...checkedTodoErrors,
    });

    if (
      Object.values(checkedTodoErrors).every(
        (checkedTodoError) => checkedTodoError === null,
      )
    ) {
      return true;
    }

    return false;
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (e.target.name === 'name') {
      setTodoErrors({
        ...todoErrors,
        [e.target.name]: CustomValidator.todoName(e.target.value),
      });
    } else {
      setTodoErrors({
        ...todoErrors,
        [e.target.name]: (CustomValidator as ICustomValidator)[e.target.name](
          e.target.value,
        ),
      });
    }

    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTodo = async (
    e:
      | FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
      | MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (checkTodoErrors()) {
        const { name, due, priority } = todoData;
        const { data } = await todoAPI.post('/', {
          name,
          due,
          priority,
        });

        setLoading(false);
        dispatch(addTodo(data.todo));
        clearTodoData();
        onComplete();
      } else {
        setLoading(false);
        // handle here
      }
    } catch (err) {
      setLoading(false);

      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };

  const handleUpdateTodo = async (
    e:
      | FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
      | MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (checkTodoErrors()) {
        const { name, due, priority } = todoData;
        const { data } = await todoAPI.put(`/${todo._id}`, {
          name,
          due,
          priority,
        });

        setLoading(false);

        dispatch(updateTodo(data.todo));
        clearTodoData();
        setModeState('show');
        onComplete();
      } else {
        setLoading(false);
        // handle here
      }
    } catch (err) {
      setLoading(false);

      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };

  const handleChangeModeToUpdate = (): void => {
    setModeState('update');
  };

  const handleCancelLocal = (): void => {
    setModeState('show');
  };

  const handleChangeDueDate = (date: MaterialUiPickersDate): void => {
    setTodoData({
      ...todoData,
      due: date,
    });
  };

  const handleChangeDueTime = (date: MaterialUiPickersDate): void => {
    setTodoErrors({
      ...todoErrors,
      dueTime: CustomValidator.dueTime(date),
    });

    setTodoData({
      ...todoData,
      due: date,
    });
  };

  return (
    <Card classes={{ root: classes.todoCard }}>
      <CardContent classes={{ root: classes.todoCardContent }}>
        {modeState === 'add' ? (
          <form onSubmit={handleAddTodo}>
            <TextField
              autoFocus
              placeholder={`e.g. Buy some carrots`}
              name={`name`}
              required
              value={todoData.name}
              onChange={handleOnChange}
              multiline
              error={todoErrors.name !== null && todoErrors.name.length > 0}
              helperText={todoErrors.name}
              disabled={loading}
            />

            <KeyboardDatePicker
              value={todoData.due}
              onChange={handleChangeDueDate}
              variant={`inline`}
              keyboardIcon={<TodayIcon />}
              minDate={moment()}
              disabled={loading}
            />

            <KeyboardTimePicker
              value={todoData.due}
              onChange={handleChangeDueTime}
              variant={`inline`}
              keyboardIcon={<AccessTimeIcon />}
              error={
                todoErrors.dueTime !== null && todoErrors.dueTime.length > 0
              }
              helperText={todoErrors.dueTime}
              disabled={loading}
            />
          </form>
        ) : modeState === 'update' ? (
          <form onSubmit={handleUpdateTodo}>
            <TextField
              autoFocus
              placeholder={`e.g. Buy some carrots`}
              name={`name`}
              required
              value={todoData.name}
              onChange={handleOnChange}
              multiline
              error={todoErrors.name !== null && todoErrors.name.length > 0}
              helperText={todoErrors.name}
              disabled={loading}
              onBlur={handleUpdateTodo}
            />
          </form>
        ) : (
          <CardActionArea
            classes={{ root: classes.showTodoNameWrapper }}
            onClick={handleChangeModeToUpdate}
          >
            <Typography
              variant={`body1`}
              paragraph
              gutterBottom
              align={`justify`}
            >
              {todo.name}
            </Typography>
            <Divider />
          </CardActionArea>
        )}
      </CardContent>
      {modeState === 'add' ? (
        <CardActions classes={{ root: classes.todoCardActions }}>
          <Tooltip arrow title={`Cancel Add Todo`}>
            <IconButton edge={`start`} onClick={onCancel}>
              <CloseIcon classes={{ root: classes.closeIcon }} />
            </IconButton>
          </Tooltip>

          <Tooltip arrow title={`Add Todo`}>
            <IconButton edge={`end`} onClick={handleAddTodo}>
              <CheckIcon classes={{ root: classes.checkIcon }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      ) : modeState === 'update' ? (
        <CardActions classes={{ root: classes.todoCardActions }}>
          <Tooltip arrow title={`Cancel Update Todo`}>
            <IconButton edge={`start`} onClick={onCancel || handleCancelLocal}>
              <CloseIcon classes={{ root: classes.closeIcon }} />
            </IconButton>
          </Tooltip>

          <Tooltip arrow title={`Update Todo`}>
            <IconButton edge={`end`} onClick={handleUpdateTodo}>
              <CheckIcon classes={{ root: classes.checkIcon }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      ) : (
        <CardActions classes={{ root: classes.todoCardActions }}></CardActions>
      )}
    </Card>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    todoCard: {
      width: 200,
      height: 200,
    },
    todoCardContent: {
      width: '100%',
    },
    todoCardActions: {
      width: '100%',
    },
    closeIcon: {
      color: red[500],
    },
    checkIcon: {
      color: lightGreen[500],
    },
    showTodoNameWrapper: {
      width: '100%',
      cursor: 'text',
    },
  }),
);
