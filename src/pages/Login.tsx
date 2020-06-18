import React from 'react';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { useForm } from '../hooks/useForm';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [{ email, password }, handleChange] = useForm({
    email: '',
    password: '',
  });
  const [login] = useLoginMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(email, password);
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) return null;
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: data.login.user,
              },
            });
          },
        });

        console.log(response);

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
        }

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
      <button type='submit'>login</button>
    </form>
  );
};
