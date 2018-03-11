import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import CVETransaction from "./components/CVETransaction";
import { changeFormValue, setupNewTransaction, saveTransaction, deleteTransactionAsync, loadTransactionAsync } from './actions';
import { transactionSelector } from './selectors';
import { CVE_SCREEN_MODES } from '../../constants';

export interface Props {
	navigation: any;
	changeFormValue: (keyValue: Object) => void;
	transaction: any;
	saveTransaction: (transaction: any) => void;
	setupNewTransaction: () => void;
	deleteTransaction: (transactionId: string) => void;
	loadTransaction: (transaction: any) => void;
}
export interface State { }
class CVETransactionContainer extends React.PureComponent<Props, State> {

	componentWillMount() {
		const { navigation: { state: { params: { mode, transaction } } },
			setupNewTransaction, loadTransaction } = this.props;
		if (mode === CVE_SCREEN_MODES.VIEW || mode === CVE_SCREEN_MODES.EDIT) {
			loadTransaction(transaction);
		} else if (mode === CVE_SCREEN_MODES.NEW) {
			setupNewTransaction();
		}
	}

	handleFormValueChanged = (keyValue) => {
		const { changeFormValue } = this.props;
		changeFormValue(keyValue);
	}

	handleSaveTransaction = () => {
		const { saveTransaction, navigation } = this.props;
		const { id, amount, note, date, category: { id: categoryId, type }, jar } = this.props.transaction;
		const transaction = { id, amount, note, date, categoryId, type, accountId: type === 'expense' ? jar.id : null };
		saveTransaction(transaction);
		navigation.goBack();
	}

	handleDeleteTransaction = (transactionId: string) => {
		const { deleteTransaction } = this.props;
		deleteTransaction(transactionId);
	}

	handleEnterAmount = (prevAmount: number) => {
		const { navigation, changeFormValue } = this.props;
		navigation.navigate('EnterAmount', {
			onAmountEntered: (nextAmount) => {
				changeFormValue({ amount: nextAmount });
			},
			value: prevAmount,
		});
	}

	handleSelectCategory = () => {
		const { navigation, changeFormValue } = this.props;
		navigation.navigate('SelectCategory', {
			onCategorySelected: (category) => {
				changeFormValue({ category });
			}
		});
	}

	handleSelectJar = () => {
		const { navigation, changeFormValue } = this.props;
		navigation.navigate('SelectJar', {
			onJarSelected: (jar) => {
				changeFormValue({ jar });
			}
		});
	}

	handleGoBack = () => {
		const { navigation } = this.props;
		navigation.goBack();
	}

	render() {
		const { navigation: { state: { params: { mode } } } } = this.props;
		return <CVETransaction
			onFormValueChanged={this.handleFormValueChanged}
			transaction={this.props.transaction}
			onSave={this.handleSaveTransaction}
			onDelete={this.handleDeleteTransaction}
			onEnterAmountFieldPressed={this.handleEnterAmount}
			onSelectCategoryFieldPressed={this.handleSelectCategory}
			onJarFieldPressed={this.handleSelectJar}
			onGoBackButtonPressed={this.handleGoBack}
			mode={mode}
		/>;
	}
}

function bindAction(dispatch) {
	return {
		changeFormValue: (keyValue: any) => { dispatch(changeFormValue.start(keyValue)); },
		saveTransaction: (transaction: any) => { dispatch(saveTransaction.start(transaction)); },
		deleteTransaction: (transactionId: string) => { dispatch(deleteTransactionAsync.start(transactionId)); },
		setupNewTransaction: () => { dispatch(setupNewTransaction.start()); },
		loadTransaction: (transactionId: string) => { dispatch(loadTransactionAsync.start(transactionId)); }
	};
}

const mapStateToProps = createStructuredSelector({
	transaction: transactionSelector,
});
export default connect(mapStateToProps, bindAction)(CVETransactionContainer);
