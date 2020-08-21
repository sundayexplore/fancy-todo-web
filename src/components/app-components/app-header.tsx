import React, { useState } from 'react';
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
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

// Redux Actions
import { setSelectedTodoCategory } from '@/redux/actions/current-actions';

// Utils
import { userAPI } from '@/utils';

// Types
import { IRootState } from '@/types';

export interface IAppHeaderProps {}

export default function AppHeader({}: IAppHeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedTodoCategory } = useSelector(
    (state: IRootState) => state.current,
  );
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  const handleMenuOpen = () => setOpenMenu(true);
  const handleMenuClose = () => setOpenMenu(false);

  const handleTodoCategoryChange = (category: 'today') =>
    dispatch(setSelectedTodoCategory(category));

  const handleSignOut = async () => {
    try {
      const { } = await userAPI.post('/signout');
      localStorage.clear();
      await router.push('/signin');
    } catch (err) {
      // handle here
    }
  }

  return (
    <header className={classes.appHeaderWrapper}>
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
          <Button color={`inherit`} onClick={handleSignOut}>Sign Out</Button>
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
    </header>
  );
}

const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appHeaderWrapper: {
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
      padding: theme.spacing(3),
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
