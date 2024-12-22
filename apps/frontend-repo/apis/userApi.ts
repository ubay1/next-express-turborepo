/* eslint-disable @typescript-eslint/no-explicit-any */

export const addUser = async (data: any) => {
  const response = await fetch(`/api/user/add`, {
    method: "POST",
    body: JSON.stringify({ data }),
  });
  const responseData = await response.json();
  return responseData;
};

export const fetchUserData = async () => {
  try {
    const response = await fetch(`/api/user`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUser = async (id: string, data: any) => {
  const response = await fetch(`/api/user/edit`, {
    method: "PUT",
    body: JSON.stringify({ id, data }),
  });
  const responseData = await response.json();
  return responseData;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`/api/user/delete`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  const responseData = await response.json();
  return responseData;
};
