import { createSelector } from 'reselect';
import { groupBy, map, sumBy, values } from 'lodash';
import moment from 'moment';
import Realm from 'realm';
import { Jar, Transaction } from '../../../realm/models';
import { createRealmQueryableSelector } from '../../../utils/realm/reselect';
import { expenseTransactionsInThisMonthSelector, transactionQuerySelector } from '../transaction/selectors';

export const jarsQuerySelector = createRealmQueryableSelector(Jar, (jarQuery) => {
  return jarQuery;
});

export const totalIncomeAmountSelector = createSelector(transactionQuerySelector, (transactionQuery: Realm.Results<Transaction>) => {
  return transactionQuery.filtered('type = $0', 'income').sum('amount');
});

export const totalExpenseAmountSelector = createSelector(transactionQuerySelector, (transactionQuery: Realm.Results<Transaction>) => {
  return transactionQuery.filtered('type = $0', 'expense').sum('amount');
});

export const totalAvailableSelector = createSelector(totalIncomeAmountSelector, totalExpenseAmountSelector, (totalIncomeAmount, totalExpenseAmount) => {
  return totalIncomeAmount - totalExpenseAmount;
});

export const jarsSelector = createSelector(
  jarsQuerySelector, transactionQuerySelector, expenseTransactionsInThisMonthSelector, totalIncomeAmountSelector, 
  (jarQuery, transactionQuery, expenseTransactionsInThisMonth, totalIncomeAmount) => {
    const jars = values(jarQuery);
    const expenseTransactionInThisMonthByJarId = groupBy(expenseTransactionsInThisMonth, 'accountId');
    return map(jars, (jar) => {
      const usedAmount = transactionQuery.filtered('type = $0 AND accountId = $1', 'expense', jar.id).sum('amount');
      const available = (totalIncomeAmount * jar.incomePercentage / 100) - usedAmount;
      const usedInThisMonth = sumBy(expenseTransactionInThisMonthByJarId[jar.id], 'amount');
      return { ...jar, usedInThisMonth, available };
    });
});

export const jarReportSelector = createSelector(transactionQuerySelector, totalAvailableSelector, (transactionQuery: Realm.Results<Transaction>, totalAvailable) => {
  const startOfThisMonth = moment().startOf('month').valueOf();
  const endOfThisMonth = moment().endOf('month').valueOf();
  const totalUsedInThisMonth = transactionQuery
    .filtered('date >= $0 AND date <= $1 AND type = $2', startOfThisMonth, endOfThisMonth, 'expense')
    .sum('amount');
  return { totalAvailable, totalUsedInThisMonth };
});