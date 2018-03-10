import { createSelector } from 'reselect';
import { keyBy } from 'lodash';
import { Category } from '../../../realm/models';
import { createRealmQueryableSelector } from '../../../utils/realm/reselect';

export const categoryQuerySelector = createRealmQueryableSelector(Category, (categoryQuery) => {
  return categoryQuery;
});

export const categoriesSelector = createSelector(categoryQuerySelector, (categoryQuery) => {
  return categoryQuery.map(c => c);
});

export const categoryByIdSelector = createSelector(categoriesSelector, (categories) => {
  return keyBy(categories, 'id');
});