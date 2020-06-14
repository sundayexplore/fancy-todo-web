import { getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const theme = getTheme();

export default makeStyles(() => createStyles({
  primaryButton: {
    backgroundColor: theme.palette.blueLight,
    borderColor: theme.palette.blueLight,
    opacity: 0.7,
    transition: 'opacity 1s ease',
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.blueLight,
      borderColor: theme.palette.blueLight
    }
  },
  textField: {
    '& > .ms-TextField-wrapper div': {
      borderColor: theme.palette.blueLight,
      '&::after': {
        borderColor: theme.palette.blueLight
      },
    },
  }
}));
