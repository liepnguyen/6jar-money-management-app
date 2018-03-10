import { createAction } from 'redux-actions';

const NAMESPACE = 'ENTER_AMOUNT';

export const NOTIFY_BUTTON_PRESS = `${NAMESPACE}/NOTIFY_BUTTON_PRESS`;
export const INIT_CALCULATOR = `${NAMESPACE}/INIT_CALCULATOR`;

export const nofityButtonPress = createAction(NOTIFY_BUTTON_PRESS, (buttonValue: any) => {
	return { buttonValue };
});

export const initCalculator = createAction(INIT_CALCULATOR, (initialValue: any) => {
	return { initialValue };
});