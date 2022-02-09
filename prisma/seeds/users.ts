import * as argon2 from 'argon2';

export async function users() {
  return [
    {
      email: "admin@subalcatel.net",
      lastname: "Admin",
      firstname: "Subalcatel",
      password: await argon2.hash("admin"),
    }
  ]
}
