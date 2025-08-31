import { Client } from "pg";

export async function getClient() {
  const client = new Client(
    "postgresql://100xd_owner:0JVkvhfmr1bT@ep-dry-pond-a1xnfkba-pooler.ap-southeast-1.aws.neon.tech/100xd?sslmode=require&channel_binding=require"
  );
  await client.connect();
  return client;
}
