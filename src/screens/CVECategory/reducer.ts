import update from 'immutability-helper';
import uuid from 'uuid';
import { changeFormValue, setupNewCategory, loadCategory, clearState } from './actions';

const initialState = {
	category: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case loadCategory.START: {
			const category = action.payload;
			return update(state, { category: { $set: { ...category } } });
		}
		case changeFormValue.START: {
			const values = action.payload;
			return update(state, { category: { $merge: values } });
		}
		case setupNewCategory.START: {
			const category = {
				id: uuid.v4(),
				name: '',
				type: 'expense',
				icon: 'custom_icon.png',
			}
			return update(state, { category: { $set: category } });
		}
		case clearState.START: {
			return update(state, {
				$set: initialState,
			});
		}
		default:
			return state;
	}
}
