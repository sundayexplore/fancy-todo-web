import React, {
  useState,
  useEffect,
  FormEvent,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Theme,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

import { Container, CustomHead } from '@/components';
import { userAPI, CustomValidator } from '@/utils';
import {
  ISignUpData,
  ISignUpValidations,
  IAlertOptions,
  IValidationFromAPI,
  ICustomValidator,
} from '@/types';

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
  const [alertOptions, setAlertOptions] = useState<IAlertOptions>({
    severity: 'info',
    message: '',
    open: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

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
    if (e.target.name !== `lastName`) {
      setSignUpErrors({
        ...signUpErrors,
        [e.target.name]: (CustomValidator as ICustomValidator)[e.target.name](
          e.target.value,
        ),
      });
    }

    if (e.target.name === `confirmPassword`) {
      setSignUpErrors({
        ...signUpErrors,
        confirmPassword: CustomValidator.confirmPassword(
          signUpData.password,
          e.target.value,
        ),
      });
    }

    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (
    e:
      | FormEvent<
          | HTMLFormElement
          | HTMLInputElement
          | HTMLTextAreaElement
        >
      | MouseEvent<HTMLButtonElement>,
  ) => {
    setLoading(true);
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
        setAlertOptions({
          severity: 'success',
          message: data.message,
          open: true,
        });
        await router.push('/app');
        setLoading(false);
      } else {
        setLoading(false);
        // throw something to the snackbar
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            const signUpErrorsFromAPI: ISignUpValidations = {} as ISignUpValidations;
            setAlertOptions({
              ...alertOptions,
              severity: 'error',
              message: err.response.data.message,
              open: true,
            });
            err.response.data.messages.forEach(
              (signUpError: IValidationFromAPI) => {
                signUpErrorsFromAPI[signUpError.name] = signUpError.message;
              },
            );
            setSignUpErrors({
              ...signUpErrors,
              ...signUpErrorsFromAPI,
            });
            break;

          default:
            setAlertOptions({
              ...alertOptions,
              severity: 'error',
              message: err.response.data.message,
              open: true,
            });
            break;
        }

        setLoading(false);
      }
    }
  };

  return (
    <>
      <CustomHead title='Sign Up' />
      <Container>
        <Card classes={{ root: classes.cardContainer }}>
          <Typography variant={`h4`} gutterBottom>Let's get started!</Typography>
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
                  disabled={loading}
                />
                <TextField
                  name={`lastName`}
                  label={`Last Name`}
                  value={signUpData.lastName}
                  onChange={handleOnChange}
                  disabled={loading}
                />
              </div>
              <div className={classes.textFieldGroupVertical}>
                <TextField
                  autoComplete={`username`}
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
                  disabled={loading}
                />
                <TextField
                  autoComplete={`email`}
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
                  disabled={loading}
                />
              </div>
              <div className={classes.textFieldGroupHorizontal}>
                <TextField
                  autoComplete={`new-password`}
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
                  disabled={loading}
                />
                <TextField
                  autoComplete={`new-password`}
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
                  disabled={loading}
                />

                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  disabled={loading}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>

              <Button
                classes={{ root: classes.signUpButton }}
                variant={`contained`}
                color={`primary`}
                type={`submit`}
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : `Sign Up`}
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <Button color={`primary`} onClick={() => router.push('/signin')}>
              Sign in instead
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Snackbar
        open={alertOptions.open}
        onClose={() => setAlertOptions({ ...alertOptions, open: false })}
      >
        <Alert
          severity={alertOptions.severity}
          onClose={() => setAlertOptions({ ...alertOptions, open: false })}
          variant={`filled`}
          elevation={6}
        >
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const useStyles = makeStyles<Theme, ISignUpPageProps>((theme) =>
  createStyles({
    cardContainer: {
      padding: theme.spacing(4),
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
      alignItems: 'stretch',
      '& > .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        flexGrow: 1,
        width: 250,
      },
      '& > .MuiTextField-root:first-child': {
        [theme.breakpoints.down('xs')]: {
          paddingRight: 0,
        },
        paddingRight: theme.spacing(3),
      },
      '& > .MuiIconButton-root': {
        alignSelf: 'center',
      },
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
