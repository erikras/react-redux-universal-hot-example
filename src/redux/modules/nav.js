const SET = 'explore-msd/nav/SET';

const initialState = {
  activeNavItem: 'doodle'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      console.log('setting nav in store to ', action.navItem);
      return {
        activeNavItem: action.navItem
      };
    default:
      return state;
  }
}

export function setActiveNavItem(navItem) {
  console.log("let's set this mutha to ", navItem);
  return {
    type: SET,
    navItem
  };
}
