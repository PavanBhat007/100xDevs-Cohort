import { Client } from "pg";

// @/?sslmode=require&channel_binding=require'
const db = new Client({
  connectionString:
    "postgresql://100xd_owner:0JVkvhfmr1bT@ep-dry-pond-a1xnfkba-pooler.ap-southeast-1.aws.neon.tech/100xd?sslmode=require&channel_binding=require",
});

async function createUsersTable() {
  try {
    await db.connect();

    const result = await db.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          `);

    console.log(result);
  } catch (err) {
    console.error("Error while creating table.", err);
    throw err;
  } finally {
    await db.end();
  }
}

async function createAdressesTable() {
  try {
    await db.connect();

    const query = `
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL, 
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(2) NOT NULL,
        created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    const result = await db.query(query);
    console.log("Addresses table created!", result);
  } catch (err) {
    console.error("Error while creating Addresses table:", err);
    throw err;
  } finally {
    db.end();
  }
}

interface User {
  username: string;
  email: string;
  password: string;
}

async function insertRow(row: User) {
  try {
    await db.connect();

    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3);
      `;
    const result = await db.query(query, [
      row.username,
      row.email,
      row.password,
    ]);

    console.log(result);
  } catch (err) {
    console.error("Error while inserting user.", err);
    throw err;
  } finally {
    await db.end();
  }
}

async function getUserByEmail(email: string) {
  try {
    await db.connect();

    const query = `SELECT * FROM users WHERE email=$1`;
    const result = await db.query(query, [email]);

    if (result.rows.length > 0) {
      console.log("User found!", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No users with matching email found :(");
      return null;
    }
  } catch (err) {
    console.error("Error while fetching user.", err);
    throw err;
  } finally {
    await db.end();
  }
}

// createUsersTable().catch(console.error);
createAdressesTable().catch(console.error);

// insertRow({
//   username: "Pavan",
//   email: "pvn@gmail.com",
//   password: "12345",
// }).catch(console.error);

// getUserByEmail("pvn@gmail.com").catch(console.error);
