import * as React from "react";
import EnterAmount from "./components/EnterAmount";
export interface Props {
	navigation: any,
}
export interface State {}
export default class EnterAmountContainer extends React.Component<Props, State> {
	render() {
		return <EnterAmount navigation={this.props.navigation} />;
	}
}