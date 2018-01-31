import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import AddOrEditTransaction from "./components/AddOrEditTransaction";
import { changeFormValue } from './actions';
import { saveTransaction } from '../../services/redux/transaction/actions';
import { currentTransactionSelector } from './selectors';

export interface Props {
	navigation: any;
	changeFormValue: Function,
	transaction: any,
	saveTransaction: Function
}
export interface State {}
class AddOrEditTransactionContainer extends React.Component<Props, State> {

	handleFormValueChanged = (field, value) => {
		this.props.changeFormValue(field, value);
	}

	handleSaveTransaction = () => {
		const { date, note } = this.props.transaction;
		this.props.saveTransaction({ date, note });
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
		saveTransaction: (transaction) => { dispatch(saveTransaction(transaction)); }
	};
}

const mapStateToProps = createStructuredSelector({
	transaction: currentTransactionSelector,
});
export default connect(mapStateToProps, bindAction)(AddOrEditTransactionContainer);
