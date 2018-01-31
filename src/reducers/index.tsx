import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../containers/HomeContainer/reducer";
import addOrEditTransactionReducer from "../containers/AddOrEditTransactionContainer/reducer";
import transactionReducer from '../services/redux/transaction/reducer';
import categoryReducer from '../services/redux/category/reducer';

export default combineReducers({
	form: formReducer,
	screens: combineReducers({
		home: homeReducer,
		addOrEditTransaction: addOrEditTransactionReducer,
	}),
	entities: combineReducers({
		transaction: transactionReducer,
		category: categoryReducer
	})
});
