import { createSelector } from 'reselect';
import { filter, values } from 'lodash';
import { Category } from '../../../realm/models';
import { createRealmQueryableSelector } from '../../../utils/realm/reselect';

const categoryQueryableSelector = createRealmQueryableSelector(Category, (categoryQueryable) => {
  return categoryQueryable;
});

export const categoriesSelector = createSelector(categoryQueryableSelector, (categoryQueryable) => {
  return values(categoryQueryable);
})

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