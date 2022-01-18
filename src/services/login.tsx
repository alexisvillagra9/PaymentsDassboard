const usersDB: any[] = [
  {
    username: "admin",
    password: "Belgrano2022",
    role: {
      code: "SUS",
      description: "Super Usuario",
    },
  },
  {
    username: "belgrano",
    password: "Belgrano2022",
    role: {
      code: "ADM",
      description: "Administracion",
    },
  },
];

export const loginValid = async (username: string, password: string) => {
  const login = usersDB.find(
    (udb) => udb.username === username && (udb.password = password)
  );
  if (login) delete login.password;
  return login;
};
