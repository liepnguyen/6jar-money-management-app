import { merge } from 'lodash';

const initialState = {
	currentTransaction: {},
};

export default function(state = initialState, action) {
	if (action.type === 'CHANGE_FORM_VALUE') {
		const { payload: { field, value } } = action;
		return merge({}, state, { currentTransaction: { [field]: value } });
	}
	return state;
}
