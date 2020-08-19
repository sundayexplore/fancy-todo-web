import React, { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Theme,
  IconButton,
} from '@material-ui/core';
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

import { Container, CustomHead } from '@/components';
import { userAPI, CustomValidator } from '@/utils';
import { ISignUpData, ISignUpValidations } from '@/types';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';

export interface ISignUpPageProps {}

export default function SignUp({}: ISignUpPageProps) {
  const classes = useStyles({});
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
  const [signUpErrors, setSignUpErrors] = useState<ISignUpValidations>({
    firstName: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const checkSignUpErrors = () => {
    const {
      firstName,
      username,
      email,
      password,
      confirmPassword,
    } = signUpData;
    const checkedSignUpErrors: ISignUpValidations = {
      firstName: CustomValidator.firstName(firstName),
      username: CustomValidator.username(username),
      email: CustomValidator.email(email),
      password: CustomValidator.password(password),
      confirmPassword: CustomValidator.confirmPassword(
        password,
        confirmPassword,
      ),
    };

    setSignUpErrors({
      ...signUpErrors,
      ...checkedSignUpErrors,
    });

    if (
      Object.values(checkedSignUpErrors).every(
        (checkedSignUpError) => checkedSignUpError === null,
      )
    ) {
      return true;
    }

    return false;
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (
    e:
      | FormEvent<
          | HTMLFormElement
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLAnchorElement
        >
      | MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = signUpData;
    try {
      if (checkSignUpErrors()) {
        const { data } = await userAPI.post('/signup', {
          firstName,
          lastName,
          username,
          email,
          password,
        });
        dispatch(setUser(data.user));
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/app');
      } else {
        // throw something to the snackbar
      }
    } catch (err) {
      if (err.response) {
        console.log({ errResponse: err.response });
      }
    }
  };

  return (
    <>
      <CustomHead title='Sign Up' />
      <Container>
        <Card classes={{ root: classes.cardContainer }}>
          <div className={classes.formTitle}>
            <Typography variant={`h4`}>Let's get started!</Typography>
          </div>
          <CardContent classes={{ root: classes.cardFormSection }}>
            <form
              className={classes.signUpForm}
              onSubmit={handleSignUp}
              noValidate={false}
              autoComplete={`on`}
            >
              <div className={classes.textFieldGroupHorizontal}>
                <TextField
                  name={`firstName`}
                  required
                  label={`First Name`}
                  value={signUpData.firstName}
                  onChange={handleOnChange}
                  error={
                    signUpErrors.firstName !== null &&
                    signUpErrors.firstName.length > 0
                  }
                  helperText={signUpErrors.firstName}
                />
                <TextField
                  name={`lastName`}
                  label={`Last Name`}
                  value={signUpData.lastName}
                  onChange={handleOnChange}
                />
              </div>
              <div className={classes.textFieldGroupVertical}>
                <TextField
                  name={`username`}
                  required
                  label={`Username`}
                  value={signUpData.username}
                  onChange={handleOnChange}
                  error={
                    signUpErrors.username !== null &&
                    signUpErrors.username.length > 0
                  }
                  helperText={
                    signUpErrors.username !== null &&
                    signUpErrors.username.length > 0
                      ? signUpErrors.username
                      : `Must be at least 6 characters.`
                  }
                />
                <TextField
                  name={`email`}
                  required
                  type={`email`}
                  label={`Email`}
                  value={signUpData.email}
                  onChange={handleOnChange}
                  error={
                    signUpErrors.email !== null && signUpErrors.email.length > 0
                  }
                  helperText={signUpErrors.email}
                />
              </div>
              <div className={classes.textFieldGroupHorizontal}>
                <TextField
                  name={`password`}
                  required
                  type={showPassword ? `text` : `password`}
                  label={`Password`}
                  value={signUpData.password}
                  onChange={handleOnChange}
                  error={
                    signUpErrors.password !== null &&
                    signUpErrors.password.length > 0
                  }
                  helperText={
                    signUpErrors.password !== null &&
                    signUpErrors.password.length > 0
                      ? signUpErrors.password
                      : `Must contain number, special character, and upper-case letter.`
                  }
                />
                <TextField
                  name={`confirmPassword`}
                  required
                  type={showPassword ? `text` : `password`}
                  label={`Confirm Password`}
                  value={signUpData.confirmPassword}
                  onChange={handleOnChange}
                  error={
                    signUpErrors.confirmPassword !== null &&
                    signUpErrors.confirmPassword.length > 0
                  }
                  helperText={signUpErrors.confirmPassword}
                />

                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>

              <Button
                classes={{ root: classes.signUpButton }}
                component={`a`}
                variant={`contained`}
                color={`primary`}
                type={`submit`}
                onSubmit={handleSignUp}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles<Theme, ISignUpPageProps>((theme) =>
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
    signUpForm: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > *': {
        width: '100%',
      },
    },
    formTitle: {
      textAlign: 'left',
      lineHeight: 1,
      margin: 0,
      width: '100%',
    },
    signUpButton: {
      marginTop: theme.spacing(4),
    },
    textFieldGroupHorizontal: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        flexGrow: 1,
      },
      '& > .MuiTextField-root:first-child': {
        paddingRight: theme.spacing(3),
      },
      '& > .MuiIconButton-root': {
        alignSelf: 'center'
      }
    },
    textFieldGroupVertical: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '& > .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        flexGrow: 1,
      },
    },
  }),
);
