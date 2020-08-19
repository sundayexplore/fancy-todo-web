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
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

import { Container, CustomHead } from '@/components';
import { userAPI } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';

export interface ISignInPageProps {}

export default function SignIn({}: ISignInPageProps) {
  const classes = useStyles({});
  const router = useRouter();
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userIdentifier: '',
    password: '',
  });
  const [showInputPassword, setShowInputPassword] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/app');
    }
  }, []);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
    e.preventDefault();
    const { userIdentifier, password } = signInData;

    try {
      const { data } = await userAPI.post('/signin', {
        userIdentifier,
        password,
      });
      dispatch(setUser(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/app');
    } catch (err) {
      if (err.response) {
        console.log({ errResponse: err.response });
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
              />
              <TextField
                label={`Password`}
                name={`password`}
                required
                type={showInputPassword ? `text` : `password`}
                value={signInData.password}
                onChange={handleOnChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={`end`}>
                      <IconButton
                        onClick={() => setShowInputPassword(!showInputPassword)}
                        onMouseDown={(e) => e.preventDefault()}
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
              />
              <Button
                classes={{ root: classes.signInButton }}
                component={`a`}
                color={`primary`}
                variant={`contained`}
                type={`submit`}
                onSubmit={handleSignIn}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles<Theme, ISignInPageProps>((theme) =>
  createStyles({
    cardContainer: {
      padding: theme.spacing(6),
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
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
      },
    },
    signInButton: {
      marginTop: '3ch',
    },
  }),
);
