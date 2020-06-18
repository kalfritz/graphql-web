import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });
  return !data ? (
    <div>loading...</div>
  ) : (
    <div>
      <div>users:</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.email}, {user.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
