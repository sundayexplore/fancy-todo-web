import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ButtonBase, Card, CardContent } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

export interface IBlankTodoCardProps {}

export default function BlankTodoCard({}: IBlankTodoCardProps) {
  const classes = useStyles();

  return (
    <ButtonBase>
      <Card classes={{ root: classes.todoCard }} elevation={0}>
        <CardContent classes={{ root: classes.todoCardContent }}>
          <AddIcon classes={{ root: classes.addIcon }} />
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoCard: {
      borderColor: theme.palette.grey[500],
      padding: theme.spacing(1),
      borderStyle: 'dashed',
      cursor: 'pointer',
      '&:hover': {},
    },
    todoCardContent: {
      display: 'flex',
      padding: theme.spacing(1),
      '&:last-child': {
        paddingBottom: theme.spacing(1),
      },
    },
    addIcon: {
      fontSize: 40
    }
  }),
);
