import { createSelector } from 'reselect';
import { groupBy, map, sumBy } from 'lodash';
import { expenseTransactionsInThisMonthSelector } from '../transaction/selectors';

export const jarEntityStateSelector = (state) => { return state.entities.jar; }

export const jarsSelector = createSelector(
  jarEntityStateSelector, expenseTransactionsInThisMonthSelector, (jar, expenseTransactionsInThisMonth) => {
    const expenseTransactionInThisMonthByJarId = groupBy(expenseTransactionsInThisMonth, 'jarId');
    return map(jar.rows, (r) => {
      const usedInThisMonth = sumBy(expenseTransactionInThisMonthByJarId[r.id], 'amount');
      return { ...r, usedInThisMonth };
    });
  }
);