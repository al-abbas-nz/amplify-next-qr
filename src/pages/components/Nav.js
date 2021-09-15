import React from 'react';

export default function Nav({ user }) {
  return (
    <div>
      <h1>welcome {user?.username}!</h1>
    </div>
  );
}
