interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export const registerUser = (username: string, password: string): void => {
  const user: User = { username, password };
  users.push(user);
};

export const authenticateUser = (
  username: string,
  password: string,
): User | null => {
  const user: User | undefined = users.find(
    (user) => user.username === username && user.password === password,
  );
  return user || null;
};
