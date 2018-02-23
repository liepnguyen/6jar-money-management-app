import { createAction } from 'redux-actions';
import { get, filter, head } from 'lodash';
import { enterIncomeAction, entereExpenseAction } from '../common/actions';

const NAMESPACE = 'TRANSACTION'

export const SAVE_TRANSACTION = `${NAMESPACE}/SAVE_TRANSACTION`;

export const saveTransactionAction = createAction(SAVE_TRANSACTION, (transaction: any) => {
	return { transaction };
});

export const saveTransaction = (transaction: any) => {
	return (dispatch, getState) => {
		dispatch(saveTransactionAction(transaction));
		const state = getState();
		const category = head(filter(get(state, 'entities.category.rows'), (cat) => { 
			return cat.id === transaction.categoryId;
		})) || {};
		if (category.type === 'income') {
			const { amount } = transaction;
			dispatch(enterIncomeAction({ amount }));
		} else if (category.type === 'expense') {
			const { jarId, amount } = transaction;
			dispatch(entereExpenseAction({ jarId, amount }));
		}
	}
}
