import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import { jarByIdSelector } from '../../../../../../shared/redux/selectors/jarSelectors';
import { transactionQuerySelector } from '../../../../../../shared/redux/selectors/transactionSelectors';
import { categoryByIdSelector } from '../../../../../../shared/redux/selectors/categorySelectors';

const getFromDate = (state, props) => {
  return props.from;
}

const getToDate = (state, props) => {
  return props.to;
}

export const makeGetTransactionsReport = () => {
  return createSelector([transactionQuerySelector, categoryByIdSelector, jarByIdSelector, getFromDate, getToDate],
    (transactionQuery, categoryById, jarById, from, to) => {
      const transactions = transactionQuery.filtered('date >= $0 AND date <= $1', from, to)
        .sorted('date')
        .map((t) => { return { ...t, category: categoryById[t.categoryId], jar: jarById[t.accountId] } });
      let inflow = 0, outflow = 0;
      forEach(transactions, (t) => {
        if (t.type === 'income') {
          inflow += t.amount;
        } else if (t.type === 'expense') {
          outflow += t.amount;
        }
      })
      return {
        transactions,
        inflow,
        outflow,
      }
    });
}