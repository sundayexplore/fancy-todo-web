import React, { useState, FormEvent } from 'react';
import { FontSizes, getTheme, TextField } from '@fluentui/react';
import { Card, CardSection, CardItem } from '@uifabric/react-cards';
import { makeStyles } from '@material-ui/core/styles';

import { Container, CustomHead } from '@/components';

export interface ISignInParams {}

export default function SignIn(params: ISignInParams) {
  const {} = params;
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

  const handleFormSubmit = () => {
    console.log({ signInData });
  };

  return (
    <>
      <CustomHead title="Sign In" />
      <Container>
        <Card>
          <form onSubmit={handleFormSubmit}>
            <TextField
              ariaLabel="Username or password"
              autoAdjustHeight
              autoComplete="on"
              label="Username or password"
              value={signInData.userIdentifier}
              onChange={(e, val) => handleOnChange('userIdentifier', val)}
            />
          </form>
        </Card>
      </Container>
    </>
  );
}

const theme = getTheme();
