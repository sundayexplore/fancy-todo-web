import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { Today as TodayIcon } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

// Types
import { ITodo } from '@/types';

export interface ITodoDateAndTimePickerProps {
  todo: ITodo;
  onChange: (date: MaterialUiPickersDate) => void;
}

export default function TodoDateAndTimePicker({
  todo,
  onChange,
}: ITodoDateAndTimePickerProps) {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const showMenuButtonRef = useRef<HTMLButtonElement>(null);
  const prevShowMenu = useRef(showMenu);

  useEffect(() => {
    if (prevShowMenu.current === true && showMenu === false) {
      showMenuButtonRef.current!.focus();
    }
  }, [showMenu]);

  const handleMenu = (): void => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleCloseMenu = (e: MouseEvent<EventTarget>): void => {
    if (
      showMenuButtonRef.current &&
      showMenuButtonRef.current.contains(e.target as HTMLElement)
    ) {
      return;
    }

    setShowMenu(false);
  };

  const handleMenuKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setShowMenu(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <IconButton ref={showMenuButtonRef} onClick={handleMenu}>
        <TodayIcon />
      </IconButton>

      <Popper
        open={showMenu}
        anchorEl={showMenuButtonRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center-top' : 'center-bottom',
            }}
          ></Grow>
        )}
      </Popper>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
    },
    menuWrapper: {
      marginRight: theme.spacing(2),
    },
  }),
);
