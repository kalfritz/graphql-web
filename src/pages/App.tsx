import React, { useEffect, useState } from 'react';
import { Routes } from '../Routes';
import api from '../services/api';
import { setAccessToken } from '../accessToken';

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function refreshToken() {
      const response = await api.post(
        '/refresh_token',
        {},
        { withCredentials: true },
      );
      setAccessToken(response.data.access_token);
      setLoading(false);
    }
    refreshToken();
  }, []);
  return loading ? <div>loading...</div> : <Routes />;
};
