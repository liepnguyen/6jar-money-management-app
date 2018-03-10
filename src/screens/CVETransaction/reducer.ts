import moment from 'moment';
import update from 'immutability-helper';
import uuid from 'uuid';

import { changeFormValue, setupNewTransaction, loadTransaction } from './actions';

const initialState = {
	transaction: {},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case changeFormValue.START: {
			const keyValue = action.payload;
			return update(state, { transaction: { $merge: keyValue } });
		}
		case setupNewTransaction.START: {
			const now = moment().startOf('day').valueOf();
			const newTransaction = {
				id: uuid.v4(),
				date: now,
				amount: 0,
				note: '',
			}
			return update(state, { transaction: { $set: newTransaction } });
		}
		case loadTransaction.START:
			const transaction = action.payload;
			return update(state, { transaction: { $set: transaction } });
		default:
			return state;
	}
}
