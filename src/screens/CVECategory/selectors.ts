import { createSelector } from 'reselect';

export const screenStateSelector = (state) => { return state.screens.cveCategory; }

export const categorySelector = createSelector(screenStateSelector, (screenState) => {
  return screenState.category;
});