import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../containers/HomeContainer/reducer";
import addOrEditTransactionReducer from "../containers/AddOrEditTransactionContainer/reducer";
import viewTransactionsReducer from "../containers/ViewTransactionsContainer/reducer";
import transactionReducer from '../services/redux/transaction/reducer';
import categoryReducer from '../services/redux/category/reducer';
import jarReducer from '../services/redux/jar/reducer';
import enterAmountReducer from '../containers/AddOrEditTransactionContainer/screens/EnterAmountContainer/reducer';
import realmReducer from '../utils/realm/redux/reducer';

export default combineReducers({
	realm: realmReducer,
	form: formReducer,
	screens: combineReducers({
		home: homeReducer,
		addOrEditTransaction: addOrEditTransactionReducer,
		enterAmount: enterAmountReducer,
		viewTransactions: viewTransactionsReducer,
	}),
	entities: combineReducers({
		transaction: transactionReducer,
		category: categoryReducer,
		jar: jarReducer,
	})
});
