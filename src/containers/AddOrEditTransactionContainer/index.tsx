import * as React from "react";
import { connect } from "react-redux";
import AddOrEditTransaction from "./components/AddOrEditTransaction";
import { changeFormValue } from './actions';

export interface Props {
	navigation: any;
	changeFormValue: Function,
}
export interface State {}
class AddOrEditTransactionContainer extends React.Component<Props, State> {

	handleFormValueChanged = (field, value) => {
		this.props.changeFormValue(field, value);
	}
	
	render() {
		return <AddOrEditTransaction 
			navigation={this.props.navigation}
			onFormValueChanged={this.handleFormValueChanged}
		/>;
	}
}

function bindAction(dispatch) {
	return {
		changeFormValue: (field, value) => { dispatch(changeFormValue(field, value)); }
	};
}

const mapStateToProps = () => ({
});
export default connect(mapStateToProps, bindAction)(AddOrEditTransactionContainer);
