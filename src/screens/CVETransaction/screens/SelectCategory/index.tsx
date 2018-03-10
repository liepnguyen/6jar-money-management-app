import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import SelectCategory from "./components/SelectCategory";
import { categoriesSelector } from '../../../../shared/redux/selectors/categorySelectors';

export interface Props {
	navigation: any,
	selectCategory: Function,
	onCategorySelected: Function,
	categories: Array<any>
}

export interface State {}

class SelectCategoryContainer extends React.PureComponent<Props, State> {

	handleCategorySelected = (selectedCategory) => {
		const { navigation: { state: { params: { onCategorySelected } } } } = this.props;
		onCategorySelected(selectedCategory);
	}

	render() {
		const { navigation, categories } = this.props;
		return <SelectCategory
			navigation={navigation}
			onCategorySelected={this.handleCategorySelected}
			categories={categories}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	categories: categoriesSelector,
});

export default connect(mapStateToProps)(SelectCategoryContainer);
