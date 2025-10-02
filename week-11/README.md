# **_Week 11.1: Serverless Backends_**

Till now we have only hosted the backend locally and connected it with the frontend, but in real-world scenarios, the backend of a web application is deployed on a server (either physical on-prem server or cloud server using Cloudflare, AWS, Azure or GCP).

**When deployed on cloud**,

1. Go to AWS, GCP, Azure or Cloudflare, rent a VM (Virtual Machine) and deploy the app.
2. Put the VM in an Auto-Scaling group.
3. Deploy it in a  Kubernetes cluster.

**Problems with the above deployment architecture**:

- When and how to scale server.
- Base cost even though server is not used 100%.
- Monitoring various servers to make sure no server is down.

**Solution**: Developer only writes code and "_someone_" else handles all the auto-scaling, montioring, etc.

---

**Serverless** is a backend deployment in which the **cloud provider dynamally mes allocation and provisioning of servers** and the term _"serverless" does nnmean there are no servers involded, but that the developer does not worry about any servers_.

The developer writes their backend code and runs a command, and the app would automatically **Deploy, Autoscale and Charge on a `per-request` basis** (rather than base cost fo VMs).

**Problems with Serverless backends**:

- More expensive at scale (at which point we go back to the previous VM based deployments)
- Cold start problem: When no user is accessing the backend, then no servers will be running and the backend will be shut-down, but when someone ccs to the website, now suddenly the server needs to "cold-start", which causes high latency initially.
  - So, to solve this either we can be pinging the backend passively to keep it up, or
  - Maintain a "**Warm Pool**", where atleast 1 server is always running to handle any sudden requests.

**When to use Serverless architecture**:

- When need to host a backend fast and not worry about deployment.
- When we cannot anticipate the traffic and don't wanto to worry about Autoscaling yet.
- If traffic is very low and we want to optimize for cost.

## **Serverless Providers: AWS Lambda, Google Cloud Functions, Cloudflare Workers**

We will be using Cloudflare Workers since it is free for upto certain number of requests initially.

### Deploying a Cloudflare Worker

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/88e8c4bd2ebef02b064b328e138a8c44/home/domains).
2. Navigate to the **Workers and Pages** page.
3. Select "**Start with Hello World!**".
4. A page showing a basic route returning `"Hello World"` response is shown.
5. Click on "**Deploy**".

### [**How Cloudflare Workers works**](https://developers.cloudflare.com/workers/reference/how-workers-works/)

**Cloudflare Workers don't use NodeJS runtime** and they have created their own runtime with many things that NodeJS has.

Cloudflare Workers behave similarly to JavaScript in browsers and NodeJS, but under the hood the Workers runtime used the V8 engine (which became NodeJS) and the differences between JavaScript for browser/NodeJS and Cloudflare Workers is at the runtime. Rather than running on an individual's machine (browser application or centralized server), Workers functions run on Cloudflare's Edge Network - a growing global network of thousands of machine distributed across hundreds of locations.

Each of those machines hosts an instance of the Workers runtime, and each of those runtimes is capable of running thousands of user-defined applications.

### Isolates vs Containers

V8 orchestrates Isolates which are lighweight contexts the provide our code with variables it can access and a safe environemnt to be connected within. A single runtime can run hundreds/thousands of isolates, seamlessly switching between them.

![Isolates](./screenshots/cloudflare-workers-isolates.png)

If there are 9 apps, instead of running NodeJS (traditionally) 9 times, Workers runtime runs the process once and switches between apps as per requirement. Workers processes are able to run essentially limitless scripts with almost no individual overhead. Any given isolate can start around a hundred times faster than a Node process on a container or virtual machine.

### Initializing a Worker

1. Initialize a Worker:

    - **`npm create cloudflare -- my-app`**
    - What would you like to start with? -> **`Hello World example`**
    - Which template would you like to use? -> **`Worker only`**
    - Which language do you want to use? -> **`TypeScript`**
    - Do you want to deploy your application> -> **`No`**

    Once application is created the below output is shown in the terminal.

    ![Worker creation successfull](./screenshots/intializing-worker.png)

    In the created **`my-app`** folder, under **`src`**, there will be an **`index.ts`** that contains:

    ```ts
    export default {
        async fetch(request, env, ctx): Promise<Response> {
            return new Response('Hello World!');
        },
    } satisfies ExportedHandler<Env>;
    ```

    **`npm run dev`** runs the Worker locally on port 8787 which just returns "**Hello World**" for now.

> In _`package.json`_ there is only one actual dependency which is _`wrangler`_, the CLI for CloudFlare. It does not have _`express`_ as a dependency, as we are not writing express logic, own the HTTP server, which is handled by CLoudFlare.

### Routing

```ts
export default {
    async fetch(request, env, ctx): Promise<Response> {
        console.log(request.body);
        console.log(request.headers);
        console.log(request.url);  // http://127.0.0.1:8787/
        const path = request.url.slice(21)

        if (path == '/') {
            // handle / route
            if (request.method === 'GET') {
                return Response.json({ message: 'Received GET request' });
            } else {
                return Response.json({ message: 'Did not receive a GET request' });
            }
        } else if (path === '/users') {
            // handle /users route
            return Response.json({ message: '/users path' })
        } else {
            return Response.json({ message: '404 | Not Found' })
        }
    },
} satisfies ExportedHandler<Env>;
```

Routing is done with conditional statements and is not optimal as for bigger applications the routing becomes very messy.

### Deploying worker

1. Login to CloudFlare account: **`npx wrangler login`** because we need to give wrangler access to our CloudFlare account to push the Worker there.
2. OAuth -> Opens in Browser and requests access -> Allow
3. Wrangler is granted access to our CloudFlare account.
    ![Wrangler connected to CloudFlare](./screenshots/wrangler-cloudflare-login.png)
4. **`npm run deploy`** runs **`wrangler deploy`** and sincle wrangler has access to the CloudFlare account, it uploads the code to a new Worker.
    ![Wrangler Deploy](./screenshots/wrangler-deploy.png)
5. The above command publishes/deploys a worker (for free) and give a URL which is available on the internet => _**we can host our backend for free like this**_.

### Why **`express`** doesn't work on Workers and Workarounds

- **`express`** heavily depends on **`NodeJS`** and hence can't be hosted on a serverless runtime.
- If really needed to convert Express-NodeJS code into a Worker, extract all the generic logic into functions and keep the base code as generic as possible so easier to re-write for Workers.
- [**`Hono`**](https://hono.dev): very fast JS framework for writing CloudFlare Workers.

### Hono

**`npm create hono@latest <app-name>`** creates a Hono App with biolerplate code (use "**`cloudflare-workers`**" template).

```js
import { Hono } from 'hono'

const app = new Hono()

// c provides request and response parameters
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
```

This code is very similar to express with the routing logic.

- **Accessing request body, headers and query parma**

    ```js
    // await c.req.json() -> gives request body
    app.post("/body", async (c) => {
        return c.json({ message: "POST /body", body: await c.req.json() });
    });

    // c.req.header('parameter') -> retrieves parameter from header
    app.get("/header", (c) => {
        return c.json({
            message: "GET /header",
            auth: c.req.header("Authorization"),
        });
    });

    // c.req.query('param') -> retrieves the query param
    app.get("/query", (c) => {
        return c.json({ message: "GET /query", query: c.req.query("param") });
    });
    ```

- **Middlewares**

    ```js
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
    ```
