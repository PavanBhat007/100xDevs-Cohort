# CLASS 1 - ***INTRODUCTION AND SETUP***

# CLASS 2 - ***TAGS & ATTRIBUTES***
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