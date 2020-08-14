import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

export interface IAppHeaderProps { }

export default function AppHeader({ }: IAppHeaderProps) {
  const classes = useStyles();
  
  return (
    <header className={classes.appHeaderWrapper}>
      <AppBar position={`static`}>
        <Toolbar>
          <IconButton edge={`start`} className={classes.menuButton} color={`inherit`} aria-label={`Menu`}>
            <MenuIcon />
          </IconButton>
          <Typography variant={`h6`} className={classes.headerTitle}>
            Fancy Todo
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  appHeaderWrapper: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(3)
  },
  headerTitle: {
    flexGrow: 1
  }
}));
