# **_Week 5.1_: Shallow Dive into React**

Statis websites don't need React and can be written in raw HTML. React's use case is Dynamic website as it allows to simplify DOM Manipulation.

jQuery was a library introduced for easing DOM Manipulation in the conventional HTML/CSS/JS framework, but for bigger projects, it was still very hard. React converts the code into HTML/CSS/JS under the hood.

Example counter in HTML/CSS/JS:

```html
<!DOCTYPE html>
<html>
    <script>
        function onButtonPress () {
            const currentValue = document.getElementById('btn').innerHTML;
            console.log(currentValue.split(" ");
            const currentCounter = currentValue.split(" ")[1];
            const newCounter = parseInt(currentCounter) + 1;
            document.getElementById('btn').innerHTML = newCounter;
        }
    </script>
    <body>
        <button onclick="onButtonPress()" id='btn'>Counter 0</button>
    </body>
</html>
```

### State, Components, Re-rendering

Front-end can be effectively divided into 2 parts: State and Components.

**State**: object that represents the current state of the app/website. It _represents dynamic parts/variables_ in the app (Ex: counter value).

**Components**: How a DOM element is rendered given a state i.e., it is a re-usable and dynamic "HTML snippet" that changes according to the state (Ex: counter button).

**Re-rendering**: state change/update triggers a "re-render" which represents the actual DOM being manipulated when the state changes.

We can define all the conponents once and as the state changes React takes care of updating and re-rendering the components.

Example script of how State and Components work (check `state_component.html` for full working code):

```js
// Initializing a State variable
let state = {
    count: 0
}    

// creating a button component
function createButtonComponent (count) {
    const btn = document.createElement('button');
    btn.innerHTML = `Counter ${count}`;
    btn.setAttribute('onclick', 'onBtnClick()');
    return btn;
}

// re-rendering component
function buttonComponentReRender () {
    // clearing the parent div
    document.getElementById('buttonParent').innerHTML = "";

    // new button component with updated state
    const btnComponent = createButtonComponent(state.count);
                
    // add new button component to parent div
    document.getElementById('buttonParent').appendChild(btnComponent);
}

// onclick event handler
function onBtnClick () {
    state.count++; // updating state
    // re-rendering button component
    buttonComponentReRender();
}

// Initial call to render the button
buttonComponentReRender();
```

Equivalent React code as above:

```jsx
import React from 'react';

function App() {
    // Initializing state variable with 0
    const [count, setCount] = React.useState(0);

    return (
        <div>
            // passing count variable and update function
            // as props which can be used in Button def'n
            <Button count={count} setCount={setCount} />
        <div>
    );
}

// props = { count: <value>, setCount: <update function>}
// Button component definition
function Button(props) {
    // click event handler
    function onButtonClick() {
        // updating state upon click
        props.setCount(props.count + 1);
    }

    // re-rendering happens when props.count is updated
    return (
        <button onClick={onButtonClick()}>
            Counter {props.count}
        </button>
    );
}

export default App;
```

`npm run dev` will run the React app on localhost.

`npm run build` creates a `dist` folder in the root of the project, which is the only thing required to host the app on a server and make it available on internet. This command takes all the React code and converts it into JS.

### React Building Blocks

A component in React's .jsx file effectively 'returns HTML' i.e., it includes JS logic along woth HTML code that can be embedded with the dynamic variables (state), and JS functions also.

```jsx
function App() {
  // JS logic here
  let state = {
    count: 0,
  }

  // returning "HTML"
  // JS variables have to be enclosed in {}
  return (
    <div>
      <button>Counter {state.count}</button>
    </div>
  );
}

export default App;
```

JSX differs from HTML not only in the ability to embed JS into it, but also certain keywords differ.
Ex: `<button onclick="func()">...</button>` in HTML is written as `<button onClick="func()">...</button>`
> **`onClick` instead of `onclick`, `htmlFor` instead of `for`, `className` instead of `class` are all examples of keywords in HTML that are changed in JSX because terms like `class` and `for` are used in JS to define class and for loops.**

```jsx
let state = {
    count: 0,
}

function App() {

    function onClickHandler() {
        state.count += 1;
    }
  
  // onclick is written as onClick and the function is enclsed within {}
  // also no need to call the function explicitly like func()
  // mentioning the function name is enough and react calls the function
  return (
    <div>
      <button onClick={onClickHandler}>Counter {state.count}</button>
    </div>
  );
}

export default App;
```

The above should be a primitive working counter, as we are defining a state, component with an update handler and also updating the state. React would take care of re-rendering when the state changes as it watches the state variable and when updated, it re-renders the DOM. But this doesn't work, because we have defined state as a normal JS variable. In order for React to keep watching that state and re-render when it changes, it requires us to use a spcific function to define the state.

React provides a function/method called **`useState`** also known as a React **"hook"**. It allows ius to define the state variables and it returns a state-update function as well which is used to update the state when required.

```jsx
import {useState} from 'react';

function App() {
  // count -> state var, setCount -> state-update method
  // useState(<init value>) returns both count and setCount in an array
  const [count, setCount] = useState(0);

  function onClickHandler() {
    // setCount has to be called with the new value
    // once setCount is called, React re-renders the DOM with new value
    setCount(count + 1); 
  }

  return (
    <div>
      <button onClick={onClickHandler}>Counter {count}</button>
    </div>
  );
}

export default App;
```

The above code makes a working Counter app, but we can try to structure the code better by making use of components rather than adding all the HTML in the `App` component itself.

We can define multiple components in the same .jsx file and pass values among them using **`props`**. Props allow us to pass values to components and is like an object (**`props = {key: value}`**)

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  // main App conponent just renders the Child components and passes props
  // all the values present after component name are added in an object and
  // passed as props to the component like,
  // props = {
  //   count: 0, setCount: func()
  // } 
  return (
    <div>
      <CustomButton count={count} setCount={setCount} /> 
    </div>
  );
}

// define the child component with all the logic and update handling
// to keep the main App's code more readable and clean
function CustomButton(props) {
    
  function onClickHandler() {
    props.setCount(props.count + 1); 
  }

  return <button onClick={onClickHandler}>Counter {props.count}</button>
}

export default App;
```

Having multiple components and rendering them in main code, allows us to re-use the child components whenrever needed while maintaining the code readability and not repeating the same logic multiple times.

The original way to write React way it different from the above.

```jsx
// current/easier way
return <button onClick={onClickHandler}>Counter {props.count}</button>

// actual Reaact way
return React.createElement(
    'button',
    { onClick: onClickHandler },
    `Counter ${props.count}`
);
```

Both ways are correct and if we write the React code in the first way, it gets **"transpiled"** to the second, actual React syntax. The first way is just syntactic sugar to make it easier to write React code.

For more complex state with arrays, like in a To-Do app where state looks like **`[{todo1}, {todo2}, ...]`**, we can't just directly render the state as it is and need to iterate/loop through the array and render each item. So for such scenarios, it is better to make a component that simple renders single item and call that over and over again in the loop.

```jsx
// component that renders single todo
function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </div>
  )
}

// within App component,
return (
    <div>
      {todos.map((todo) => {
        return <Todo title={todo.title} description={todo.description}/>
      })}
    </div>
);
```

Here, the map function takes 1 item from the **`'todos'`** state and uses the **`Todo`** component to render each one. So now how many ever todos are added in the state, the map function just iterates thourgh all and displays all of them, so no need to manually add each todo.

We can also add todos into the state using the **`setTodos()`** and **`...`** operator (spread operator -> "opens up/spreads" the existing array)

```jsx
function AddRandomTodo() {
    setTodos([
      ...todos,
      {
        title: "new Todo",
        description: "new Todo description",
        completed: false,
      },
    ]);
}
```

> **NOTE**: _**When a Parent component re-renders, it's Child components (even thought they don't take any state variables as input/arguments) also re-render**_

Coming to the backend of a React App, we can use Node/Express. To initialize a node project, we can run the **`npm init`**

### Connecting Frontend and Backend

If our frontend is running on **`localhost:5173`**, we can't hit the backend running on **`localhost:3000`**. It gives a CORS error (Cross Origin Resource Sharing), unless the backend allows the frontend to send a silent request on localhost.

To fix this, in the backend **`index.js`** add **`cors`** as a middleware.

```js
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());

// app.use(cors()); // allows any frontend to silently hit backend
// we can specify the URLs to allow to hit backend as well
app.use(cors({
  origin: "http://localhost:5173"
}));
```

To fetch data from the backend, we can use **'fetch'**, but the problem with this approach is that when data is fetched and **`setTodos(res.json().todos)`** runs, it re-renders the DOM and App component runs again, causing the fetch to call again. This goes in an infinite loop and not viable. **`useEffect()`** is another React hook that is meant to solve this problem.

Easy but wrong way to fetch data:

```jsx
fetch("http://localhost:3000/todos").then(async (res) => {
    const json = await res.json();
    setTodos(json.todos);
  });
```

To get the value entered in the input fields to pass it to the backend, we can add IDs in the input fields and use **`document.getElementById("id")`**. But, the main point of using React is to get away from this type of low level methods. So, a better and common but un-optimal method is to store the input field values in state variables and use the **`onChange`** event trigger to **`setTitle()`** or **`setDescription()`**.

```jsx
return (
  <input
    type="text"
    placeholder="Title: "
    onChange={(e) => {
      setTitle(e.target.value);
    }}
  ></input>
  <input
    type="text"
    placeholder="Description: "
    onChange={(e) => {
      setDescription(e.target.value);
    }}
  ></input>
)
```

Also, whenever using **`fetch`** to POST data when button click or some event, the JSON sent in the body has to be **`"stringified"`** and **`headers: {"contentType": "application/json"}`** has to be added so the backend can understand the JSON.

```js
<button
  onClick={() => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title, // title stored in state variable
        description: description, // desc in state variable
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (res) => {
      const json = res.json();
      alert("Todo added");
    });
  }}
>
  Add Todo
</button>
```

