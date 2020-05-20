import React, { ReactNode, ReactChildren } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface IContainerProps {
  display?: 'flex' | 'grid' | string | undefined;
  justify?: 'center' | 'start' | 'end' | string | undefined;
  align?: 'center' | 'start' | 'end' | string | undefined;
  children?: ReactNode;
}

export default function Container(props: IContainerProps) {
  const {
    display = 'flex',
    justify = 'center',
    align = 'center'
  } = props;
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      containerFlex: {
        display: 'flex',
        justifyContent:
          justify == 'start'
            ? 'flex-start'
            : justify == 'end'
            ? 'flex-end'
            : justify,
        alignItems:
          align == 'start' ? 'flex-start' : align == 'end' ? 'flex-end' : align,
        width: '100%',
        height: '100%',
        minHeight: '100vh'
      },
      containerGrid: {
        display: 'grid',
        justifyItems: justify,
        alignContent: align,
        width: '100%',
        height: '100%',
        minHeight: '100vh'
      }
    })
  )();

  return (
    <main
      className={
        display == 'flex' ? classes.containerFlex : classes.containerGrid
      }
    >
      {props.children}
    </main>
  );
}
