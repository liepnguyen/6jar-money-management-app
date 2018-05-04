import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { Alert } from 'react-native';
import { trim, isEmpty } from 'lodash';
import CVECategory from './components/CVECategory';
import { categorySelector } from "./selectors";
import { changeFormValue, saveCategoryAsync, setupNewCategory, deleteCategoryAsync, clearState } from './actions';
import { loadCategory } from './actions';
import categoryService from '../../shared/services/categoryService';
import { showWarningMessage } from '../../utils/toast';
import { CVE_SCREEN_MODES } from '../../constants';

export interface Props {
  navigation: any;
  category: any;
  loadCategory: (id: string) => void;
  changeFormValue: (keyValue: any) => void;
  saveCategory: (category) => void;
  setupNewCategory: () => void;
  deleteCategory: (categoryId) => void;
  clearState: () => void;
}
export interface State { }
class CVECategoryContainer extends React.PureComponent<Props, State> {
  componentWillMount() {
    const { category, mode } = this.props.navigation.state.params;
    if (mode === CVE_SCREEN_MODES.VIEW || mode === CVE_SCREEN_MODES.EDIT) {
      this.props.loadCategory(category);
    } else if (mode === CVE_SCREEN_MODES.NEW) {
      this.props.setupNewCategory();
    }
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState();
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  }

  handleFormValueChanged = (keyValue: Object) => {
    this.props.changeFormValue(keyValue);
  }

  validateCategoryBeforeSave = (category) => {
    const { name, id } = category;
    if (isEmpty(trim(name))) {
      showWarningMessage('Category name can not be empty');
      return false;
    }
    if (categoryService.isNameDuplicated(id, name)) {
      showWarningMessage('Duplicate category name, please enter another');
      return false;
    }
    return true;
  }

  handleSaveCategory = () => {
    const { category, saveCategory, navigation } = this.props;
    if (this.validateCategoryBeforeSave(category)) {
      saveCategory(category);
      navigation.goBack();
    }
  }

  validateCategoryBeforeDelete = (category) => {
    const { id, name } = category;
    if (categoryService.hasAnyAssociatedTransaction(id)) {
      showWarningMessage('Can not delete an in use category');
      return false;
    }
    return true;
  }

  handleDeleteCategory = (categoryId) => {
    const { deleteCategory, navigation, category } = this.props;
    if (this.validateCategoryBeforeDelete(category)) {
      Alert.alert('Delete Category', 'Are you sure you want to delete this category?', [
        { text: 'NO', onPress: () => { }, style: 'cancel' },
        { text: 'YES', onPress: () => { deleteCategory(categoryId); navigation.goBack(); } },
      ])
    }
  }

  render() {
    const { category } = this.props;
    const { mode } = this.props.navigation.state.params;
    return (
      <CVECategory
        isReadonly={category.isDefault}
        onGoBackButtonPressed={this.handleGoBack}
        category={category}
        mode={mode}
        onFormValueChanged={this.handleFormValueChanged}
        onSaveButtonPressed={this.handleSaveCategory}
        onDeleteCategory={this.handleDeleteCategory}
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
    deleteCategory: (categoryId) => { dispatch(deleteCategoryAsync.start(categoryId)) },
    clearState: () => { dispatch(clearState.start()) },
  };
}

const mapStateToProps = createStructuredSelector({
  category: categorySelector,
});
export default connect(mapStateToProps, bindAction)(CVECategoryContainer);
