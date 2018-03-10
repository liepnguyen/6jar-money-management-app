export function selectCategory(categoryId: string) {
	return {
		type: "SELECT_CATEGORY",
		categoryId
	};
}