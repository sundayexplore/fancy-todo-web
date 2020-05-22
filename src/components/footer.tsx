import React, { useState } from 'react';
import { getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Link } from '@/components';
import DockerLogo from '@/assets/svgs/docker.svg';
import GitHubLogo from '@/assets/svgs/github.svg';
import LinkedInLogo from '@/assets/svgs/linked-in.svg';

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  const classes = useStyles();
  const [socialLinks, setSocialLinks] = useState({
    docker: '',
    github: 'https://github.com/sunday-projects',
    linkedIn: 'https://linkedin.com/in/rafiandria23'
  });

  return (
    <footer className={classes.footerWrapper}>
      <section>
      </section>
      <section>
        <h4>Developers</h4>
        <nav>
          <Link href="/developers/api-docs">
            <div className={classes.footerNavLink}>API Documentation</div>
          </Link>
        </nav>
      </section>
      <section>
        <h4>Project</h4>
        <nav>
          <Link href="/about">
            <div className={classes.footerNavLink}>About</div>
          </Link>
        </nav>
      </section>
      <section>
      </section>
      <section className={classes.socialIconsSection}>
        <nav>
          <a href={socialLinks.github} target="_blank">
            <GitHubLogo />
          </a>
          <a href={socialLinks.docker} target="_blank">
            <DockerLogo />
          </a>
          <a href={socialLinks.linkedIn} target="_blank">
            <LinkedInLogo />
          </a>
        </nav>
      </section>
    </footer>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  footerWrapper: {
    width: '100%',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    justifyItems: 'center',
    alignContent: 'center',
    padding: '4ch 8ch',
    zIndex: 333,
    background: theme.palette.neutralLighter,
    '& > section': {
      width: '100%',
      height: '100%'
    },
    '& > section h4': {
      margin: 0,
      marginBottom: '1ch'
    },
    '& > section nav': {
      width: 'fit-content'
    }
  },
  footerLogoSection: {
    gridColumn: 1,
    gridRow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& > *': {
      height: '10ch',
      width: 'auto'
    }
  },
  footerNavLink: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  socialIconsSection: {
    gridColumn: 4,
    gridRow: 2,
    width: '100%',
    height: '100%',
    paddingTop: '2ch',
    '& > nav': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
      '& > a': {
        margin: '0 2ch'
      },
      '& > a > svg': {
        height: '5ch',
        width: 'auto',
        color: theme.palette.neutralSecondary,
        transition: 'color 1s ease',
        '&:hover': {
          color: theme.palette.neutralPrimaryAlt
        }
      }
    }
  }
}));
