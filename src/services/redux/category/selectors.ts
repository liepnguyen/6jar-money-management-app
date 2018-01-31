import { createSelector } from 'reselect'

export const categoryEntityStateSelector = (state) => { return state.entities.category; }

export const categoriesSelector = createSelector(
  categoryEntityStateSelector, (category) => {
    return category.rows;
  }
);