import * as React from "react";
import SelectCategory from "../../stories/screens/SelectCategory";
export interface Props {
	navigation: any,
}
export interface State {}
export default class SelectCategoryContainer extends React.Component<Props, State> {
	render() {
		return <SelectCategory navigation={this.props.navigation} />;
	}
}
