import { getClient } from "./utils";

async function createTables() {
  const client = await getClient();

  const createUsersTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

  const createTodosTableQuery = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT FALSE,
            user_id INTEGER REFERENCES users(id)
        );
    `;

    await client.query(createUsersTableQuery);
    await client.query(createTodosTableQuery);
    console.log("Tables created successfully!");
}

createTables();