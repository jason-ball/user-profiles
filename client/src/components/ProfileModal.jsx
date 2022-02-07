import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchProfile, updatePhoto, updateProfile } from '../api';

export default function ProfileModal(props) {
  const [name, setName] = useState(props.name);
  const [bio, setBio] = useState(props.bio);
  const [publicProfile, setPublicProfile] = useState(props.public);
  const [selectedFile, setSelectedFile] = useState();
	const [, setIsFilePicked] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useQuery('user', fetchProfile);
  const mutation = useMutation((profile) => updateProfile(profile), {
    onSuccess() {
      queryClient.invalidateQueries();
      props.handleClose();
    }
  });

  const photoMutation = useMutation((file) => updatePhoto(file), {
    onSuccess() {
      window.location.reload(false);
    }
  });

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(`data: ${JSON.stringify(data)}`)
    mutation.mutate({
      name: name || data.name,
      bio: bio || data.bio,
      publicProfile: publicProfile,
    });
    handleSubmission();
  }

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
    const formData = new FormData();
		formData.append('photo', selectedFile);

    photoMutation.mutate(formData);
	};

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" placeholder="Enter name" onChange={changeHandler} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" defaultValue={data.name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <textarea className="form-control" placeholder="Tell us about yourself!" defaultValue={data.bio} onChange={(e) => setBio(e.target.value)}></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Public Profile" defaultChecked={data.publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}