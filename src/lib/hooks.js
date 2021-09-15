import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

import { useEffect, useState } from 'react';
export function useUserData() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    };
    getUserData();
  }, []);

  return { user };
}
