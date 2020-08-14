import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';

export interface IAppHeaderProps {}

export default function AppHeader({}: IAppHeaderProps) {
  const classes = useStyles();

  return (
    <AppBar classes={{ root: classes.appHeader }}>
      <Toolbar>
        <IconButton
          edge={`start`}
          classes={{ root: classes.todoMenuButton }}
          color={`inherit`}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant={`h6`} classes={{ root: classes.appHeaderTitle }}>
          Fancy Todo
        </Typography>
        <Tooltip arrow title={`Add Todo`}>
          <IconButton
            edge={`end`}
            color={`inherit`}
            classes={{ root: classes.appHeaderIconButton }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`Options`}>
          <IconButton
            edge={`end`}
            color={`inherit`}
            classes={{ root: classes.appHeaderIconButton }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appHeader: {
      flexGrow: 1,
    },
    todoMenuButton: {
      marginRight: theme.spacing(2),
    },
    appHeaderTitle: {
      flexGrow: 1,
    },
    appHeaderIconButton: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  }),
);
