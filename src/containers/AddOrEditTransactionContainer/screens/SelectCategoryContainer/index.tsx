import * as React from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import SelectCategory from "./components/SelectCategory";
import { incomeCategoriesSelector, expenseCategoriesSelector } from '../../../../services/redux/category/selectors';

export interface Props {
	navigation: any,
	selectCategory: Function,
	onCategorySelected: Function,
	incomeCategories: Array<any>
	expenseCategories: Array<any>
}

export interface State {}

class SelectCategoryContainer extends React.PureComponent<Props, State> {

	handleCategorySelected = (selectedCategory) => {
		const { navigation: { state: { params: { onCategorySelected } } } } = this.props;
		onCategorySelected(selectedCategory);
	}

	render() {
		const { navigation, incomeCategories, expenseCategories } = this.props;
		return <SelectCategory
			navigation={navigation}
			onCategorySelected={this.handleCategorySelected}
			incomeCategories={incomeCategories}
			expenseCategories={expenseCategories}
		/>;
	}
}

const mapStateToProps = createStructuredSelector({
	incomeCategories: incomeCategoriesSelector,
	expenseCategories: expenseCategoriesSelector
});

export default connect(mapStateToProps)(SelectCategoryContainer);
