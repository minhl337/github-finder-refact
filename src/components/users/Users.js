import React from 'react';
import UserItem from './UserItem';

import Spinner from '../layout/Spinner';

import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = React.useContext(GithubContext);

  return (
    <>
      {githubContext.loading ? (
        <Spinner />
      ) : (
        <div style={userStyle}>
          {githubContext.users.map((user) => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div>
      )}
    </>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
};

export default Users;
