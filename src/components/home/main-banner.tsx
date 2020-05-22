import React, { useState, FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { getTheme, TextField, PrimaryButton } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ProgressBanner from '@/assets/svgs/home/progress-banner.svg';

export interface IMainBannerProps {}

export default function MainBanner(props: IMainBannerProps) {
  const {} = props;
  const router = useRouter();
  const classes = useStyles();
  const [getStartedData, setGetStartedData] = useState({
    email: ''
  });

  const handleTextChange = (type: 'email', target: string | any) => {
    switch (type) {
      case 'email':
        setGetStartedData({ ...getStartedData, email: target });
        break;
    }
  };

  const handleSubmit = (
    e:
      | FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
      | MouseEvent<HTMLButtonElement | any>
  ) => {
    e.preventDefault();
    if (getStartedData.email.length) {
      router.push({ pathname: '/signup', query: { email: getStartedData.email } });
    } else {
      router.push('/signup');
    }
  };

  return (
    <section className={classes.mainBannerWrapper}>
      <section className={classes.leftSection}>
        <ProgressBanner />
      </section>
      <section className={classes.rightSection}>
        <div className={classes.captionDiv}>
          <h1>Fancy Todo</h1>
          <p>
            Enable you to organize and prioritize your projects in a fun,
            flexible, and rewarding way.
          </p>
        </div>
        <form onSubmit={handleSubmit} className={classes.getStartedForm}>
          <TextField
            value={getStartedData.email}
            onChange={(e, val) => handleTextChange('email', val)}
            placeholder="Email"
            className={classes.getStartedTextField}
          />
          <PrimaryButton
            type="submit"
            onSubmit={handleSubmit}
            onClick={handleSubmit}
          >
            Get Started!
          </PrimaryButton>
        </form>
      </section>
    </section>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    mainBannerWrapper: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    leftSection: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 5ch',
      '& > svg': {
        width: '100%',
        height: '100%'
      }
    },
    rightSection: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      justifyItems: 'center',
      alignContent: 'center',
      padding: '5ch'
    },
    getStartedForm: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: '1ch 0'
      }
    },
    getStartedTextField: {
      width: '100%',
      '& > .ms-TextField-wrapper div': {
        height: '6ch',
      },
      '& > .ms-TextField-wrapper div input': {
        fontSize: '1.2em',
        lineHeight: 1,
        '&::placeholder': {
          fontSize: '1em',
          lineHeight: 1
        }
      }
    },
    captionDiv: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      '& > h1': {
        margin: 0,
        padding: 0,
        fontSize: '4em'
      },
      '& > p': {
        margin: 0,
        padding: '1ch 0',
        fontSize: '1.5em'
      }
    }
  })
);
