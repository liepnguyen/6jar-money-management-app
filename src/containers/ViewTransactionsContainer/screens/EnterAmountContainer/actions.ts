import { createAction } from 'redux-actions';

const NAMESPACE = 'ENTER_AMOUNT';

export const NOTIFY_BUTTON_PRESS = `${NAMESPACE}/NOTIFY_BUTTON_PRESS`;

export const nofityButtonPress = createAction(NOTIFY_BUTTON_PRESS, (buttonType: any) => {
	return { buttonType };
});