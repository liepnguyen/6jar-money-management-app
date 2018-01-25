import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../containers/HomeContainer/reducer";
import addOrEditTransactionReducer from "../containers/AddOrEditTransactionContainer/reducer";

export default combineReducers({
	form: formReducer,
	home: homeReducer,
	addOrEditTransaction: addOrEditTransactionReducer,
});
