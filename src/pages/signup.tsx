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
import { ISignUpData } from '@/types';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';

export interface ISignUpParams {}

export default function SignUp({}: ISignUpParams) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSignUpData(
      e.target.validity.valid
        ? { ...signUpData, [e.target.name]: e.target.value }
        : { ...signUpData },
    );
  };

  const handleSignUp = async (
    e:
      | FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
      | MouseEvent<any>,
  ) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = signUpData;

    try {
      const { data } = await userAPI.post('/signup', {
        firstName,
        lastName,
        username,
        email,
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
          <CardHeader>
            <Typography>Sign Up</Typography>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSignUp}
              noValidate={false}
              autoComplete={`on`}
            >
              <div>
                <TextField
                  name={`firstName`}
                  required
                  label={`First Name`}
                  value={signUpData.firstName}
                  onChange={handleOnChange}
                />
                <TextField
                  name={`lastName`}
                  label={`Last Name`}
                  value={signUpData.lastName}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <TextField
                  name={`username`}
                  required
                  label={`Username`}
                  value={signUpData.username}
                  onChange={handleOnChange}
                />
                <TextField
                  name={`email`}
                  required
                  type={`email`}
                  label={`Email`}
                  value={signUpData.email}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <TextField
                  name={`password`}
                  required
                  type={`password`}
                  label={`Password`}
                  value={signUpData.password}
                  onChange={handleOnChange}
                />
                <TextField
                  name={`confirmPassword`}
                  required
                  type={`password`}
                  label={`Confirm Password`}
                  value={signUpData.confirmPassword}
                  onChange={handleOnChange}
                />
              </div>
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
