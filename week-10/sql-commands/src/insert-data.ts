import { getClient } from "./utils";

async function createEntries() {
  const client = await getClient();

  const insertUserQuery = `
    INSERT INTO users (email, password) 
    VALUES ($1, $2) RETURNING id;
  `;

  const userValues = ["pavan.ks@gmail.com", "12345"];
//   let res = await client.query(insertUserQuery, userValues);

  const insertTodoQuery = `
    INSERT INTO todos (title, description, done, user_id)
    VALUES ($1, $2, $3, $4) RETURNING id;
  `;
//   const todoValues = ["100xdevs", "week10", false, res.rows[0].id];
  const todoValues = ["Oracle", "AI Fundamentals", false, 3];
  await client.query(insertTodoQuery, todoValues);

  console.log("Inserted values into USERS and TODOS tables!");
}

createEntries();
