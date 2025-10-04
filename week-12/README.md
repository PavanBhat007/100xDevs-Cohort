# **_Week 12.1: Deploying Frontends on AWS_**

> Not adding all points about steps because don't have access to AWS account, only important and crucial details will be present below.

Today, most Frontends are deployed on Vercel commonly, but Vercel's pricing becomes expensive at scale and at large scales, it is better to see if deploying on conventional Cloud Providers like AWS is feasible.

### Storage

**Objects**: Non-conventional data (images, mp3, mp4) which are not stored in traditional databases like MongoDB or Postgres. These data are stored in something called as 
"_**Object Stores**_" and every cloud provider has this service.

_AWS's Object Store service -> **S3** i.e., **Simple Storage Service**_

When we upload an _Object_ to S3, we get an Object URL but this cannot be accessed directly. S3 is just a storage service and to access it, we need to "distribute" it in a certain way.

### Distribution

**CDNs** (Content Delivery Networks): Local servers ("_**Pops**_") distributed around the world, which exist to fetch _Objects_ from the source (S3 bucket or some _Object Store_) and cache it on the CDN, so when another user requests for same _Object_, instead of serving from the source we serve from the CDN itself.

_AWS's CDN service -> **CloudFront**_

> _Object Store_ is a single location where application's _Objects_ are stored and is the "source of truth", and always there will be an associated _CDN_ which provided "_**redundancy**_" by caching the _Objects_ from the source and delivering the cached data more faster to the requests it received from that Network/Area.

## Deploying on AWS

### Source Code

First, we need a React project and need to "_build_" the code to get a deployable version of the project.

In a React Project, if we run the `npm run build` command, it creates a `dist` folder which only contains a `html` file and `assets` folder containing the converted CSS and JS code. This `dist` folder is static and can be served locally using the `serve` module. On AWS, we can deploy only such kind of codebases where it can be converted to plain HTML, CSS and JS, which is not possible for NextJS applications as it includes complex features like _Server Side Rendering_ which can't be deployed on conventional Cloud Providers like AWS.

### Storage (S3)

Next we can create a default S3 bucket on AWS, and upload the `dist` folder into the bucket.

> Don't upload the `dist` folder itself, we have to upload the contents of `dist` folder as the `index.html` needs to be at the root level and not inside a folder.

### Distribution (CloudFront)

_**Origin domain is the source URL**_. It can literally be anything, even `google.com`, and this is where we mention the S3 bucket URI.

**OAC (Origin Access Control)**: Tells CloudFront how the application can be accessed. We can create a new OAC with Signed Requests (recommended for better security) and now S3 bucket will be accessible only via CloudFront and not directly. After this, we need to update the S3 bucket access policy has to be updated to give CloudFront access to S3. At the end of creating the CDN, we get an **Access Policy statement** which has to be added to the S3.

**Default Root object** should be set to `index.html`, which tells CloudFront that when they visit the CDN base URL, be default it should server the `index.html` file which avoids the need to have `URL/index.html` at the end.

After creating the CDN, CloudFront generates the _S3 Access Policy_ and we just copy it and paste it under _S3 > Permissions > Bucket Policy_ which by default blocks all Public Access. The Policy tells that anything under the specific S3 bucket should be accessible to the corresponding newly created CloudFront CDN.

# **_Week 12.2: Advanced TypeScript APIs_**

## Popular Generics

### `Pick<type/interface, 'property1' | 'property2' ...>`
In most applications using databases, we would have defined an interface for the User, but for editing/updating we would allow only specific fields, so we can't use the User interface at that time. So, we can either define the arguments seperately in the function definition (not scalable) or define a new interface for the update props (if chnage in User, corresponding chnage to be done in props interface also). So, we need to maintain a single source of truth and pick the props we need from that.

```ts
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
}

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

function updateUser(data: UpdateProps) {
  // ...
}
```

Now we don't need to update the UpdateProps types if it changes in User and this is more scalable than just writing all the individual arguments with types.

### Partial Interface

Interface has parameters that are marked as optional using the **`key?: type`** syntax.

In the above example we created an `UpdateProps` type, we don't always expect the user to send all the "picked" parameters, so we need to make it a Partial.

```ts
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
}

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>
type UpdatePropsOptional = Partial<UpdateProps> // all fields optional

function updateUser(data: UpdatePropsOptional) {
  // ...
}
```

### Read-Only properties

For an Array or Object defined with `const`, we cannot change the actual Array/Object itself but still can change the internal values and TypeScript/JavaScript won't complain. To fix this, we can pre-pend the specific properties with "`readonly`" keyword to make them read-only and when we try to change it TypeScript tells us that it can't be changed.

```ts
interface User {
  readonly id: number;
  name: string;
  age: number;
  email: string;
  readonly password: string;
}

// id and password fields are read-only
const user: User = {
  id: 1, name: "pavan", age: 22, email: "pavan@gmail.com", password: "12345"
}

user.id = 2 // TypeScript complains here that id is read-only property
```

And, if we need to make the entire type/interface read-only then we can use the Readonly<> generic. This can be used for something that we define but don't update it like Config objects for external APIs. This would restrict another developer by-mistakenly updating the config variables.

```ts
interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

// user object is read-only now
const config: Readonly<Config> = {
  endpoint: 'openai.com',
  apiKey: 'qwertyuiopasdfghjklzxcvbnm1234567890'
}

config.apiKey = 'new_api_key' // won't compile and throw error
```

### Records and Maps

When we have an object with nested objects and the key is of different type like a string, to define the type we can explicitly define it like:

```ts
interface UserRecord {
  name: string,
  email: string
}

interface Users {
  // defining the type of key as string
  [key: string]: UserRecord
}

const users: Users = {
  "id1": {
    name: "Pavan",
    email: "pavan@gmail.com" 
  },
  "id2": {
    name: "Navap",
    email: "navap@gmail.com"
  }
}
```

With the Record generic, we can define the `Users` types as **`Record<string, UserRecord>`**. Record is something that is specific to TypeScript only.

```ts
interface UserRecord {
  name: string,
  email: string
}

// much cleaner syntax for defining the key type as string
type Users = Record<string, UserRecord>
const users: Users = {
  "id1": {
    name: "Pavan",
    email: "pavan@gmail.com" 
  },
  "id2": {
    name: "Navap",
    email: "navap@gmail.com"
  }
}
```

Map is a JavaScript concept that is an alternative to the general Object we use. It used methods like `set()`, `get()`, `delete()` similar to how C++ does objects, which is more readable. While creating/generating the Map, we can enforce the type of the key-value pairs also.

```ts
type User = {
  name: string;
  email: string;
}

// const users = {}
// users["id1"] = {name: "Pavan", email: "pavan@gmail.com"}
// users["id2"] = {name: "Navap", email: "navap@gmail.com"}

// const user1 = users["id1"]

// const users = new Map(); // creates a trivial Map without specific types
const users = new Map<string, User>() // enforces the key-value pairs types

// Map uses methods like set(), get() rather than the [] notation in Objects
users.set("id1", {name: "Pavan", email: "pavan@gmail.com"})
users.set("id2", {name: "Navap", email: "navap@gmail.com"})

const user1 = users.get("id1")
users.delete("id2")
```

### **`Exclude<type/interface, property(s) to be excluded>`**

Similar to `Pick<>`which is used to pick out specific types, `Exclude<>` is used to remove specific types from output type. Pick makes more sense for Objects and Exclude makes more sense when used for type having bunch of literals.

```ts
type EventTypes = 'click' | 'scroll' | 'mousemove' | 'keyup' | 'keydown'
type MouseEvents = Exclude<EventTypes, 'keyup' | 'keydown'>
type KeyBoardEvents = Exclude<EventTypes, 'click', 'scroll', 'mousemove'>
```

## Type Inference when using **`zod`**

In backends having zod validation, we typically have defined the types and schema with zod but the objects we validate with zod don't get the types inferred from the zod schema and we have to define a seperate interface/type for the request body or the object we are validating with zod.

```ts
import { z } from "zod";
import express from "express";

const app = express();

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  age: z.number().min(18, { message: "You must be atleast 18 years or older" }),
  email: z.email({ message: "Invalid email" }),
});

// repetition of types here as already sort-of defined in the zod schema
interface FinalUserSchema {
  name: string;
  age: number;
  email: string;
}

app.put('/user', async (req, res) => {
  const { success, error } = userProfileSchema.safeParse(req.body);
  // const updateBody = req.body; // type is any

  const updateBody: FinalUserSchema = req.body;

  if(!success) {
    return res.status(411).json({ message: error })
  }

  //db logic and return
})
```

Zod has a **`z.infer<typeof zodSchema>`**, which allows us to directly extract the types from the schema into a native TypeScript interface or type so we don't have to write the types again.

```ts
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  age: z.number().min(18, { message: "You must be at-least 18 years or older" }),
  email: z.email({ message: "Invalid email" }),
});

// infers the type from the zod Schema
type FinalUserSchema = z.infer<typeof userProfileSchema> // doesn't react the JS code
```

> The zod schema is a runtime variable and the inferred type is a compile time variable i.e., the inferred type won't be there in the compiled JS code similar to how interfaces and type won't be there. So, **`z.infer<>` actually allows us to infer a TypeScript type from a runtime variable.**

The inferred types become very important when we need the same inferred type schema on the frontend. So, in the backend we cn define the zod schema, infer the type and export it to be used both in the backend as well as the frontend. This is possible in mono-repos where the frontend and backend share the same repo and can access code across each other.

