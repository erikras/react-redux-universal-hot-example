# Inline Styles

In the long term, CSS, LESS and SASS are dead. To keep this project on the bleeding edge, we should drop SASS support in favor of inline styles.

## Why?

I think the case is made pretty strongly in these three presentations.

Christopher Chedeau | Michael Chan | Colin Megill
--- | --- | ---
[![CSS In Your JS by Christopher Chedeau](https://i.vimeocdn.com/video/502495328_295x166.jpg)](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html) | [![Michael Chan - Inline Styles: themes, media queries, contexts, & when it's best to use CSS](https://i.ytimg.com/vi/ERB1TJBn32c/mqdefault.jpg)](https://www.youtube.com/watch?v=ERB1TJBn32c) | [![Colin Megill - Inline Styles are About to Kill CSS](https://i.ytimg.com/vi/NoaxsCi13yQ/mqdefault.jpg)](https://www.youtube.com/watch?v=NoaxsCi13yQ)

Clearly this is the direction in which web development is moving.

## Why not?

At the moment, all the inline CSS libraries suffer from some or all of these problems:

* Client side only
* No vendor auto prefixing (requires `User-Agent` checking on server side)
* No server side media queries, resulting in a flicker on load to adjust to client device width

Ideally, a library would allow for all the benefits of inline calculable styles, but, in production, would allow some generation of a CSS block, with media queries to handle device width conditionals, to be inserted into the page with a `<style>` tag, and then each element that was using a style that was dependent on a media query would have a class name generated.

## Contenders

This is a list of possible style libraries that we could implement into this project.

* [Radium](https://github.com/FormidableLabs/radium)
* [React-JSS](https://github.com/jsstyles/react-jss)
* [jsxstyle](https://github.com/petehunt/jsxstyle)
* [css-modules](https://github.com/css-modules/css-modules)
* [babel-plugin-react-autoprefix](https://github.com/UXtemple/babel-plugin-react-autoprefix)
* [babel-plugin-css-in-js](https://github.com/martinandert/babel-plugin-css-in-js)
* _Add more if you know of others._

Users and contributors to this project should periodically go through this list and see if any of them have developed features that make them really worthy of server side rendering in a production environment.

## Additional Reading

* [How do we make “styles in components” play nicely with server-side rendering?](https://medium.com/@jedwatson/how-do-we-make-styles-in-components-play-nicely-with-server-side-rendering-25de9ecb1b49)
