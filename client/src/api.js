const serverURL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:4200";

export async function fetchProfile() {
  const response = await fetch(`${serverURL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
}

export async function fetchUsers() {
  const response = await fetch(`${serverURL}/user/all`);
  return response.json();
}

export async function updateProfile(body) {
  console.log(`body: ${JSON.stringify(body)}`)
  const response = await fetch(`${serverURL}/user/update`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}