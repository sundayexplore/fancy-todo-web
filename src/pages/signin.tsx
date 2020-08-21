import React, {
  useState,
  useEffect,
  FormEvent,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

import { Container, CustomHead } from '@/components';
import { userAPI, CustomValidator } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';

// Types
import { IAlertOptions, ISignInValidations, ICustomValidator, IValidationFromAPI } from '@/types';

export interface ISignInPageProps {}

export default function SignIn({}: ISignInPageProps) {
  const classes = useStyles({});
  const router = useRouter();
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userIdentifier: '',
    password: '',
  });
  const [signInErrors, setSignInErrors] = useState<ISignInValidations>({
    userIdentifier: null,
    password: null,
  });
  const [showInputPassword, setShowInputPassword] = useState<boolean>(false);
  const [alertOptions, setAlertOptions] = useState<IAlertOptions>({
    severity: 'info',
    message: '',
    open: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const checkSignInErrors = () => {
    const {
      userIdentifier,
      password,
    } = signInData;
    const checkedSignInErrors: ISignInValidations = {
      userIdentifier: CustomValidator.userIdentifier(userIdentifier),
      password: CustomValidator.password(password),
    };

    setSignInErrors({
      ...signInErrors,
      ...checkedSignInErrors,
    });

    if (
      Object.values(checkedSignInErrors).every(
        (checkedSignInError) => checkedSignInError === null,
      )
    ) {
      return true;
    }

    return false;
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSignInErrors({
      ...signInErrors,
      [e.target.name]: (CustomValidator as ICustomValidator)[e.target.name](
        e.target.value
      ),
    });

    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (
    e:
      | FormEvent<
          | HTMLFormElement
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLAnchorElement
        >
      | MouseEvent<HTMLAnchorElement>,
  ) => {
    setLoading(true);
    e.preventDefault();
    const { userIdentifier, password } = signInData;

    try {
      if (checkSignInErrors()) {
        const { data } = await userAPI.post('/signin', {
          userIdentifier,
          password,
        });
        setLoading(false);
        dispatch(setUser(data.user));
        localStorage.setItem('user', JSON.stringify(data.user));
        setAlertOptions({
          severity: 'success',
          message: data.message,
          open: true,
        });
        await router.push('/app');
      } else {
        setLoading(false);
        // handle here
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            if (err.response.data.messages) {
              const signInErrorsFromAPI: ISignInValidations = {} as ISignInValidations;
              err.response.data.messages.forEach(
                (signInError: IValidationFromAPI) => {
                  signInErrorsFromAPI[signInError.name] = signInError.message;
                },
              );
              setSignInErrors({
                ...signInErrors,
                ...signInErrorsFromAPI,
              });
            }

            setAlertOptions({
              ...alertOptions,
              severity: 'error',
              message: err.response.data.message,
              open: true,
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
      <CustomHead title='Sign In' />
      <Container>
        <Card classes={{ root: classes.cardContainer }}>
          <Typography variant={`h4`} gutterBottom>
            Welcome back!
          </Typography>
          <CardContent classes={{ root: classes.cardFormSection }}>
            <form
              className={classes.signInForm}
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
                error={
                  signInErrors.userIdentifier !== null &&
                  signInErrors.userIdentifier.length > 0
                }
                helperText={signInErrors.userIdentifier}
                disabled={loading}
              />
              <TextField
                label={`Password`}
                name={`password`}
                required
                type={showInputPassword ? `text` : `password`}
                value={signInData.password}
                onChange={handleOnChange}
                error={
                  signInErrors.password !== null &&
                  signInErrors.password.length > 0
                }
                helperText={signInErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={`end`}>
                      <IconButton
                        onClick={() => setShowInputPassword(!showInputPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        disabled={loading}
                      >
                        {showInputPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={loading}
              />
              <Button
                classes={{ root: classes.signInButton }}
                component={`a`}
                color={`primary`}
                variant={`contained`}
                type={`submit`}
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : `Sign In`}
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <Button color={`primary`} onClick={() => router.push('/signup')}>
              Create account
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

const useStyles = makeStyles<Theme, ISignInPageProps>((theme) =>
  createStyles({
    cardContainer: {
      padding: theme.spacing(4),
    },
    cardFormSection: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInForm: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > *': {
        width: '100%',
      },
      '& > .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 250,
        flexGrow: 1
      }
    },
    signInButton: {
      marginTop: theme.spacing(3),
    },
  }),
);
