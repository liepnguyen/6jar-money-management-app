import { groupBy, keyBy } from 'lodash';
import { createSelector } from 'reselect';
import { transactionsSelector } from '../../services/redux/transaction/selectors';
import { categoriesSelector } from '../../services/redux/category/selectors';

export const screenStateSelector = (state) => { return state.screens.viewTransactions; }

export const filterSelector = createSelector(
  screenStateSelector, (screenState) => {
    return screenState.filter;
  }
);

export const filteredTransactionsSelector = createSelector(
  transactionsSelector, categoriesSelector, filterSelector, (transactions, categories, filter) => {
    const categoryById = keyBy(categories, 'id');
    return transactions.map((transaction) => { return { ...transaction, category: categoryById[transaction.categoryId]} });
  }
);

export const filteredTransactionByDateSelector = createSelector(
  filteredTransactionsSelector, (transactions) => {
    return groupBy(transactions, 'date');
  }
);

