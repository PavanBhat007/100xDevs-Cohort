import { getClient } from "./utils";

async function getAllUsers() {
  const client = await getClient();

  const getQuery = `SELECT * FROM users`;
  const users = await client.query(getQuery);

  console.log("All Users: ");
  for (let user of users.rows) {
    console.log(`ID: ${user.id} Email: ${user.email}`);
  }
}

async function getUserByEmail(email: string) {
  const client = await getClient();

  const getQuery = `SELECT * FROM users WHERE email=$1`;
  const user = await client.query(getQuery, [email]);

  console.log("User found: ");
  for (let u of user.rows) {
    console.log(`ID: ${u.id} Email: ${u.email}`);
  }
}

async function getTodosOfUser(email: string) {
  const client = await getClient();

  const userQuery = `SELECT * FROM users WHERE email = $1`;
  const user = await client.query(userQuery, [email]);

  const todoQuery = `SELECT * FROM todos WHERE user_id = $1`;
  const todos = await client.query(todoQuery, [user.rows[0].id]);

  console.log(`Todos of User ${user.rows[0].email}: `);
  for (let todo of todos.rows) {
    console.log(
      `ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}`
    );
  }
}

getAllUsers();
getUserByEmail("john.doe@gmail.com");
getTodosOfUser("john.doe@gmail.com");
