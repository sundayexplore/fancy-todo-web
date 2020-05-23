import React from 'react';
import { getTheme, FontIcon } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface IDemoTodoListHeaderProps {}

export default function DemoTodoListHeader(props: IDemoTodoListHeaderProps) {
  const classes = useStyles();
  
  return (
    <h1>This is DEMO TODO LIST HEADER!</h1>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({

}));
