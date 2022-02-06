import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchUsers } from "../api";

function Home() {

  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('users', fetchUsers);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error}</span>
  }

  return (
    <>
      <h1>Hello World!</h1>
      <ul>
        {
          data.map((value) => {
            return <li key={value._id}>name: {value.name}, bio: {value.bio}</li>
          })
        }
      </ul>
    </>
  )
}

export default Home;
