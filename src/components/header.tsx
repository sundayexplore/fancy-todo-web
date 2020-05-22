import React, { useState, useEffect } from 'react';
import { getTheme, Callout } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Link } from '@/components';
import Logo from '@/assets/svgs/open-source.svg';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const classes = useStyles();
  const [headerScroll, setHeaderScroll] = useState(false);
  const [showCallouts, setShowCallouts] = useState({
    developers: false
  });

  const handleHeaderScrollAnimation = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setHeaderScroll(true);
    } else {
      setHeaderScroll(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleHeaderScrollAnimation);

    return () => {
      document.removeEventListener('scroll', handleHeaderScrollAnimation);
    }
  }, []);

  return (
    <header className={`${classes.headerContainer} ${headerScroll ? classes.headerScroll : ''}`}>
      <section className={classes.leftSection}>
        <Link href="/">
          <Logo className={classes.logo} />
        </Link>
        <nav className={classes.leftSectionNav}>
          <Link href="/features" customActiveClassName={classes.navLinkActive}>
            <div className={classes.navLink}>Features</div>
          </Link>
          <Link
            href="/developers"
            customActiveClassName={classes.navLinkActive}
          >
            <div
              className={classes.navLink}
              id="developersHeaderNavLink"
              onMouseEnter={() =>
                setShowCallouts({ ...showCallouts, developers: true })
              }
              onMouseLeave={() =>
                setShowCallouts({ ...showCallouts, developers: false })
              }
            >
              Developers
            </div>
          </Link>
          {showCallouts.developers && (
            <Callout
              gapSpace={0}
              target="#developersHeaderNavLink"
              onDismiss={() =>
                setShowCallouts({ ...showCallouts, developers: false })
              }
              onMouseEnter={() =>
                setShowCallouts({ ...showCallouts, developers: true })
              }
              onMouseLeave={() =>
                setShowCallouts({ ...showCallouts, developers: false })
              }
            >
              {/* API Docs, etc. */}
            </Callout>
          )}
          <Link href="/about" customActiveClassName={classes.navLinkActive}>
            <div className={classes.navLink}>About</div>
          </Link>
        </nav>
      </section>
      <section className={classes.rightSection}>
        <nav className={classes.rightSectionNav}>
          <Link href="/signin" customActiveClassName={classes.navLinkActive}>
            <div className={classes.navLink}>Sign In</div>
          </Link>
          <Link
            href="/developers"
            customActiveClassName={classes.navLinkActive}
          >
            <div className={`${classes.navLink} ${classes.signUpBtn}`}>
              Sign Up
            </div>
          </Link>
        </nav>
      </section>
    </header>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      width: '100%',
      height: '8ch',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 333,
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'center',
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '1ch 8ch',
      transition: 'box-shadow 1s ease, background 1s ease'
    },
    headerScroll: {
      boxShadow: `0px 0px 10px ${theme.palette.neutralDark}`,
      background: theme.palette.white
    },
    leftSection: {
      gridColumn: 1,
      gridRow: 1,
      width: '100%',
      height: '100%',
      float: 'left',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    rightSection: {
      gridColumn: 2,
      gridRow: 1,
      width: '100%',
      height: '100%',
      float: 'right',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    logo: {
      width: 'auto',
      height: '5vw',
      cursor: 'pointer'
    },
    leftSectionNav: {
      display: 'flex',
      marginLeft: '5ch',
      height: '100%',
      alignItems: 'center'
    },
    rightSectionNav: {
      display: 'flex',
      height: '100%',
      alignItems: 'center'
    },
    navLink: {
      color: theme.palette.neutralSecondary,
      width: 'auto',
      height: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1ch',
      borderBottom: `3px solid transparent`,
      '&:hover': {
        color: theme.palette.neutralDark,
        background: theme.palette.neutralLighterAlt,
        borderBottom: `3px solid ${theme.palette.blueLight}`
      }
    },
    navLinkActive: {
      color: theme.palette.neutralDark,
      background: theme.palette.neutralLight,
      borderBottom: `3px solid ${theme.palette.blueLight}`
    },
    signUpBtn: {
      color: theme.palette.blueLight,
      '&:hover': {
        color: theme.palette.blueLight
      }
    },
    calloutNav: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  })
);
