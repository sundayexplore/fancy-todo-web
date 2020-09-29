import React, { useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

// Redux Actions
import { setSelectedTodoCategory } from '@/redux/actions/current-actions';
import {
  resetSnackbar,
  setSuccess,
  setError,
} from '@/redux/actions/snackbar-actions';

// Utils
import { userAPI } from '@/utils';

// Types
import { IRootState, ISnackbarOptions } from '@/typings';

// Components
import { CustomHead, UserHeaderMenu } from '@/components';

export interface IAppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: IAppLayoutProps) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.user);
  const { selectedTodoCategory } = useSelector(
    (state: IRootState) => state.current,
  );
  const snackbar = useSelector((state: IRootState) => state.snackbar);
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbarOptions>({
    severity: undefined,
    message: null,
    open: false,
  });

  useEffect(() => {
    if (snackbar.info && snackbar.info.length > 0) {
      setSnackbarOptions({
        severity: 'info',
        message: snackbar.info,
        open: true,
      });
    } else if (snackbar.warning && snackbar.warning.length > 0) {
      setSnackbarOptions({
        severity: 'warning',
        message: snackbar.warning,
        open: true,
      });
    } else if (snackbar.error && snackbar.error.length > 0) {
      setSnackbarOptions({
        severity: 'error',
        message: snackbar.error,
        open: true,
      });
    } else if (snackbar.success && snackbar.success.length > 0) {
      setSnackbarOptions({
        severity: 'success',
        message: snackbar.success,
        open: true,
      });
    } else {
      setSnackbarOptions({
        ...snackbarOptions,
        open: false,
        message: null,
      });
    }
  }, [snackbar]);

  const handleCloseSnackbar = (): void => {
    dispatch(resetSnackbar());

    setSnackbarOptions({
      ...snackbarOptions,
      open: false,
      message: null,
    });
  };

  const handleCloseAlert = (): void => {
    dispatch(resetSnackbar());

    setSnackbarOptions({
      ...snackbarOptions,
      open: false,
      message: null,
    });
  };

  const handleMenuOpen = (): void => setOpenMenu(true);
  const handleMenuClose = (): void => setOpenMenu(false);

  const handleTodoCategoryChange = (category: 'today'): void => {
    dispatch(setSelectedTodoCategory(category));
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      const { data } = await userAPI.post('/signout');
      localStorage.clear();
      dispatch(setSuccess(data.message));
      await router.push('/signin');
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          dispatch(setError(err.response.data.message, err.response.data.name));
        } else {
          dispatch(setError('Unknown error has occured!'));
        }
      }
    }
  };

  return (
    <>
      <CustomHead title={currentUser.username} />
      <section className={classes.appLayoutWrapper}>
        <CssBaseline />
        <AppBar
          position={`fixed`}
          className={clsx(classes.appBar, { [classes.appBarShift]: openMenu })}
        >
          <Toolbar>
            <IconButton
              edge={`start`}
              className={clsx(classes.menuButton, openMenu && classes.hide)}
              color={`inherit`}
              aria-label={`Menu`}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant={`h6`} className={classes.headerTitle}>
              Fancy Todo
            </Typography>
            {/* <Button color={`inherit`} onClick={handleSignOut}>
              Sign Out
            </Button> */}
            <UserHeaderMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant={`persistent`}
          anchor={`left`}
          open={openMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleMenuClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Today'].map((category) => (
              <ListItem
                button
                key={category}
                onClick={() => handleTodoCategoryChange('today')}
                selected={selectedTodoCategory === 'today'}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: openMenu,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </section>

      <Snackbar open={snackbarOptions.open} onClose={handleCloseSnackbar}>
        <Alert
          severity={snackbarOptions.severity}
          onClose={handleCloseAlert}
          variant={`filled`}
          elevation={6}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appLayoutWrapper: {
      flexGrow: 1,
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    headerTitle: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);
