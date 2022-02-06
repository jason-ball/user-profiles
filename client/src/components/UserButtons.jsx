import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import { fetchProfile } from '../api';

export default function UserButtons(props) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('user', fetchProfile);

  function updateProfileClick() {

  }

  function signOutClick() {
    // queryClient.resetQueries('user');
    const serverURL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:4200";
    window.location.href = `${serverURL}/auth/signout`;
  }

  return (
    <ButtonGroup>
      <Button variant="primary" onClick={updateProfileClick}>Update Profile</Button>
      <Button variant="danger" onClick={signOutClick}>Sign Out { data.name ? data.name : '' }</Button>
    </ButtonGroup>
  )
}