import { last, includes, size } from 'lodash';
import update from 'immutability-helper';
import { NOTIFY_BUTTON_PRESS, INIT_CALCULATOR } from './actions';
import { CALC_KEY, OP_KEY, NUMBER_KEY } from './constants';

const initialState = {
	calculator: {
		expressionParts: [],
		hasFinalResult: false,
	},
};

const isValidKeyInput = (keyValue: string, lastPart: string): boolean => {
	if (NUMBER_KEY[keyValue]) {
		if (size(lastPart) + size(keyValue) > 15) {
			return false;
		}
		if (includes(lastPart, '.')) {
			const decimalPortion = lastPart.slice(lastPart.indexOf('.') + 1);
			if (decimalPortion.length + size(keyValue) > 3) {
				return false;
			}
		}
	}
	return true;
}

const updateStateWhenCalculatorButtonPress = (state, action) => {
	const { payload: { buttonValue } } = action;
	const { calculator: { expressionParts } } = state;
	const lastPart = last(expressionParts);
	const isExpressionEmpty = expressionParts.length === 0;
	const lastIndex = expressionParts.length - 1;
	
	let hasFinalResult = false;
	let newExpressionParts = [...expressionParts];

	if (!isValidKeyInput(buttonValue, lastPart)) {
		return state;
	}

	if (buttonValue === CALC_KEY.Del) {
		if (isExpressionEmpty) return state;
		// Remove the last char from the the last part
		const newLastPart = lastPart.slice(0, -1);
		if (!newLastPart) {
			// The last part is empty, so remove it from the expression
			newExpressionParts = expressionParts.slice(0, -1);
		} else {
			// Assign the new last part to the expression
			newExpressionParts[lastIndex] = newLastPart;
		}
	} else if (buttonValue === CALC_KEY.Clear) {
		newExpressionParts = [];
	} else if (OP_KEY[buttonValue]) {
		if ((!isExpressionEmpty && !OP_KEY[lastPart])
			|| (isExpressionEmpty && (buttonValue === CALC_KEY.Plus || buttonValue === CALC_KEY.Minus))) {
			newExpressionParts.push(buttonValue);
		} else if (!isExpressionEmpty) {
			newExpressionParts[lastIndex] = buttonValue;
		}
	} else if (NUMBER_KEY[buttonValue]) {
		if (OP_KEY[lastPart] || isExpressionEmpty) {
			newExpressionParts.push(buttonValue);
		} else if (!isExpressionEmpty) {
			newExpressionParts[lastIndex] = `${(lastPart + buttonValue)}`;
		}
	} else if (buttonValue === CALC_KEY.Dot) {
		if (isExpressionEmpty || OP_KEY[lastPart]) {
			newExpressionParts.push('0.');
		} else if (!OP_KEY[lastPart] && !includes(lastPart, '.')) {
			newExpressionParts[lastIndex] = `${lastPart}.`;
		}
	} else if (buttonValue === CALC_KEY.Equal) {
		newExpressionParts = [];
		const result = eval(expressionParts.join('')) || 0;
		if (result < 0) {
			newExpressionParts.push('-');
		}
		newExpressionParts.push(`${Math.abs(result)}`);
		hasFinalResult = true;
	}
	return update(state, {
		calculator: {
			expressionParts: { $set: newExpressionParts },
			hasFinalResult: { $set: hasFinalResult }
		}
	});
}

export default function (state = initialState, action) {
	switch (action.type) {
		case NOTIFY_BUTTON_PRESS: {
			return updateStateWhenCalculatorButtonPress(state, action);
		}
		case INIT_CALCULATOR: {
			const { payload: { initialValue: { value } } } = action;
			return update(state, {
				calculator: {
					expressionParts: { $set: [`${value || '0'}`] },
					hasFinalResult: { $set: false }
				}
			})
		}
		default:
			return state;
	}
}
