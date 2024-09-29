# **_Week 3.1_** : Middlewares, authentication, global catches, zod

## **Middleware**
Middlewares are used to setup sort of _"pre-checks"_ before running the actual JS logic on the JS main thread. There _"pre-checks"_ are geberally of 2 types: **Authentication validation and Input validation**.

Ex: If there is a **`/health-checkup`** route that requires **2 _checks_** to happen prior to execution those including:

1. User needs to send a **`kidneyId` as a query parameter** being as 1 or 2 representing which kidney
2. User should send a **username and password in the headers**.

**Code without the checks:**

```js
const express = require("express");
const app = express();

app.get("/health-checkup", function (req, res) {
  res.send("You are healthy :)");
});

app.listen(3000);
```

**_Ugly_ way to perform these checks**:

```js
const express = require("express");
const app = express();

app.get("/health-checkup", function (req, res) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  // Authentication validation
  if (username !== "pavan" || password !== "1234") {
    res.status(403).json({
      msg: "User does not exist",
    });
    return; // early return upon validation fail
  }

  // Input validation
  if (kidneyId !== 1 && kidneyId !== 2) {
    res.status(411).json({
      msg: "Wrong inputs",
    });
    return; // early return upon validation fail
  }

  // Successful validation
  res.json({
    msg: "Your kidney is fine",
  });
});

app.listen(3000);
```

This becomes repetitive if the same validation is to be done in another route. It violates the DRY (Don't Repeat Yourself) principle. To fix this, function can be used for validation, so only the function calls will be present in the routes. Even using function, there are still much repetitions, and to optimize that in the context of express: **"Middlewares"**

### Using middlewares with **`app.__()`** routes 
> ( __ --> get, post, put, delete)

**Validation using middlewares**:

```js
const express = require("express");
const app = express();

// definining middlewares
function authentication(req, res, next) {
  if (username !== "pavan" || password !== "1234") {
    res.status(403).json({
      msg: "User does not exist",
    });
  } else {
    next();
  }
}

function inputValidation(req, res, next) {
  if (kidneyId !== 1 && kidneyId !== 2) {
    res.status(411).json({
      msg: "Wrong inputs",
    });
  } else {
    next();
  }
}

// using both middlewares
app.get("/health-checkup", 
    authentication, inputValidation, (req, res) => {
        res.send("You are healthy :)");
    }
);

// using both middlewares
app.get("/kidney-checkup",
    authentication, inputValidation, (req, res) => {
        res.send("Your kidneys are healthy");
    }
);

// this route doesn't need to validate kidneyId input
app.get("/heart-checkup", authentication, (req, res) => {
    res.send("Your heart is healthy");
})

app.listen(3000);
```
The logic of middlewares is that route creation i.e., **`app.get()`** need not only take 2 params : the **route** and a **single callback function** with **`req`** and **`res`** as the parameters.
Actually, it can take **_'n'_** number of callback function and the callback function have another parameter which in itself is a function called, **`next`**.

```js
app.get("/route", 
    function (req, res, next) {
        // ... control reaches here first
        next(); // everything alright => move to next callback
    }, 
    function (req, res, next) {... next()}, ...
);
```

When the route gets a request, the control first reaches the first callback function. The **`next()`** is used in the callback functions, when things are fine and we need to move the control to the **_"next"_** callback function in sequence. Instead of defining the functions directly within the **`app.get()`**, we can define the function seperately and just use the function name as callback as the middleware.

### **`app.use()`**
Used when we want to use the same middleware in all the routes of the app, so don't need to repeatedly add it in all the route definitions

```js
const express = require("express");
const app = express();

// definining middlewares
function authentication(req, res, next) {
  // Authentication logic
}

function inputValidation(req, res, next) {
  // Input validation logic
}

// using authentication middleware in all routes by default
app.use(authentication);

// using both middlewares
app.get("/health-checkup", inputValidation, (req, res) => {
  res.send("You are healthy :)");
});

// using both middlewares
app.get("/kidney-checkup", inputValidation, (req, res) => {
  res.send("Your kidneys are healthy");
});

// this route doesn't need to validate kidneyId input
app.get("/heart-checkup", (req, res) => {
  res.send("Your heart is healthy");
});

app.listen(3000);
```

A common and popular middleware used in most express backends is the **`express.json()`** middleware that allows a route to extract information send in the request body. **`express.json()`** returns a function => we are actually calling a **`json()`** method on the **`express`** object but getting the function and using that returned function as a middleware. So it becomes something like **`app.use(<function>)`**

### Why we need **_Input validation_**?
Let's take an example where a route is expecting the user to send an array in the request body.

```js
const express = require("express");
const app = express();

// parse request body as json
app.use(express.json());

app.post("/health-checkup", (req, res) => {
  // Expected: Array of kidneys
  const kidneys = req.body.kidneys;
  const kidneysLen = kidneys.length;

  res.send(`You have ${kidneysLen} kidneys`);
});

app.listen(3000);
```

Once the backend is deployed, it is _"exposed"_ to the internet and anyone can hit the server with any type of requests. The **wrong type of input can easily break the server**. Some malicious actors might use the fact that a server backend doesn't have input validation and try to **inject code** and hack the server.

![input validation error](./screenshots/inp-validation-1.png)

Here, we can see that not sending an array causes unexpected behaviour.

![input validation error breaking the server](./screenshots/inp-validation-2.png)

When user sends empty body, it causes the server to throw an error and break. This is visible to the client as well. If the person sending the request looks thoroughly, they can figure out how the server is handling requests and user input. This might be a bad thing in a real-world example.

> Input validation can be done either just using **`if-else`** blocks for simple cases and using **middlewares** for more complex or frequently used checks. Another way to cleanly handle erroraneous inputs is using **Global Catches**.

### Global catches (Error-Handing middlewares)
Added in the end of the code, to catch any errors or exceptions and give the end user a clean message if any requests end up breaking the server or producing errors.

So, whenever the user sends wrong input that produces and error, we return some **_"graceful"_** text to signify something is wrong rather than showing the raw exception output as seen previously.

**`app.use((err, req, res, next) => { /* handle error */ });`**

```js
const express = require("express");
const app = express();

// parse request body as json
app.use(express.json());

app.post("/health-checkup", (req, res) => {
  // Expected: Array of kidneys
  const kidneys = req.body.kidneys;
  const kidneysLen = kidneys.length;

  res.send(`You have ${kidneysLen} kidneys`);
});

// called when any error occurs
app.use(function(err, req, res, next) {
  res.send(`Sorry, We ran into an issue.`)
});

app.listen(3000);
```

![global catches](./screenshots/global-catches.png)

## Zod (Better input validation)
> [Zod documentation](https://zod.dev)

With **`Zod`**, we need to first define a "schema" that describes the expected input.
**`const schema = z.number()`** or **`const schema = z.array()`** and many more fields that can be explicitly defined.

To validate the inputs, we can make use of the schema and use a method called **`parse()`** and send the input to be validated as a parameter.

**`const response = schema.parse(input);`**

On unsuccessful parsing,
```json
ZodError: [
  {
    "code": "invalid_type",
    "expected": "array",
    "received": "number",
    "path": [],
    "message": "Expected array, received number"
  }
]
```

This throws a **`ZodError`**, which might not be favourable in majority of the cases, and to get better parsing output information we can use the **`safeParse()`** method instead of **`parse()`**.

```js
const express = require('express');
const z = require('zod'); // importing zod
const app = express();

// describe structure of input
const schema = z.array(z.number());

// parse request body as json
app.use(express.json());

app.post("/health-checkup", (req, res) => {
  // Expected: Array of kidneys
  const kidneys = req.body.kidneys;
  const check = schema.safeParse(kidneys);
  
  if(!check.success) {
    res.send(`Invalid input given!`);
  } else {
    const kidneysLen = kidneys.length;
    res.send(`You have ${kidneysLen} kidneys`);
  }
});

app.listen(3000);
```

This gives more better and understandable parsing output like:
![safeParse() method zod](./screenshots/zod-safeParse.png)

> The logic of using **_Zod_** to check inputs can also be shited to a middleware to clean up the code more.

One of the biggest use case of input validation is username and password parsing in login or signup routes. The Zod schema for something like
```json
{ 
  "username": "string (with @, and .com at the end)",
  "password": "string (atleast 8 characters)",
  "country": "string (IN, US only)"
}
```

The above is a more complex schema and requires more than just **`z.array()`** and **`z.number()`**.

```js
// Zod schema
const schema = z.object({
  email: z.string(),
  password: z.string(),
  country: z.literal("IN").or(z.literal("US"))
});
```

- **`z.object()`**: defines an object in which we can enter the fields we need just like in the object notation (using key: value).
- **`z.string()`**, is self explanatory like **`z.array()`**, **`z.number()`**
- **`z.literal()`**: says that the input must be exactly like how it is described i.e., for **`z.literal("IN")`** the input must be _"IN"_ only.
- **`condition1.or(condition2)`**: used to chain conditions with an _"OR"_ join i.e., **either `condition1` "_or_" `condition2` must be true**

### Zod primitives
```js
import { z } from "zod";

// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```

Now let's add the additional conditions into the above basic schema.

```js
const schema = z.object({
  email: z.string().email(), // email validation (@, .com)
  password: z.string().min(8), // minimum 8 characters
  country: z.literal("IN").or(z.literal("US"))
});
```

As we can see above, **_Zod_** makes it very easy to perform complex input validations with methods like **`.email()`**, **`.min()`**. Other methods like **`.max()`**, **`.length()`**, **`.url()`**, etc can also be used as and when needed.


Login input validation example:
```js
const express = require("express");
const z = require("zod");
const app = express();

function validateInput(obj) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
  });

  return schema.safeParse(obj);
}

app.use(express.json());

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const country = req.body.country;

  if (!validateInput({ email, password, country }).success) {
    res.send("Invalid input");
  } else {
    res.send(`Hello ${email} from ${country == "IN" ? "India" : "USA"}`);
  }
});

app.listen(3000);
```

Output from route:

![zod login success](./screenshots/zod-login-success.png)
![zod login fail](./screenshots/zod-login-fail.png)

### Coersion of primitives
A more lenient checking alternative where the input to be validated is **_"coerced to a string"_** using JS's **`String()`**. It uses the **`coerce()`** method.

```js
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

## Introduction to Authentication
The authentication we have used in the previous example of **`/login`** requires the user to send their email and password explicitly in the request body or headers which is never secure.

The solution is that when the user logs in, we give them a **_"token"_** and ask them to show their token next time. Forget the **_"token"_** once the user logs out.

# **_Week 3.2_**: Databases and Auth

## **`fetch`**
**`fetch`** is a method that can be used to "fetch" or get data from an API.
```js
async function getAnimalData() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await res.json();
  document.getElementById("container").innerHTML = JSON.stringify(data);
}
```

## Authentication

> **Hashing**: sensitive information stored in a database as _"**hash values**"_ where a _hash function that takes any input and provides a fixed length output not reversible to the original input is used; and the hash function gives the same hash value for a specific input always_, so this can be used to match passwords where the hashed password is compared to the hash value of the password stored in the database.

> **Encryption**: similar to hashing but is 2-way, while hashing is just 1-way => the _plaintext (input) is converted to a random gibberish sequence of characters (ciphertext) but this ciphertext can be converted back to the plaintext using a "**key**"_ i.e., decryption.

> **Local Storage**: small amount of _**storage available in the browser**_, which is used by web services to store authorization and authentication data (JWT), or any other related data needed from time-to-time which avoids the need to query the backend database for these information every time.

### JSON Web Tokens
- takes JSON as input and gives some form for random structured data. It is different from hashing and encryption as it only takes JSON as input.
- it is used only in the context of "web" which is another difference with hashing and encryption
- token is the output given by the function, but the token doesn't offer any protection like in hashing (1-way so we can't get back the original string) or encryption (needs key to convert back to plaintext). Anybody can look at the original JSON using the token.

Anybody can decode the JWT back to the original JSON but not everyone can "verify" it, because password is required to verify the JWT, and only the service has the password which can be used to verify the JWT.

> **JWT is similar to a Digital Signature**

```js
// library that implements the JSON Web Token standards
const jwt = require('jsonwebtoken');

// Signing a JWT -> similar to a digital signature where
// the sender "signs" using their secret private key
// here jwtPassword is the secret private key used for signing
// this token can be decoded back to the original JSON by anybody
// but to verify it, the jwtPassword is needed
var token = jwt.sign({ username: username }, jwtPassword);

// Verifying JWT -> requires the jwtPassword used for signing
const decoded = jwt.verify(token, jwtPassword);
```

With JWT, there are the 3 main operations:
1. Generating token: **`const token = jwt.sign(payload, key)`**
2. Decoding JWT: **`const decoded = jwt.decode(token)`** _(no need for key to decode)_
3. Verifying JWT: **`const verified = jwt.verify(token, key)`** _(needs key for verification)_

> Wrap JWT Verify logic in try-catch block as it _**either returns a value upon successfullverification or "throws error" upon invalid or unsuccessfull verification**_

## Databases
Data is never stored in-memory as we have seen in the previous examples, because if the program crashes all that data is lost. For this reason, there exists an independant "database" (server or PC that is meant to just **_store data_**), so even if the backend script or program crashes, the data is still available in the database.

> Front-End interacts with Back-End, Back-End returns data to Front-end either by performing some operations on the Back-End server or fetching/updating data on the Database. Front-End or browser can't directly access the Database.

Types of Databases: Vector DB, Graph DB, NoSQL DB and SQL/Relational DB

### **MongoDB** is a famous NoSQL database
- it allows to create a database
- lets us create tables called as collections, in the database
- allows us to put JSON data in each collection/table, in the database.
- it is schema-less => scales well

**Mongoose** allows the backend to connect to the database.

```js
// Connecting to MongoDB database
mongoose.connect(
  "mongodb+srv://pvn:pvnbhat@cluster0.gxxfv.mongodb.net/",
);
```

To create a table or collection, we must first create a model. This says MongoDB about what type data to expect for each field in the collection. Each "User" object is called a **Document** and each property of the object is called a **Field**.
```js
const User = mongoose.model("User", {
  name: String,
  username: String,
  pasword: String,
});
```

> Collections or tables are "collections" of Documents. A Document represents a single instance of the collection (like a record or an entry) and document is a collection of Fields. Fields are the properties of each instance (username is a field for the User document)

To add an entry into the table or collection, we can do as follows,
```js
// Creating a user or a "document"
const user = new User({
  name: "Pavan Bhat",
  useranme: "pvnbhat",
  password: "abcdef123"
});

user.save() // saves this user document into the database
```

# **_Week 3.3_** & **_Week 3.4_**: Recap and Assignments
> Check [assignments repo](https://github.com/PavanBhat007/100xdevs-assignments/tree/master/week-3) for assignment solutions

# **_Week 3.5_**: DOM
DOM stands for **Document, Object, Model** and is a tree-like representation of the webpage.

The root of this "tree" is the **`document`** object, which has the **`<html>, <head>, <body> ...`** which are like the "children". We can
- update the content of these child elements
- add new child elements, to either the document or to other child elements present on the page
- delete child elements

## Element-specific Operations

### **`elements` attribute**
Every element that can have children, will have an `elements` attribute that returns an array of all the child elements of the given parent element.
```js
const children = document.querySelector(".container").elements // array of children

// number of child elements of an element
const numChildren = children.length; // or parentElement.elements.length

// updating contents of a child element -> DOM Manipulation
children[0].innerHTML = "<p>Hi There</p>"
```

## Adding and deleting elements
An operation in DOM Manipulation is **Creating** and **Appending** newly created elements into the DOM.

To create an element, we can use the **`createElement(<tag>)`** method provided in the `document` object. This gives an empty element of corresponding `<tag>` with no children (`<tag></tag>`). This element can now be added into the DOM using the **`appendChild()`** method for the element to which we want to add the newly created element.

```js
const paragraph = document.createElement("p"); // <p></p>
paragraph.innerText = "Hello, Welcome back!"; // <p>Hello, Welcome back!</p>
document.body.appendChild(paragrpah); // adding the <p> in the <body> element
```

Similary, there are the methods to 
- Remove element or child: **`element.remove()`** or **`document.removeChild(element)`**
- Replace child: **`document.removeChild(new, old)`**

### Document Object Methods
The `document` object has some inbuilt methods which are useful to target and select elements. The common ones are:

| Function | Operation |
|:--------:|-----------|
| **`getElementById("<id-value>")`** | Searches the DOM and returns the element with the provided `<id-value>` |
| **`getElementsByClassName("<class>")`** | Searches the DOM and returns an array of all elements with the provided `<class>` |
| **`getElementsByTagName("<tag>")`** | Searches the DOM and returns an array of all elements corresponding to the provided `<tag>` |
| **`querySelector("<#id or .class or tag>")`** | Searches the DOM and returns first occurance the element matching the CSS selection pattern i.e., it targets the elements according to the CSS notation. |
| **`querySelectorAll("<#id or .class or tag>")`** | Searches the DOM and returns array of all the elements matching the CSS selection pattern i.e., it targets the elements according to the CSS notation. |
| **`document.forms["<form-id>"]`** | Access the HTML Forms collection and returns all the forms with the given ids as an object. |

> The **`querySelector()`** and **`querySelectorAll()`** are known as CSS selectors and work with all the CSS notations like ".class.class", ".class .class", "element > .class", etc.

> The HTML Object Collection method for selecting elements has more than just the **`.forms`** shown above. There is **`.anchors`**, **`.head`**, **`.images`**, **`.links`**, **`.scripts`**, **`.title`**, **`.body`**, **`.embeds`**, ...

We can also use **`document.documentElement`** which by default retuns the entire HTML Element.

### HTMLCollection vs NodeList
The returned values from the targetting functions/methods, return HTMLCollections or NodeLists. There are some differences between the two.

| HTMLCollection | NodeList |
|:--------------:|:--------:|
| **`getElementsByClassName()`** and **`getElementsByTagName()`** return live HTML Collections | **`querySelectorAll()`** returns a static NodeList |
| It is basically a collection of document elements | It is a collection od document nodes (element nodes, attribute nodes, and text nodes) |
| Indexable using index/subscript, name, or id | Indexable only using index/subscript number |
| Since it is a "live" collection, adding an element to a parent element will change the parent element in the collection too. | It is a static collection, so adding element to a parent element in the collection will not change the parent element in the the NodeList,so requires refreshing, re-rendering to update collection. |

### Updating elements

For updating an element, there are the following properties that can be used:
- **`innerHTML`**: modify the HTML contents of the element
- **`innerText`**: modify the textual contents of the element
- **`textContent`**: modify the text contents of the element, similar to the `innerText`
- **`attribute`**: change the attributes of element (name, class, value, etc)
- **`style.property`**: change the style of an HTML elemnt
- **`element.setAttribute(attribute, value)`**: add a specific attribute to element

## The **`node`** object
- **`node.childNodes`**: access any child nodes of selected parent
- **`node.firstChild`**: access first child node of selected parent
- **`node.lastChild`**: access last child node of selected parent
- **`node.parentNode`**: access parent element of selected element
- **`node.nextSibling`**: access next "sibling" element (child with same parent node)
- **`node.prevSibling`**: access previous "sibling" element (child with same parent node)

### Types of nodes
| Node | Description | Example | 
|:----:|-------------|---------|
| **ELEMENT_NODE** | Any element/tag node | `<h1 class="heading">Hello World</h1>` |
| **ATTRIBUTE_NODE** (_deprecated_) | Attributes like class, id, name, value, etc of a node | `<h1 class="heading">Hello World</h1>` has an attribute node "class = heading" |
| **TEXT_NODE** | The actual text inside of a node | `<h1 class="heading">Hello World</h1>` has a text node as "Hello World" |
| **COMMENT_NODE** | Any comment | `<!-- comment -->` node |
| **DOCUMENT_NODE** | The HTML document itself | `<html></html>` node |
| **DOCUMENT_TYPE_NODE** | The DOCTYPE tag at the beginning of the HTML code | `<!DOCTYPE html>` tag's node |

An example of a DOM tree with the different types of nodes:

![HTML Nodes DOM](./screenshots/domtree.png)

## Special Attributes

### **`onclick`** attribute
Every element can have an `onclick` attribute, where we can add JS code to be run upon click on that element or even have function calls as the onclick attribute's value

```html
<h1 id="heading" onclick="changeText()">Hello!</h1>

<script>
  function changeText() {
    document.getElementById("heading").textContent = "Hello World!";
  document.getElementById("heading").style.color = "blue";
}
</script>
```
To make the above function more dynamic, we can use the **`this`** variable to pass a reference to the element where the function was called.

```html
<h1 id="heading" onclick="changeText(this)">Hello!</h1>

<script>
  function changeText(ele) {
    ele.textContent = "Hello World!";
  ele.style.color = "blue";
}
</script>
```

> The **`onclick`** is most commonly used with buttons to make the clicks on buttons perform certain actions.

### **`oninput`** attribute
It is used with input fields to make certain changes or perform some action when the user starts to type in or inputs something.
```html
<input type="text" id="usn" placeholder="Enter USN" oninput="upperCase()">

<script>
function upperCase() {
  const inpField = document.getElementById("usn");
  inpField.value = inpField.value.toUpperCase();
}
</script>
```

### **`onmouseover`** and **`onmouseout`**
The **`onmouseover`** is triggered when the mouse is hovered and is on the element, and the **`onmouseout`** is triggered when the mouse was on the element and user moves it away or "out" of the element.

```html
<div onmouseover="mOver(this)" onmouseout="mOut(this)">Mouse over me and see what happens</div>

<script>
  function mOver(ele) {
    ele.textContent = "Hello, Thank You"
}

function mOut(ele) {
  ele.textContent = "Mouse over me and see what happens"
}
</script>
```

### **`onmousedown`** and **`onmouseup`**
The **`onmousedown`** is triggered when the user clicks and holds on an element (mouse being held) and the **`onmouseup`** triggers when the user releases holding the mouse click.

```html
<div onmousedown="mDown(this)" onmouseup="mUp(this)">Click me :)</div>

<script>
  function mDown(ele) {
    ele.textContent = "You can release me now"
}

function mUp(ele) {
  ele.textContent = "Thank you"
}
</script>
```

## DOM Event Listeners
Event listeners make it more easier to add, remove and control the events. It is an alternative to adding the event attributes manually for the elements.

The **`addEventListener(event, function)`** attaches an "event listener" to an element and executes the _**function**_ when the **_event_** occurs. This event listener can be removed using the **`removeEventListener(event, function)`** function on the element.

```html
<button id="btn">Click here!</button>

<script>
const button = document.getElementById("btn");

// adding an 'onclick' or 'click' event listener on button
button.addEventListener('click', () => {
  alert("Button clicked");
});

// event listeners are not just restricted to HTML elements
// we can add an event listener to the 'window' or 'document' objects also
window.addEventListener('resize', () => {
  alert("You are resizing the window");
});

// a single element can also have more than 1 event listeners
button.addEventListener('mouseover', () => {
  button.textContent = "Are you sure about that?";
});
button.addEventListener('mouseout', () => {
  button.textContent = "Why are you not sure about that?";
});


// removing event listeners
function btnClick() {
  button.textContent = "Button clicked";
  button.backgroundColor = "green";

  // remove event listener after one click
  button.removeEventListener('click', btnClick());
}

button.addEventListener('click', btnClick());
</script>
```

### **`useCapture` argument**
The **`addEventListener()`** has a **`useCapture`** argument that defines the type of event propagation.

Event propagation is the way of defining the order of execution of event listeners/handlers. There are 2 types of event propagation: **bubbling** and **capturing**.

For example,
```html
<div id="capture-div">
  <p id="capture-p">Hey there</p>
</div>

<div id="bubble-div">
  <p id="bubble-p">Hey there</p>
</div>

<script>
function divClick() {
  alert("Div element click event triggered");
}

function pClick() {
  alert("P element click event triggered");
}

// addEventListener(event, function, useCapture)
// using capturing event propagation: useCapture argument = true
document.getElementById("capture-div").addEventListener('click', divClick(), true);
document.getElementById("capture-p").addEventListener('click', pClick(), true);

// using bubbling event propagation: no useCapture argument => default = bubbling
document.getElementById("bubble-div").addEventListener('click', divClick());
document.getElementById("bubble-p").addEventListener('click', pClick());
</script>
```

In **Bubbling**, the **_innermost element's event is handled first_**, then the outer element's event. So, the **`pClick()`** is executed first, then **`divClick()`**

In **Capturing**, the **_outermost element's event is handled first_**, then the inner element's event. So, the **`divClick()`** is executed first, then **`pClick()`**