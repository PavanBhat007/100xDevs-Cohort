import { getClient } from "../utils";

// get users only if they have any todos
async function getUserWithTodos(userID: number) {
  const client = await getClient();

  const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        INNER JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
  `;

  const res = await client.query(joinQuery, [userID]);
  const results = res.rows;

  console.log("Users and Todos: ", results);
}

getUserWithTodos(2);
getUserWithTodos(3);
