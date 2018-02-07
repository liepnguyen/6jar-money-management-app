import { createSelector } from 'reselect';
import { filter } from 'lodash';

export const categoryEntityStateSelector = (state) => { return state.entities.category; }

export const categoriesSelector = createSelector(
  categoryEntityStateSelector, (category) => {
    return category.rows;
  }
);

export const incomeCategoriesSelector = createSelector(
  categoriesSelector, (categories) => {
    return filter(categories, { type: 'income' });
  }
);

export const expenseCategoriesSelector = createSelector(
  categoriesSelector, (categories) => {
    return filter(categories, { type: 'expense' });
  }
);