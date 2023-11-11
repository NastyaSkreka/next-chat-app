interface User {
  username: string;
  password: string;
}

const users: User[] = [
  {
    username: "sherif",
    password: "123123123",
  },
  {
    username: "Nastya",
    password: "123123123",
  }
];

export const registerUser = (username: string, password: string): void => {
  const user: User = { username, password };
  users.push(user);
};

export const authenticateUser = (
  username: string,
  password: string,
): User | null => {
  const user = users.find(
    (user) => user.username === username && user.password === password,
  );
  if(!user) return null;
  
  localStorage.setItem('username', user?.username);
  return user;
};
