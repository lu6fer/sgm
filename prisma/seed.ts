import { PrismaClient } from "@prisma/client";
import { types } from "./seeds/types";
import { users } from "./seeds/users";
import { statuses } from "./seeds/statuses";

const db = new PrismaClient();

async function seed() {
  return Promise.all([
    db.status.createMany({
      data: statuses(),
    }),
    db.type.createMany({
      data: types(),
    }),
    db.user.createMany({
      data: await users(),
    }),
  ]);
}

seed()
  .then(() => {
    console.log('Seeding successfull');
  })
  .catch(e => {
    console.log('Seeding failed');
    console.dir(e);
  });
