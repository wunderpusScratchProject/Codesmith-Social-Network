import { action, createStore } from 'easy-peasy';

export const store = createStore({
  isAuthenticated: false,
  isCohortSet: false,
  searchValue: '',
  changeAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
  }),
  setCohort: action((state, payload) => {
    state.isCohortSet = payload;
  }),
  setSearchValue: action((state, payload) => {
    state.searchValue = payload;
  })
});
