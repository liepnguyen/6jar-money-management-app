import { filter, head } from 'lodash';
import { createSelector } from 'reselect';
import { categoriesSelector } from '../../services/redux/category/selectors';

export const screenStateSelector = (state) => { return state.screens.addOrEditTransaction; }

export const currentTransactionSelector = createSelector(
  screenStateSelector, (screenState) => {
    return screenState.currentTransaction;
  }
);

export const selectedCategoryIdSelector = createSelector(
  currentTransactionSelector, (currentTransaction) => {
    return currentTransaction.categoryId;
  }
);

export const selectedCategorySelector = createSelector(
  categoriesSelector, selectedCategoryIdSelector, (categories, categoryId) => {
    return head(filter(categories, { id: categoryId }));
  }
);

