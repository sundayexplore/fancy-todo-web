import React, { useState } from 'react';
import { getTheme, TextField } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ProgressBanner from '@/assets/svgs/home/progress-banner.svg';

export interface IMainBannerProps {}

export default function MainBanner(props: IMainBannerProps) {
  const {} = props;
  const styles = useStyles();
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

  return (
    <section id={styles.mainBannerWrapper}>
      <section className={styles.leftSection}>
        <ProgressBanner />
      </section>
      <section className={styles.rightSection}>
        <div>
          <h1>Fancy Todo</h1>
          <p>
            Enable you to organize and prioritize your projects in a fun,
            flexible, and rewarding way.
          </p>
        </div>
        <div>
          <TextField
            value={getStartedData.email}
            onChange={(e, val) => handleTextChange('email', val)}
          />
        </div>
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
      alignItems: 'center'
    },
    rightSection: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
);
