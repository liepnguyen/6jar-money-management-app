import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import CVECategory from './components/CVECategory';
import { categorySelector } from "./selectors";
import { changeFormValue, saveCategoryAsync, setupNewCategory } from './actions';
import { loadCategory } from './actions';

export interface Props {
  navigation: any;
  category: any;
  loadCategory: (id: string) => void;
  changeFormValue: (keyValue: any) => void;
  saveCategory: (category) => void;
  setupNewCategory: () => void;
}
export interface State { }
class CVECategoryContainer extends React.PureComponent<Props, State> {
  componentWillMount() {
    const { category, mode } = this.props.navigation.state.params;
    if (mode === 'view' || mode === 'edit') {
      this.props.loadCategory(category);
    } else if (mode === 'new') {
      this.props.setupNewCategory();
    }
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  }

  handleFormValueChanged = (keyValue: Object) => {
    this.props.changeFormValue(keyValue);
  }

  handleSaveCategory = () => {
    const { category, saveCategory, navigation } = this.props;
    saveCategory(category);
    navigation.goBack();
  }

  render() {
    const { category } = this.props;
    const { mode } = this.props.navigation.state.params;
    return (
      <CVECategory
        onGoBackButtonPressed={this.handleGoBack}
        category={category}
        mode={mode}
        onFormValueChanged={this.handleFormValueChanged} 
        onSaveButtonPressed={this.handleSaveCategory}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    loadCategory: (categoryId) => { dispatch(loadCategory.start(categoryId)) },
    changeFormValue: (keyValue) => { dispatch(changeFormValue.start(keyValue)) },
    saveCategory: (category) => { dispatch(saveCategoryAsync.start(category)) },
    setupNewCategory: () => { dispatch(setupNewCategory.start()) },
  };
}

const mapStateToProps = createStructuredSelector({
  category: categorySelector,
});
export default connect(mapStateToProps, bindAction)(CVECategoryContainer);
