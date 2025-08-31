import { getClient } from "../utils";

// get users and any todos if they have
async function getUserAndTodos(userID: number) {
  const client = await getClient();

  const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
  `;

  const res = await client.query(joinQuery, [userID]);
  const results = res.rows;

  console.log("Users and Todos: ", results);
}

getUserAndTodos(2);
getUserAndTodos(3);
