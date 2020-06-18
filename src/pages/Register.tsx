import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { useForm } from '../hooks/useForm';
import { RouteComponentProps } from 'react-router-dom';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [{ email, password }, handleChange] = useForm({
    email: '',
    password: '',
  });
  const [register] = useRegisterMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(email, password);
        const response = await register({
          variables: {
            email,
            password,
          },
        });

        console.log(response);
        history.push('/');
      }}
    >
      <div>
        <input
          value={email}
          name='email'
          placeholder='email'
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          value={password}
          type='password'
          name='password'
          placeholder='password'
          onChange={handleChange}
        />
      </div>
      <button type='submit'>register</button>
    </form>
  );
};
