import React from 'react';
import { email } from 'utils/formHelper';
import { Form } from 'react-final-form';
import { TextField, makeValidateSync } from 'mui-rff';
import * as Yup from 'yup';
import { Button, CircularProgress } from '@material-ui/core';
import { objectType } from 'types';

interface Props {
  classes: Record<'form' | 'submit' | 'buttonProgress', string>;
  loading: boolean;
  initialValues: objectType;
  onSubmitForm: (values: object & { email: string; password: string }) => void;
}

export const FormLogin = ({
  loading,
  classes,
  initialValues,
  onSubmitForm,
}: Props) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
  });

  const validate = makeValidateSync(schema);

  return (
    <Form
      onSubmit={onSubmitForm}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            fieldProps={{ validation: email }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </form>
      )}
    />
  );
};
