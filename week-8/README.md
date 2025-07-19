# **_Week 8.1 (12.2 from Cohort 1): YouTube clone using Tailwind CSS_**

## **Tailwind CSS Basics**

Tailwind CSS is writeen in _**`className`**_ and not in _**`style`**_ as in Vanilla CSS. This is the main distinction between the two and another main difference is that Tailwind CSS reduces the words/keywords needed to define styles when compared to Vanilla CSS, which we cans ee as we use Tailwind CSS.

### Flexbox

Used to display 'Block' elements as 'Inline' elements.

There are many parameters that can be used along with Flex to align elements as per requirement.

1. _**`justify-content`**_: modify X-axis alignment of elements
    - It has values like _`flex-start`_, _`flex-end`_, _`center`_, _`space-between`_, _`space-around`_, etc

    ![Justify-Content values illustration](./screenshots/justify-content.png)
    - In Vanilla CSS,

    ```js
    <div style={{display: "flex", justifyContent: "<value>"}}>
        <div style={{background: "red"}}>First div</div>
        <div style={{background: "green"}}>Second div</div>
        <div style={{background: "blue"}}>Third div</div>
    </div>
    ```

    - In Tailwind CSS, the values for justify are _`between`_, _`around`_, _`start`_, _`end`_, _`center`_

    ```js
    <div className="flex justify-<value>">
        <div style={{background: "red"}}>First div</div>
        <div style={{background: "green"}}>Second div</div>
        <div style={{background: "blue"}}>Third div</div>
    </div>
    ```

### Grids

Used to divide area equally among 'n' elements in a tabular/grid style.

- _`grid`_ keyword is used to make a parent div as a grid
- _`grid-cols-<num>`_ is used to specify the number of columns i.e., "How many divisions are done horizontally?"
- _`grid-rows-<num>`_ is used to specify the number of rows i.e., "How many divisions are done vertically?"

```js
<div className="grid grid-cols-<num_cols>">
    <div style={{background: "red"}}>First div</div>
    <div style={{background: "green"}}>Second div</div>
    <div style={{background: "blue"}}>Third div</div>
</div>
```

> _Note: These will always divide the area equally among the 'n' children_

For unequal divisions, we can use _`col-span`_ and _`row-span`_.

```js
<div className="grid grid-cols-12">
    <div 
        className="col-span-5" 
        style={{background: "red"}}
    >First div</div>
    <div 
        className="col-span-5" 
        style={{background: "green"}}
    >Second div</div>
    <div 
        className="col-span-2" 
        style={{background: "blue"}}
    >Third div</div>
</div>
```

Here, first and second elements take up 5 columsn each and last ement takes up just 2 columns.

### Responsiveness

![Responsive Breakpoints](./screenshots/responsive-breakpoints.png)

Tailwind uses 'Mobile-first" approach where

- if no breakpoint mentioned, all screen sizes have the specified style
- if breakpoint mentioned, thotyles take effect at specified breakpoint and _"above"_ only.

It says that we should not target mobile using _`sm:<style>`_, but instead write unprefixed styles for mobile and override them for larger screens using respective prefixes.

```jsx
// sm: means small size and above get this style and due to this
// mobile devices (below sm size) have no style specified
<div class='sm:text-center'></div>

// Correct solution
<div class='text-center sm:text-left'></div>
// text-center is applied for mobile devices (below sm)
// text-left is applied to all screens incl. sm and above
```

### Basic styles

Tailwind has it's own color system with some defined keywords for colors and respective shades varying from 50th shade to 950th shade (50, 100, 150, 200, ...).

- Background colour: _`bg-<color>-<shade>` e.g., _`bg-red-300`_
- Font colour: _`text-<color>-<shade>`_ e.g., _`text-slate-800`_

We can also define our own colours either in the config file or using [] to enclose the custom colous.

Ex: _`bg-[#123456] text-[#000000]`_

- Font size: _`text-<xs/sm/base/lg/xl/2xl>`_ where **`xs = 12px`** and each tier increaes by 2px each, and base is the default font size of 16px.
- Border radius: _`rounded`_ or _`rounded-<sm/lg/full>`_ where **`full`** makes element border completely round.

### Utilities

- Flowbite Tailwind Compoents
- Heroicons
