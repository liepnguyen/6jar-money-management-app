export function changeFormValue(field: string, value: any) {
	return {
		type: "CHANGE_FORM_VALUE",
		payload: {
      field,
      value
    }
	};
}