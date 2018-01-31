const rows = [
	{
		id: '001',
		name: 'Eat',
		description: '',
		icon: 'restaurant.png'
	},
	{
		id: '002',
		name: 'Eat1',
		description: '',
		icon: 'restaurant.png'
	},
	{
		id: '003',
		name: 'Eat',
		description: '',
		icon: 'restaurant.png'
	}
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
