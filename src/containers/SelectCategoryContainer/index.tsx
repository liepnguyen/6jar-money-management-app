import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import SelectCategory from "./components/SelectCategory";
import { categoriesSelector } from '../../services/redux/category/selectors';

export interface Props {
	navigation: any,
	selectCategory: Function,
	onCategorySelected: Function,
	categories: Array<any>
}

export interface State {}

class SelectCategoryContainer extends React.Component<Props, State> {
	componentWillMount() {
		this.props = {
      ...this.props,
      ...this.props.navigation.state.params
    }
	}

	handleCategorySelected = (selectedCategory) => {
		const { onCategorySelected } = this.props;
		onCategorySelected(selectedCategory);
	}

	render() {
		return <SelectCategory
			navigation={this.props.navigation}
			onCategorySelected={this.handleCategorySelected}
			categories={this.props.categories}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	categories: categoriesSelector,
});

export default connect(mapStateToProps)(SelectCategoryContainer);
