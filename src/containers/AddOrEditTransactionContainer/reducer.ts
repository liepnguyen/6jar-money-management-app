const initialState = {
};

export default function(state = initialState, action) {
	if (action.type === 'SELECT_CATEGORY') {
		const { categoryId } = action;
		return { ...state, categoryId };
	}
	if (action.type === 'CHANGE_FORM_VALUE') {
		const { payload: { field, value } } = action;
		return { ...state, [field]: value };
	}
	return state;
}
