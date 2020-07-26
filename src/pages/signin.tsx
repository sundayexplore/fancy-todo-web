import React, { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Container, CustomHead } from '@/components';
import { userAPI } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';

export interface ISignInParams {}

export default function SignIn({}: ISignInParams) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userIdentifier: '',
    password: '',
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (
    e:
      | FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
      | MouseEvent<any>,
  ) => {
    e.preventDefault();
    const { userIdentifier, password } = signInData;

    try {
      const { data } = await userAPI.post('/signin', {
        userIdentifier,
        password,
      });
      console.log({ data });
      dispatch(setUser(data.user));
      router.push('/app');
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      <CustomHead title='Sign In' />
      <Container>
        <Card>
          <div>
            <Typography variant={`h4`}>Welcome back!</Typography>
          </div>
          <CardContent>
            <form
              onSubmit={handleSignIn}
              noValidate={false}
              autoComplete={`on`}
            >
              <TextField
                label={`Username or Email`}
                name={`userIdentifier`}
                required
                value={signInData.userIdentifier}
                onChange={handleOnChange}
              />
              <TextField
                label={`Password`}
                name={`password`}
                required
                type={`password`}
                value={signInData.password}
                onChange={handleOnChange}
              />
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      padding: '3ch',
    },
    cardFormSection: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    signInForm: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > *': {
        width: '100%',
        margin: '1ch 0',
      },
    },
    formTitle: {
      textAlign: 'left',
      lineHeight: 1,
      margin: 0,
      width: '100%',
    },
    signInButton: {
      marginTop: '1ch',
    },
  }),
);
