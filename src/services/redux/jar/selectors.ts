import { createSelector } from 'reselect';
import { groupBy, map, sumBy } from 'lodash';
import { expenseTransactionsInThisMonthSelector } from '../transaction/selectors';

export const jarEntityStateSelector = (state) => { return state.entities.jar; }

export const jarRowsSelector = createSelector(jarEntityStateSelector, (jar) => {
  return jar.rows;
});

export const jarsSelector = createSelector(
  jarRowsSelector, expenseTransactionsInThisMonthSelector, (jarRows, expenseTransactionsInThisMonth) => {
    const expenseTransactionInThisMonthByJarId = groupBy(expenseTransactionsInThisMonth, 'jarId');
    return map(jarRows, (r) => {
      const usedInThisMonth = sumBy(expenseTransactionInThisMonthByJarId[r.id], 'amount');
      return { ...r, usedInThisMonth };
    });
  }
);

export const jarReportSelector = createSelector(jarsSelector, (jars) => {
  const totalAvailable = sumBy(jars, 'available');
  const totalUsedInThisMonth = sumBy(jars, 'usedInThisMonth');
  return { totalAvailable, totalUsedInThisMonth };
});