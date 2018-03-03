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

const parseNumber = (num: number): Array<string> => {
	const parts = [];
	if (num < 0) {
		parts.push('-');
	}
	parts.push(`${Math.abs(Math.round(num * 1000) / 1000)}`);
	return parts;
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
		if (isExpressionEmpty) { return state };
		const newLastPart = lastPart.slice(0, -1);
		if (!newLastPart) {
			newExpressionParts = expressionParts.slice(0, -1);
		} else {
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
			newExpressionParts[lastIndex] = `${lastPart}${buttonValue}`;
		}
	} else if (buttonValue === CALC_KEY.Dot) {
		if (isExpressionEmpty || OP_KEY[lastPart]) {
			newExpressionParts.push('0.');
		} else if (!OP_KEY[lastPart] && !includes(lastPart, '.')) {
			newExpressionParts[lastIndex] = `${lastPart}.`;
		}
	} else if (buttonValue === CALC_KEY.Equal) {
		let result;
		try {
			result = eval(
				expressionParts
					.map((p) => { return OP_KEY[p] ? p : `${+p}` })
					.join('')
			);
			if (!isNaN(result)) {
				newExpressionParts = parseNumber(result);
				hasFinalResult = true;
			}
		} catch {
			hasFinalResult = false;
		}
	}
	return update(state, {
		calculator: { $merge: { expressionParts: newExpressionParts, hasFinalResult } }
	});
}

export default function (state = initialState, action) {
	switch (action.type) {
		case NOTIFY_BUTTON_PRESS: {
			return updateStateWhenCalculatorButtonPress(state, action);
		}
		case INIT_CALCULATOR: {
			const { payload: { initialValue: { value } } } = action;
			const expressionParts = parseNumber(value);
			return update(state, {
				calculator: { $merge: { expressionParts, hasFinalResult: false } }
			});
		}
		default:
			return state;
	}
}
