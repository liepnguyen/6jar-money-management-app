import { createSelector } from 'reselect';
import { orderBy } from 'lodash';

export const transactionEntityStateSelector = (state) => { return state.entities.transaction; }

export const transactionsSelector = createSelector(
  transactionEntityStateSelector, (transactionResource) => {
    return orderBy(transactionResource.rows, ['date', 'createdDateTime'], ['asc', 'asc']);
  }
);