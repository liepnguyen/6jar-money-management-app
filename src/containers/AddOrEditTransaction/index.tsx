import * as React from "react";
import { connect } from "react-redux";
import AddOrEditTransaction from "../../stories/screens/AddOrEditTransaction";

export interface Props {
	navigation: any;
}
export interface State {}
class AddOrEditTransactionContainer extends React.Component<Props, State> {
	render() {
		return <AddOrEditTransaction navigation={this.props.navigation} />;
	}
}

function bindAction() {
	return {
	};
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, bindAction)(AddOrEditTransactionContainer);
