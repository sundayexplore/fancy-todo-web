import React from 'react';
import { getTheme, IconButton, TooltipHost } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Logo from '@/assets/svgs/open-source.svg';

export interface IDemoTodoListHeaderProps {}

export default function DemoTodoListHeader(props: IDemoTodoListHeaderProps) {
  const classes = useStyles();

  return (
    <header className={classes.demoTodoListHeaderWrapper}>
      <section className={classes.leftSection}>
        <Logo className={classes.headerLogo} />
      </section>
      <section className={classes.rightSection}>
        <TooltipHost content="Add Todo">
          <IconButton
            className={classes.addIcon}
            iconProps={{ iconName: 'Add' }}
            title="Add Todo"
            ariaLabel="Demo Add Todo"
          />
        </TooltipHost>
      </section>
    </header>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    demoTodoListHeaderWrapper: {
      background: theme.palette.blueLight,
      height: '5ch',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '1ch 1.5ch',
      // borderRadius: '8px 8px 0 0'
    },
    leftSection: {
      gridColumn: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    headerLogo: {
      width: 'auto',
      height: '3ch'
    },
    rightSection: {
      gridColumn: 2,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    addIcon: {
      color: theme.palette.neutralLighterAlt,
      '& > span > i': {
        fontWeight: 'bolder'
      },
      '&:hover': {
        color: theme.palette.blueLight
      }
    }
  })
);
