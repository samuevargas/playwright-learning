// tests/data/users.ts
export const users = {
  standard: {
    username: "samuevargas",
    email: "samuevargas@gmail.com",
    role: "viewer" as const
  },
  admin: {
    username: "admin",
    email: "admin@example.com",
    role: "admin" as const
  }
};
