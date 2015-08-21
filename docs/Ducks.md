# Ducks: Redux Reducer Bundles

<img src="duck.jpg" align="right"/>

I find as I am building my redux app, one piece of functionality at a time, I keep needing to add  `{actionTypes, actions, reducer}` tuples for each use case. I have been keeping these in separate files and even separate folders, however 95% of the time, it's only one reducer/actions pair that ever needs their associated actions.

To me, it makes more sense for these components to be bundled together in an isolated module that is self contained, and can even be packaged easily into a library.

## The Proposal

### Example

```javascript
// widgets.js

const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

export function loadWidgets() = {
  return { type: LOAD };
}

export function createWidget(widget) = {
  return { type: CREATE, widget };
}

export function updateWidget(widget) = {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) = {
  return { type: REMOVE, widget };
}
```
### Rules

A module...

1. MUST `export default` a function called `reducer()`
2. MUST `export` its action creators as functions
3. MUST have action types in the form `npm-module-or-app/reducer/ACTION_TYPE`
3. MAY export its action types as `UPPER_SNAKE_CASE`, if an external reducer needs to listen for them, or if it is a published reusable library

These same guidelines are recommended for `{actionType, action, reducer}` bundles that are shared as reusable Redux libraries.

### Name

Java has jars and beans. Ruby has gems. I suggest we call these reducer bundles "ducks", as in the last syllable of "redux".

### Usage

You can still do:

```javascript
import { combineReducers } from 'redux';
import * as reducers from './ducks/index';

const rootReducer = combineReducers(reducers);
export default rootReducer;
```

You can still do:

```javascript
import * as widgetActions from './ducks/widgets';
```
...and it will only import the action creators, ready to be passed to `bindActionCreators()`.

There will be some times when you want to `export` something other than an action creator. That's okay, too. The rules don't say that you can *only* `export` action creators. When that happens, you'll just have to enumerate the action creators that you want. Not a big deal.

```javascript
import {create, update, remove, increment} as widgetActions from './ducks/widgets';
// ...
bindActionCreators({create, update, remove, increment}, dispatch);
```

### Implementation

The migration to this code structure was [painless](https://github.com/erikras/react-redux-universal-hot-example/commit/3fdf194683abb7c40f3cb7969fd1f8aa6a4f9c57), and I foresee it reducing much future development misery.

Please submit any feedback via an issue or a tweet to [@erikras](https://twitter.com/erikras). It will be much appreciated.

Happy coding!

-- Erik Rasmussen
