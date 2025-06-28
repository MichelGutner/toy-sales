import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMEOUT = 2500;
const SUCCESS_STATUS = "OK";
const USER_KEY = "user_key";

interface User {
  name: string;
  email: string;
  password: string;
}

const saveUser = async (users: User[]): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const readUser = async (): Promise<User[] | null> => {
  const savedUsers = await AsyncStorage.getItem(USER_KEY);
  return savedUsers ? JSON.parse(savedUsers) : null;
};

const simulateRequest = (response: string): Promise<string> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, TIMEOUT);
  });

export const doCreateUser = async (user: User): Promise<string> => {
  const savedUsers = await readUser();
  const users = savedUsers ? [...savedUsers, user] : [user];

  await saveUser(users);
  return simulateRequest(SUCCESS_STATUS);
};

export const doLogin = async (user: Omit<User,  'name'>): Promise<string> => {
  const savedUsers = await readUser();

  if (!savedUsers || savedUsers.length === 0) {
    throw new Error("No users registered with this email");
  }

  const isValidUser = savedUsers.some(
    (existentUser) =>
      user.email === existentUser.email &&
      user.password === existentUser.password
  );

  if (isValidUser) {
    return simulateRequest(SUCCESS_STATUS);
  } else {
    throw new Error("Invalid email or password");
  }
};
