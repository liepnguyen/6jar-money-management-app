const rows = [
	{
		id: '001',
		name: 'Eat',
		description: '',
		icon: 'restaurant.png',
		type: 'income'
	},
	{
		id: '002',
		name: 'Have Launch',
		description: '',
		icon: 'restaurant.png',
		type: 'income'
	},
	{
		id: '003',
		name: 'Have Breakfast',
		description: '',
		icon: 'restaurant.png',
		type: 'income'
	},
	{
		id: '001',
		name: 'Eat',
		description: '',
		icon: 'restaurant.png',
		type: 'expense'
	},
	{
		id: '002',
		name: 'Eat1',
		description: '',
		icon: 'restaurant.png',
		type: 'expense'
	},
	{
		id: '003',
		name: 'Eat',
		description: '',
		icon: 'restaurant.png',
		type: 'expense'
	},
];

const initialState = {
	rows: rows,
	deleted: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
