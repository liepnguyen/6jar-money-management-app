
import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import CategoriesPage from './components/CategoriesPage';
import { categoriesSelector } from '../../shared/redux/selectors/categorySelectors';
import { SCREEN_NAMES } from '../../constants';

export interface Props {
  navigation: any;
	categories: Array<any>;
}
export interface State { }
class CategoriesScreen extends React.PureComponent<Props, State> {
  handleAddNewButtonPressed = () => {
    const { navigation } = this.props;
    navigation.navigate(SCREEN_NAMES.CVE_CATEGORY, { mode: 'new' });
  }

  handleCategorySelected = (category) => {
    const { navigation } = this.props;
    navigation.navigate(SCREEN_NAMES.CVE_CATEGORY, { category, mode: 'view' });
  }

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { categories } = this.props;
    return (
      <CategoriesPage
        categories={categories}
        onAddNewButtonPressed={this.handleAddNewButtonPressed}
        onCategorySelected={this.handleCategorySelected}
        onGoBackButtonPressed={this.handleGoBack}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelector,
});

export default connect(mapStateToProps)(CategoriesScreen);