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
    }
  };

  return (
    <section className={classes.mainBannerWrapper}>
      <section className={classes.leftSection}>
        <ProgressBanner />
      </section>
      <section className={classes.rightSection}>
        <div>
          <h1>Fancy Todo</h1>
          <p>
            Enable you to organize and prioritize your projects in a fun,
            flexible, and rewarding way.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            value={getStartedData.email}
            onChange={(e, val) => handleTextChange('email', val)}
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
      alignContent: 'center'
    }
  })
);
