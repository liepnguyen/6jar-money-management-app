import { Results } from 'realm';
import { createSelector } from 'reselect';
import { filter } from 'lodash';
import moment from 'moment';
import { Transaction } from '../../../realm/models';
import { createRealmQueryableSelector } from '../../../utils/realm/reselect';

export const transactionQuerySelector = createRealmQueryableSelector(Transaction, (transactionQueryable) => {
  return transactionQueryable;
});

export const transactionsInThisMonthSelector = createSelector(
  transactionQuerySelector, (transactionQuery: Results<any>) => {
    const startOfThisMonth = moment().startOf('month').valueOf();
    const endOfThisMonth = moment().endOf('month').valueOf();
    return transactionQuery
      .filtered(`date >= $0 AND date <= $1`, startOfThisMonth, endOfThisMonth)
      .map(r => r);
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