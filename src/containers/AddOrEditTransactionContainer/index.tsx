import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { cloneDeep } from 'lodash';
import AddOrEditTransaction from "./components/AddOrEditTransaction";
import { changeFormValue, setupNewTransaction } from './actions';
import { saveTransaction } from '../../services/redux/transaction/actions';
import { currentTransactionSelector } from './selectors';

export interface Props {
	navigation: any;
	changeFormValue: Function,
	transaction: any,
	saveTransaction: Function,
	setupNewTransaction: Function,
}
export interface State {}
class AddOrEditTransactionContainer extends React.PureComponent<Props, State> {

	componentWillMount() {
		this.props.setupNewTransaction();
	}

	handleFormValueChanged = (field, value) => {
		this.props.changeFormValue(field, value);
	}

	handleSaveTransaction = () => {
		const { id, amount, note, date, category: { id: categoryId, type }, jar: { id: jarId } } = this.props.transaction;
		const transaction = { id, amount, note, date, categoryId, type, ...type === 'expense' && { jarId } };
		this.props.saveTransaction(transaction);
	}
	
	render() {
		return <AddOrEditTransaction 
			navigation={this.props.navigation}
			onFormValueChanged={this.handleFormValueChanged}
			transaction={this.props.transaction}
			onSave={this.handleSaveTransaction}
		/>;
	}
}

function bindAction(dispatch) {
	return {
		changeFormValue: (field, value) => { dispatch(changeFormValue(field, value)); },
		saveTransaction: (transaction) => { dispatch(saveTransaction(transaction)); },
		setupNewTransaction: () => { dispatch(setupNewTransaction()) },
	};
}

const mapStateToProps = createStructuredSelector({
	transaction: currentTransactionSelector,
});
export default connect(mapStateToProps, bindAction)(AddOrEditTransactionContainer);
