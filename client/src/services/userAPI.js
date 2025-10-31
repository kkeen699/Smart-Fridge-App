const API_URL = '/api/user';

export const createUser = async (idToken) => {
  const response = await fetch(`${API_URL}/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create user profile');
  }
};