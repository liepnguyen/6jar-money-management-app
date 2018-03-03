import moment from 'moment';
import update from 'immutability-helper';
import uuid from 'uuid';

import { loadTransactionToViewOrEdit } from '../ViewTransactionsContainer/actions';

import { CHANGE_FORM_VALUE, SETUP_NEW_TRANSACTION } from './actions';

const initialState = {
	currentTransaction: {},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FORM_VALUE: {
			const { payload: { field, value } } = action;
			return update(state, { currentTransaction: { [field]: { $set: value } } });
		}
		case SETUP_NEW_TRANSACTION: {
			const now = moment().startOf('day').valueOf();
			const newTransaction = {
				id: uuid.v4(),
				date: now,
				amount: 0,
				note: '',
			}
			return update(state, { currentTransaction: { $set: newTransaction } });
		}
		case loadTransactionToViewOrEdit.EXECUTE:
			const transaction = action.payload;
			return update(state, { currentTransaction: { $set: transaction } });
		default:
			return state;
	}
}
