import React from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

import Repos from '../repos/Repos';

const User = ({ match }) => {
  const githubContext = React.useContext(GithubContext);

  React.useEffect(() => {
    githubContext.getInfo(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    company,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = githubContext.user;

  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      {githubContext.loading ? (
        <Spinner />
      ) : (
        <>
          Hireable:{' '}
          {hireable ? (
            <i
              className='fas fa-check text-success'
              style={{ paddingLeft: '.3rem' }}
            />
          ) : (
            <i className='fas fa-times-circle text-danger' />
          )}
          <div className='card grid-2'>
            <div className='all-center'>
              <img
                src={avatar_url}
                className='round-img'
                style={{ width: '150px' }}
                alt=''
              />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <>
                  <h3>Bio: </h3>
                  <p>{bio}</p>
                </>
              )}
              <a
                target='_blank'
                href={html_url}
                className='btn btn-dark my-1'
                rel='noopener noreferrer'
              >
                Visit Github Profile
              </a>
              <ul>
                {' '}
                <li>
                  {login && (
                    <>
                      <strong>Username: </strong>
                      {login}
                    </>
                  )}
                </li>
                <li>
                  {company && (
                    <>
                      <strong>Company: </strong>
                      {company}
                    </>
                  )}
                </li>
                <li>
                  {blog && (
                    <>
                      <strong>Website: </strong>
                      <a
                        href={`https://${blog}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {blog}
                      </a>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className='card text-center'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>
              Public Repos: {public_repos}
            </div>
            <div className='badge badge-dark'>Public Gists: {public_gists}</div>
          </div>
        </>
      )}
      <Repos repos={githubContext.repos} />
    </>
  );
};

export default User;
