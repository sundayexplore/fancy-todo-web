import React, { useState, FormEvent } from 'react';
import { FontSizes, getTheme, TextField, PrimaryButton } from '@fluentui/react';
import { Card, CardSection } from '@uifabric/react-cards';
import { makeStyles } from '@material-ui/core/styles';

import { Container, CustomHead } from '@/components';
import { Validate } from '@/utils';

export interface ISignInParams {}

export interface ISignInData {
  userIdentifier: string;
  password: string;
}

export interface IValidations {
  [key: string]: string;
}

export default function SignIn(params: ISignInParams) {
  const {} = params;
  const classes = useStyles();
  const [errMessages, setErrMessages] = useState({
    userIdentifier: '',
    password: ''
  });
  const [signInData, setSignInData] = useState({
    userIdentifier: '',
    password: ''
  });

  const handleOnChange = (
    type: 'userIdentifier' | 'password',
    target: string | any
  ) => {
    switch (type) {
      case 'userIdentifier':
        setSignInData({ ...signInData, userIdentifier: target });
        break;

      case 'password':
        setSignInData({ ...signInData, password: target });
        break;
    }
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const passed = 'passed';
    const validations: IValidations = {
      userIdentifier:
        Validate.userIdentifier(signInData.userIdentifier) || passed,
      password: Validate.password(signInData.password) || passed
    };
    if (
      Object.values(validations).every((status: string) => status == passed)
    ) {
      console.log({ signInData });
    } else {
      const prevErrMessages: any = { ...errMessages };
      for (const key in validations) {
        if (validations[key] != passed) {
          prevErrMessages[key] = validations[key];
        } else {
          prevErrMessages[key] = '';
        }
      }
      setErrMessages(prevErrMessages);
    }
  };

  return (
    <>
      <CustomHead title="Sign In" />
      <Container>
        <Card className={classes.cardContainer}>
          <CardSection className={classes.cardFormSection}>
            <form onSubmit={handleFormSubmit} className={classes.signInForm}>
              <TextField
                ariaLabel="Username or password"
                autoAdjustHeight
                autoComplete="on"
                autoFocus
                label="Username or password"
                value={signInData.userIdentifier}
                required
                errorMessage={errMessages.userIdentifier}
                onChange={(e, val) => handleOnChange('userIdentifier', val)}
              />
              <TextField
                ariaLabel="Password"
                autoAdjustHeight
                autoComplete="on"
                type="password"
                label="Password"
                value={signInData.password}
                required
                errorMessage={errMessages.password}
                onChange={(e, val) => handleOnChange('password', val)}
              />
              <PrimaryButton
                className={classes.signInButton}
                type="submit"
                onSubmit={handleFormSubmit}
              >
                Sign In
              </PrimaryButton>
            </form>
          </CardSection>
        </Card>
      </Container>
    </>
  );
}

const theme = getTheme();
const useStyles = makeStyles({
  cardContainer: {
    padding: '5ch 3ch'
  },
  cardFormSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  signInForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *': {
      width: '100%'
    }
  },
  signInButton: {
    marginTop: '2ch'
  }
});
