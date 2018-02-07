import { merge, uniqueId } from 'lodash';
import moment from 'moment';
import update from 'immutability-helper';

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
				id: uniqueId('t'),
				date: now,
				amount: 0,
				note: '',
			}
			return update(state, { currentTransaction: { $set: newTransaction } });
		}
		default:
			return state;
	}
}
