import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import { fetchProfile } from '../api';
import ProfileModal from './ProfileModal';

export default function UserButtons(props) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('user', fetchProfile);

  const [show, setShow] = useState(false);

  function updateProfileClick() {
    setShow(true);
  }

  function hideModal() {
    setShow(false);
  }

  function signOutClick() {
    const serverURL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:4200";
    window.location.href = `${serverURL}/auth/signout`;
  }

  return (
    <>
      <ButtonGroup>
        <Button variant="primary" onClick={updateProfileClick}>Update Profile</Button>
        <Button variant="danger" onClick={signOutClick}>Sign Out {data.name ? data.name : ''}</Button>
      </ButtonGroup>
      <ProfileModal show={show} handleClose={hideModal} />
    </>
  )
}