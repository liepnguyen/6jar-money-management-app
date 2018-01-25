import * as React from "react";
import SelectCategory from "./components/SelectCategory";

export interface Props {
	navigation: any,
	selectCategory: Function,
}

export interface State {}

export default class SelectCategoryContainer extends React.Component<Props, State> {

	handleCategorySelected = (categoryId) => {
		const { state: { params: { onCategorySelected } } } = this.props.navigation;
		onCategorySelected(categoryId);
	}

	render() {
		return <SelectCategory
			navigation={this.props.navigation}
			onCategorySelected={this.handleCategorySelected}
		/>;
	}
}
