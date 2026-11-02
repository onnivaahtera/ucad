export const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

export const getUserById = (id: string) => {
  return users.find((i) => i.user_id === Number(id));
};

export const modifyUser = (id: string, body: any) => {
  const itemIndex = users.findIndex((item) => Number(id) === item.user_id);
  if (itemIndex > -1) {
    users[itemIndex] = {...users[itemIndex], ...body};
    return users;
  }
  return false;
};

export const deleteUser = (id: string) => {
  const itemIndex = users.findIndex((item) => Number(id) == item.user_id);
  if (itemIndex > -1) {
    users.splice(itemIndex, 1);
    return true;
  }
  return false;
};
