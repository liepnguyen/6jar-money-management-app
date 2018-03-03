import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import { jarByIdSelector } from '../../../../../../services/redux/jar/selectors';
import { transactionQuerySelector } from '../../../../../../services/redux/transaction/selectors';
import { categoryByIdSelector } from '../../../../../../services/redux/category/selectors';

const getFromDate = ({ }, props) => {
  return props.from;
}

const getToDate = ({ }, props) => {
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