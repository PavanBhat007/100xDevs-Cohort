# CLASS 1 - ***INTRODUCTION AND SETUP***

# CLASS 2 - ***TAGS & ATTRIBUTES***
HTML allows to create the top-level strcuture of the webpage

TAGS -> elements that provide basic structure for webpage

Majority of tags require closing tags like, \<tag\> ... \<tag /\>, but some tags are self-closing like \<tag /\> so they don't require specific closing tags.

Some tags also take **attributes** that are additional information that a tag requires to work.
Ex:
```html
<img src="filepath" alt="alternative text" />
<a href="destination">Go to home</a>
<button onlick="buttonClickedFunc()">Click me </button>
```

| TAG | Description |
|:---:|:------------|
| **\<html\>** | webpage is enclosed in html, if not present browser adds it by default |
| **\<head\>** | contains metadata and title of page |
| **\<title\>** | defines title of webpage |
| **\<body\>** | contains main content of webpage shown to the user |
| **\<div\>** | represents a division in the webpage and every div takes up full width i.e., next element will be on next line even though div's contents don't take up whole space |
| **\<span\>** | similar to a div but only takes up as much space as needed |
| **\<h1\>** ... **\<h6\>** | headings, h1 is largest and h6 is smallest |
| **\<p\>** | define a paragraph |
| **\<img src=""\>** | allows to add images on the webpage, where it takes an **src** attribute for the image filename  |
| **\<a href=""\>** | anchor tag is used to redirect to other pages, where **href** attribute will have the destination path |
| **\<b\>** **\<i\>**  | bold text and italic text |
| **\<button\>** | represents a button |
| **\<input\>** | used to create input fields |

These are some of the most basic tags, there are so many more tags but many of they are not used as much.

# CLASS 3 - ***CSS***
CSS allows to style the HTML structure

### Padding and Margin
Padding allows to add space inside the element, whereas Margin allows to add space outside of the element
```css
div {
    margin: 10px;
    padding: 10px;
}
```
There are shorthands for padding and margin.
```css
div {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;

    margin: 5px 10px 5px 10px; /* top right bottom left */
    margin: 5px 10px 5px; /* top right-left bottom */
    margin: 5px 10px; /* top-bottom left-right */
    margin: 5px; /* all sides same value */

    /* same structure for padding also */
}
```
Margin has a special effect for block elements. For centering the element, we can use **auto** for left and right sides.
```css
div {
    margin-left: auto;
    margin-right: auto;

    /* for both left and right */
    margin-inline: auto;
}
```

Padding increases the element size. We can use the **`box-sizing`** to maintain the size but decrease the space inside the element.
```css
div {
    width: 300px;
    padding: 20px;

    /* total size: 300 + 20 (left padding) + 20 (right padding) = 340 */
}

div {
    width: 300px;
    padding: 20px;
    box-sizing: border-box;

    /* total size mintained at 300 */
}
```

### Float attribute
**`float`** is an attribute that can be used to position element in a specific way.
```html
<span>Zerodha</span>
<span style="float: right;">Sign Up</span>
```
This is not the best way to position elements, instead the more common and bext practice is to use **`flexbox`**

### Flexbox
A container with a property of **`display: flex;`** will align all it's children elements on same line (even block elements that take up full width)
```html
<div style="display: flex;">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```
In the above example both the divs will appear right next to each other.

Flexbox has some standard list of attributes commonly used:
- **`justify-content`**: x-axis positioning
    - **`center`**: all children are in the center of the line
    - **`flex-start`**: all children are placed from the beginning of the parent element, this is the default
    - **`flex-end`**: all children are placed from the end of the parent element
    - **`space-between`**: children placed with space between them equally and are as far apart as possible
    - **`space-evenly`**: places the children with equal space between the elements relative to the parent
- **`align-items`**: y-axis positioning, same values as justify-content but deals with the vertical axis
- **`flex-direction`**: 
    - **`row`**: default, places all children on same row
    - **`column`**: places all children on same column, i.e., vertically.

If **`flex-direction: column;`** is used, then the axes corresponding to justify-content and align-items will be switched to y-axis and x-axis respectively.

### Classes and IDs
- Class is an attribute that can be added to any tag, that allows us to define the same styling for multiple elements i.e., there can be many elements with the same class and any styles defined for that class will apply to all those respective elements
- IDs are meant for unique elements, i.e., there can be only 1 element with a specific ID. It is used in places where there are some elements that appear only once.

```html
<h1>Targetting elements</h1>

<div class="container">1st Container</div>
<div class="container">2nd Container</div>
<div class="container">3rd Container</div>
<div class="container">4th Container</div>

<img src="logo.svg" id="brand-logo" />
```

### Targetting elements
- Tags: using the tag name itself directly
- Classes: using class names for styling prefixed with a dot ( . )
- ID: using ID for styling prefixed with a hash ( # )

```css
h1 {
    background-color: "blue";
    color: "light-blue";
}

.container {
    background-color: "blue";
}

#brand-logo {
    width: 10px;
    height: 10px;
}
```


- Inline styling: the style rules are added as a style attribute in the tag itself
```html
<h1 style="color:red;">DANGER!!</h1>
```

- Document level styling: the style rules are added in the style tag in the head
```html
<html>
    <head>
        <style>
            h1 {
                color: "red";
                background-color: "white";
            }
        </style>
    </head>
    <body>
        <h1> DANGER !! </h1>
    </body>
</html>
```

- External style sheets: style rules are added into a separate .css file, the rules are added same as in the document level styling, just the rules are on a different file