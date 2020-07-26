import React, {
  ReactNode,
  ReactElement,
  cloneElement,
  ReactChildren
} from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface ILinkProps {
  href: string | any;
  children: ReactNode | ReactElement | ReactChildren | any;
  customActiveClassName?: string | any;
}

export default function Link(props: ILinkProps) {
  const { href, children, customActiveClassName } = props;
  const router = useRouter();
  const classes = useStyles();

  let className = children.props.className || '';
  if (router.pathname == href) {
    className = `${className} ${customActiveClassName || classes.selected}`;
  }

  return (
    <NextLink href={href}>{cloneElement(children, { className })}</NextLink>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    selected: {
      // color: theme.palette.neutralDark
    }
  })
);
