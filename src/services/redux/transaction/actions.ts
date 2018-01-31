import { createAction } from 'redux-actions';

const NAMESPACE = 'TRANSACTION'

export const SAVE_TRANSACTION = `${NAMESPACE}/SAVE_TRANSACTION`;

export const saveTransaction = createAction(SAVE_TRANSACTION, (transaction: any) => {
	return { transaction };
});