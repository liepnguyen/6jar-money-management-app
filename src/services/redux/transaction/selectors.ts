import { createSelector } from 'reselect';
import { orderBy, filter } from 'lodash';
import moment from 'moment';

export const transactionEntityStateSelector = (state) => { return state.entities.transaction; }

export const transactionsSelector = createSelector(
  transactionEntityStateSelector, (transactionResource) => {
    return orderBy(transactionResource.rows, ['date', 'createdDateTime'], ['asc', 'asc']);
  }
);

export const transactionsInThisMonthSelector = createSelector(
  transactionsSelector, (transactions) => {
    const startOfThisMonth = moment().startOf('month').valueOf();
    const endOfThisMonth = moment().endOf('month').valueOf();
    return filter(transactions, (transaction) => {
      const { date } = transaction;
      return date >= startOfThisMonth && date <= endOfThisMonth;
    })
  }
);


export const expenseTransactionsInThisMonthSelector = createSelector(
  transactionsInThisMonthSelector, (transactions) => {
    return filter(transactions, (t) => { return t.type === 'expense' });
  }
);

export const incomeTransactionsInThisMonthSelector = createSelector(
  transactionsInThisMonthSelector, (transactions) => {
    return filter(transactions, (t) => { return t.type === 'income' });
  }
);