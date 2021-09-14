import React from 'react';
import { useUserData } from '../../lib/hooks';

export default function Nav(props) {
  const { user } = useUserData();
  return (
    <div>
      <h1>welcome {user?.username}!</h1>
    </div>
  );
}
