import { getClient } from "./utils";

async function updateTodo(todoID: number) {
  const client = await getClient();

  const updateTodoQuery = `
        UPDATE todos 
        SET done = $1 
        WHERE id = $2;
    `;

  await client.query(updateTodoQuery, [true, todoID]);
  console.log(`Todo ${todoID} updated successfully!`);
}

updateTodo(1);
