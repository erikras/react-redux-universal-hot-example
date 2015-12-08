const SET = 'explore-msd/nav/SET';

const initialState = {
  activeNavItem: 'doodle'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      const {activeNavItem} = state;
      return {
        activeNavItem: activeNavItem
      };
    default:
      return state;
  }
}

export function setActiveNavItem() {
  return {
    type: SET
  };
}
