import { createSelector } from 'reselect';
import { keyBy, orderBy } from 'lodash';
import { Category } from '../../../realm/models';
import { createRealmQueryableSelector } from '../../../utils/realm/reselect';

export const categoryQuerySelector = createRealmQueryableSelector(Category, (categoryQuery) => {
  return categoryQuery;
});

export const categoriesSelector = createSelector(categoryQuerySelector, (categoryQuery) => {
  return orderBy(categoryQuery.map(c => c), ['name'], ['asc']);
});

export const categoryByIdSelector = createSelector(categoriesSelector, (categories) => {
  return keyBy(categories, 'id');
});