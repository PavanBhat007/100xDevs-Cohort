import { Hono } from "hono";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    // auth check

    await next()
  } else {
    return c.text('Unauthorized')
  }
}

// directly use on app
app.use(authMiddleware);

app.get("/", (c) => {
  return c.json({ message: "GET /" });
});

// use in specific routes
app.get('/user', authMiddleware, async (c) => {
  // ...
})

export default app;
