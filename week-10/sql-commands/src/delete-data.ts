import { getClient } from "./utils";

async function deleteTodo(todoID: number) {
  const client = await getClient();

  const deleteTodoQuery = `DELETE FROM todos WHERE id = $1`;
  await client.query(deleteTodoQuery, [todoID]);

  console.log(`Delete Todo ${todoID} successfully!`);
}

deleteTodo(1);
