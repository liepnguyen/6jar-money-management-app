const rows = [
  {
    "id": "5a8d1a0179bedd3a1ac45900",
    "name": "fees_and_charges",
    "icon": "fees_and_charges.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a0180549dc550001d70",
    "name": "insurances",
    "icon": "insurances.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01d922ac27fead3702",
    "name": "family",
    "icon": "family.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01d692cfa9eb44351a",
    "name": "education",
    "icon": "education.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a0123706c8f33605f27",
    "name": "investment",
    "icon": "investment.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a018f2b163524891c29",
    "name": "travel",
    "icon": "travel.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01d2556b29675be507",
    "name": "health_and_fitness",
    "icon": "health_and_fitness.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a019bfbea6f4a827bcc",
    "name": "gifts_and_donations",
    "icon": "gifts_and_donations.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01e220f5fcb0ed71a2",
    "name": "shopping",
    "icon": "shopping.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a0142e8604b0fef1a36",
    "name": "friends_and_lover",
    "icon": "friends_and_lover.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01ab519f702a624692",
    "name": "entertainment",
    "icon": "entertainment.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a014de32cb0dbc229cb",
    "name": "bills_and_utilities",
    "icon": "bills_and_utilities.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01ca7dfaead638b8c2",
    "name": "transportation",
    "icon": "transportation.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a015d6a52f6006f09aa",
    "name": "food_and_beverage",
    "icon": "food_and_beverage.png",
    "type": "expense"
	},
	{
    "id": "5a8d1a01f5b2ec1460a4ccd6",
    "name": "others",
    "icon": "others.png",
    "type": "expense"
  },
  {
    "id": "5a8d1a01691e8981c63df7cd",
    "name": "gifts",
    "icon": "gifts.png",
    "type": "income"
  },
  {
    "id": "5a8d1a01003ff81d20ef1710",
    "name": "selling",
    "icon": "selling.png",
    "type": "income"
  },
  {
    "id": "5a8d1a0125807d7c8f68fd68",
    "name": "interest_money",
    "icon": "interest_money.png",
    "type": "income"
  },
  {
    "id": "5a8d1a01379b3afa84e12827",
    "name": "salary",
    "icon": "salary.png",
    "type": "income"
  },
  {
    "id": "5a8d1a017408ba19c9630652",
    "name": "award",
    "icon": "award.png",
    "type": "income"
  },
  {
    "id": "5a8d1a01f5b2ec1460a4ccd6",
    "name": "others",
    "icon": "others.png",
    "type": "income"
  }
]

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
