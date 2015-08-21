<img style="float:right;height:150px;width:150px;margin-top:30px;" src="duck.jpg"/>

# Ducks: Redux Reducer Bundles

I find as I am building my redux app, one piece of functionality at a time, I keep needing to add  `{actionTypes, actions, reducer}` tuples for each use case. I have been keeping these in separate files and even separate folders, however 95% of the time, it's only one reducer/actions pair that ever needs their associated actions.

<div style="clear:right;"></div>

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
...and it will only import the actions, ready to be passed to `bindActionCreators()`.

### Implementation

The migration to this code structure was [painless](https://github.com/erikras/react-redux-universal-hot-example/commit/3fdf194683abb7c40f3cb7969fd1f8aa6a4f9c57), and I foresee it reducing much future development misery.

Please submit any feedback via an issue or a tweet to [@erikras](https://twitter.com/erikras). It will be much appreciated.