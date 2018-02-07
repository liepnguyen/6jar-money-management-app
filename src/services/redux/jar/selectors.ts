import { createSelector } from 'reselect';

export const jarEntityStateSelector = (state) => { return state.entities.jar; }

export const jarsSelector = createSelector(
  jarEntityStateSelector, (jar) => {
    return jar.rows;
  }
);