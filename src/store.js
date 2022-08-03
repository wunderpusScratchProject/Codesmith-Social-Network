import { action, createStore } from 'easy-peasy';

export const store = createStore({
  isAuthenticated: false,
  isCohortSet: false,

  changeAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
  }),
  setCohort: action((state, payload) => {
    state.isCohortSet = payload;
  }),
});
