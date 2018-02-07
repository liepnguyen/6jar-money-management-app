const rows = [
	{
		id: '001',
		name: 'NEC',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
	},
	{
		id: '002',
		name: 'PLY',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
	},
	{
		id: '003',
		name: 'FFA',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
	},
	{
		id: '004',
		name: 'LTS',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
	},
	{
		id: '005',
		name: 'EDU',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
	},
	{
		id: '006',
		name: 'GIV',
		incomePercentage: 20,
		available: 400,
		usedInThisMonth: 23
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
