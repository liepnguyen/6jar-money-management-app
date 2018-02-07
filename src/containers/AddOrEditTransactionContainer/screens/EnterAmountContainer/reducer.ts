import { merge } from 'lodash';
import { NOTIFY_BUTTON_PRESS } from './actions';
import { ButtonType } from './constants';

const initialState = {
	calculator: {
		displayText: '1,532 + 2 * 2 / 6',
	},
};

const updateStateWhenCalculatorButtonPress = (state, action) => {
	return state;
}

export default function(state = initialState, action) {
	switch (action.type) {
		case NOTIFY_BUTTON_PRESS: {
			return updateStateWhenCalculatorButtonPress(state, action);
		}
		default:
			return state;
	}
}
