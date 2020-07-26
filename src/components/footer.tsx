import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Link } from '@/components';
import DockerLogo from '@/assets/svgs/docker.svg';
import GitHubLogo from '@/assets/svgs/github.svg';
import LinkedInLogo from '@/assets/svgs/linked-in.svg';

export interface IFooterProps {}

export default function Footer({}: IFooterProps) {
  const classes = useStyles();
  const [socialLinks, setSocialLinks] = useState({
    docker: 'https://hub.docker.com/u/rafiandria23',
    github: 'https://github.com/sunday-projects',
    linkedIn: 'https://linkedin.com/in/rafiandria23',
    projectClientWebGitHubRepo: 'https://github.com/sunday-projects/fancy-todo-web',
    projectApiGitHubRepo: 'https://github.com/sunday-projects/fancy-todo-api',
    projectApiDockerHubRepo: 'https://hub.docker.com/r/rafiandria23/fancy-todo-api'
  });
  const [localLinks, setLocalLinks] = useState({
    apiDocs: '/developers/api-docs',
    about: '/about',
    features: '/features'
  });

  return (
    <footer className={classes.footerWrapper}>
      <section className={classes.footerDevelopersSection}>
        <h4>Developers</h4>
        <nav>
          <Link href={localLinks.apiDocs}>
            <div className={classes.footerNavLink}>API Documentation</div>
          </Link>
        </nav>
      </section>
      <section className={classes.footerProjectSection}>
        <h4>Project</h4>
        <nav>
          <Link href={localLinks.about}>
            <div className={classes.footerNavLink}>About</div>
          </Link>
          <Link href={localLinks.features}>
            <div className={classes.footerNavLink}>Features</div>
          </Link>
        </nav>
      </section>
      <section className={classes.footerCopyrightSection}>
        <span>Copyright &copy; {new Date().getFullYear()} Sunday Explore &mdash; an Open Source Organization. All rights reserved.</span>
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
    gridRowGap: '8ch',
    padding: '4ch 8ch',
    zIndex: 222,
    // background: theme.palette.neutralLighter,
    '& > section': {
      width: '100%',
      height: '100%'
    },
    '& > section h4': {
      margin: 0,
      marginBottom: '1ch',
      // color: theme.palette.neutralPrimary
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
  footerDevelopersSection: {
    gridColumn: 2,
    gridRow: 1
  },
  footerProjectSection: {
    gridColumn: 3,
    gridRow: 1
  },
  footerNavLink: {
    cursor: 'pointer',
    // color: theme.palette.neutralSecondary,
    '&:hover': {
      textDecoration: 'underline',
      // color: theme.palette.neutralPrimary
    }
  },
  socialIconsSection: {
    gridColumn: 4,
    gridRow: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
        // color: theme.palette.neutralSecondary,
        transition: 'color 1s ease',
        '&:hover': {
          // color: theme.palette.neutralPrimaryAlt
        }
      }
    }
  },
  footerCopyrightSection: {
    gridColumn: '1 / span 2',
    gridRow: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > span': {
      // fontSize: FontSizes.medium,
      // color: theme.palette.neutralPrimary
    }
  }
}));
